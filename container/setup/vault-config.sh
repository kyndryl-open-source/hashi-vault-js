#!/usr/bin/env bash

## Important notice
## This shell script configures the Vault server with the following:
## - Root CA certificate
## - Intermediate CA certificate
## - PKI role
## - AppRole auth method
## - Token auth method
## - KV v2 secret engine
## - LDAP auth method
## - Active Directory secret engine
## - Userpass auth method
## - TLS Certificate auth method
## - Certificates for authentication
## - Policies for the certificates
## - Provisioner / Admin / Knight tokens
## - TOTP secret engine
## This script should be used as model for configuring an dev/test environment, 
## and should NEVER used in production.
## 

# Create standard policies
vault policy write admin ./policies/admin-policy.hcl
vault policy write provisioner ./policies/provisioner-policy.hcl

# Enable PKI secret engine
vault secrets enable pki

# Configure PKI TTL
vault secrets tune -max-lease-ttl="87600h" pki

# Create root CA certificate
vault write -field=certificate pki/root/generate/internal \
common_name="chatopsknight.ibm.com,default.svc.cluster.local" \
ttl="87600h" > CA_cert.crt

# Enable Intermediary PKI
vault secrets enable -path=pki_int pki

# Configure Intermediary PKI TTL
vault secrets tune -max-lease-ttl="87600h" pki_int

# Create intermediate CSR
vault write -format=json pki_int/intermediate/generate/internal \
common_name="chatopsknight.ibm.com Intermediate Authority" \
| jq -r '.data.csr' > pki_intermediate.csr

# Sign intermediate Certificate
vault write -format=json pki/root/sign-intermediate csr=@pki_intermediate.csr \
format=pem_bundle ttl="87600h" \
| jq -r '.data.certificate' > intermediate.cert.pem

# Set intermediate certificate signed by root CA
vault write pki_int/intermediate/set-signed certificate=@intermediate.cert.pem

# Create a role
vault write pki_int/roles/chatopsknight \
allowed_domains="chatopsknight.kyndryl.net" \
allow_subdomains=true \
max_ttl="87600h"

# Issue new certificate
vault write pki_int/issue/chatopsknight common_name="vault.chatopsknight.kyndryl.net" ttl="87500h"

# Create a policy
vault policy write knight-vault ./policies/chatops-knight-vault.hcl

# Apply policy to role for AppRole auth method
vault write auth/approle/role/knight secret_id_ttl="720h"  token_ttl="12h"  token_max_tll="12h"  policies="knight-vault"

# Apply policy to role for Token auth method
vault write auth/token/roles/knight token_explicit_max_ttl=43200  allowed_policies="knight-vault"

# Check role-id
vault read auth/approle/role/knight/role-id

# Create new secret-id
vault write -f auth/approle/role/knight/secret-id

# Check if pair role-id and secret-id are working
vault write auth/approle/login -field=token role_id=${ROLE_ID} secret_id=${SECRET_ID}

# Update issuing and clr points to use https
vault write pki/config/urls \
    issuing_certificates="https://127.0.0.1:8200/v1/pki/ca" \
    crl_distribution_points="https://127.0.0.1:8200/v1/pki/crl"

# Enable KV v2 secret engine for the app
vault secrets enable -path=knight kv-v2

# Enable LDAP auth method
vault auth enable ldap

# Enable Active Directory secret engine
vault secrets enable ad

# Download mock OpenLDAP CA certificates chain
openssl s_client -showcerts -verify 5 -connect ldap.chatopsknight.com:636 < /dev/null | awk '/BEGIN/,/END/{ if(/BEGIN/){a++}; out="cert"a".pem"; print >out}'
cat cert?.pem > ldap-server.pem
rm cert?.pem

# Configure LDAP auth method for authentication
vault write auth/ldap/config \
    url="ldaps://ldap.chatopsknight.com:636" \
    userattr="uid"\
    userdn="ou=Employees,dc=chatopsknight,dc=com" \
    groupdn="ou=Groups,dc=chatopsknight,dc=com" \
    discoverdn=false \
    certificate=@ldap-server.pem \
    insecure_tls=false \
    starttls=false

vault write auth/ldap/groups/provisioners policies="provisioner"
vault write auth/ldap/groups/admins policies="admin"
vault write auth/ldap/users/jane.doe groups="admins"

# Configure AD secret engine

vault write ad/config \
    binddn='cn=admin,dc=chatopsknight,dc=com' \
    bindpass='LD@PS3cr3t!' \
    url=ldaps://ldap.chatopsknight.com \
    userdn='dc=chatopsknight,dc=com' \
    certificate=@ldap-server.pem \
    insecure_tls=false

vault write ad/library/sre-team \
    service_account_names=rod.anami@chatopsknight.com,john.smith@chatopsknight.com \
    ttl=10h \
    max_ttl=20h \
    disable_check_in_enforcement=false

# Configure Userpass auth method
vault auth enable userpass

vault write auth/userpass/users/nathan.hale password="r3s1st@anc3" policies="admin"

# Create Provisioner / Admin / Knight tokens
vault token create -policy="provisioner"
vault token create -policy="admin"
vault token create -policy="knight-vault"

# Enable TLS Certificate auth method
vault auth enable cert

# Create a PKI role to issue certificates
vault write pki_int/roles/vault-cert \
  allow_any_name=true \
  max_ttl=720h \
  generate_lease=true

# Create a policy for the certificates issued
vault policy write cert-policy ./policies/cert-policy.hcl

# Issue a certificate based on the create role
vault write -format=json pki_int/issue/vault-cert \
common_name=vault-cert | tee \
>(jq -r .data.certificate > vault-cert-certificate.pem) \
>(jq -r .data.issuing_ca > vault-cert-issuing-ca.pem) \
>(jq -r .data.private_key > vault-cert-private-key.pem)

# Create a cert for authentication
vault write auth/cert/certs/vault-cert \
  display_name=vault-cert \
  policies=cert \
  certificate=@vault-cert-certificate.pem

# Test cert login
vault login -method=cert -client-cert=vault-cert-certificate.pem \
-client-key=vault-cert-private-key.pem

curl --request POST --cacert /Users/rodanami/github/chatops-knight/hashi-vault/kubernetes/certs/ca.crt --cert /Users/rodanami/github/chatops-knight/hashi-vault/kubernetes/certs/vault.crt --key /Users/rodanami/github/chatops-knight/hashi-vault/kubernetes/certs/vault.key --data @payload.json https://vault.chatopsknight.ibm.com:8200/v1/auth/cert/login

# Configure TOTP secret engine

vault secrets enable totp

# End