# Hashi Vault JS

## Creating your test environment (with HTTPS)

* Install Vault CLI. Instructions are on this [link](https://www.vaultproject.io/downloads)

* Configure your Vault CLI environment

  ```
  # Should match the Vault listener configuration
  export VAULT_ADDR="http://127.0.0.1:8200"
  # Root CA certificate for HTTPS protocol
  export VAULT_CACERT=/path/ca.crt
  # Location of the vault command
  export PATH=$PATH:/path/vault
  ```

* Modify Docker compose configuration on this file: `docker-compose.yaml`

```
version: '3'
services:
  vault:
    image: vault:1.11.0
    container_name: my-vault
    ports:
      - "8200:8200"
    restart: always
    environment:
      VAULT_ADDR: "https://127.0.0.1:8200"
    volumes:
      - ./volumes/logs:/vault/logs
      - ./volumes/file:/vault/file
      - ./volumes/config:/vault/config
    cap_add:
      - IPC_LOCK
    entrypoint: vault server -config=/vault/config/vault.hcl
```

* Create a Vault server configuration file named: `vault.hcl`

```
storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = true
}

ui = true
disable_mlock = true
max_lease_ttl =  "768h"
default_lease_ttl = "12h"
api_addr = "http://127.0.0.1:8200"
```

* Create volumes and copy any certificate/key that you have

  ```
  # Create volumes on your local filesystem, for cloud environments you'll need a private volume
  mkdir ./volumes
  mkdir ./volumes/config
  mkdir ./volumes/file
  mkdir ./volumes/logs
  mkdir ./volumes/certs
  # Copy Vault server config to the volume
  cp vault.json ./volumes/config/

  ```

* Spin up the container on your environment `docker-compose up --build -d`

* Initiate your Vault with the following command: `vault operator init -key-shares=6 -key-threshold=3`

* Note the 6 unseal shared keys and the initial root token

* Unseal your Vault by providing at least 3 keys out of 6

  ```
  vault operator unseal $VAULT_UNSEAL_KEY1
  vault operator unseal $VAULT_UNSEAL_KEY2
  vault operator unseal $VAULT_UNSEAL_KEY3
  ```

  * Every time you restart your Vault you'll need to unseal it
  * It's recommended that no single person has all the 6 keys
  * It's possible to automate this unsealing process for high availability

* Log into the Vault with a privileged account

  ```
  # Using the root token is only recommended for test environments
  vault login $VAULT_ROOT_TOKEN
  ```

* Configure your Vault accordingly, but minimally

  * Enable the AppRole auth method and the KV v2 secret engine

  ```
  vault secrets enable -path=secrets kv-v2
  vault auth enable approle
  ```

  * Create Root CA, Intermediate CA and Vault certificates

  ```
  mkdir certs
  cd certs

  # Enable PKI secret engine
  vault secrets enable pki

  # Configure PKI TTL
  vault secrets tune -max-lease-ttl="87600h" pki

  # Create root CA certificate
  vault write -field=certificate pki/root/generate/internal \
  common_name="example.com" ttl="87600h" > root-ca.crt

  # Enable Intermediary PKI
  vault secrets enable -path=pki_int pki

  # Configure Intermediary PKI TTL
  vault secrets tune -max-lease-ttl="87600h" pki_int

  # Create Intermediate CA CSR
  vault write -format=json pki_int/intermediate/generate/internal \
  common_name="example.com Intermediate Authority" | jq -r '.data.csr' \
  > int-ca.csr

  # Sign Intermediate CA certificate
  vault write -format=json pki/root/sign-intermediate csr=@int-ca.csr \
  format=pem_bundle ttl="87600h" | jq -r '.data.certificate' > int-ca.pem

  # Sign Intermediate CA certificate with the Root CA key
  vault write pki_int/intermediate/set-signed certificate=@int-ca.pem

  # Create CA bundle as we have an Intermediate CA
  cat int-ca.pem root-ca.crt > ca.crt

  # Create a PKI role
  vault write pki_int/roles/my-role allowed_domains="example.com" \
  allow_subdomains=true max_ttl="87600h" allow_ip_sans=true

  # Issue new PKI certificate
  vault write pki_int/issue/my-role common_name="vault.example.com" \
  ttl="87500h" ip_sans="127.0.0.1" > vault-bundle.pem
  ```

  * Copy `certificate` section from `vault-bundle.pem` to `vault.crt`

  * Copy `private_key` section from `vault-bundle.pem` to `vault.key`

  * Copy Vault server certificate and private key to the Docker volume

  ```
  cp vault.crt ./volumes/certs/
  cp vault.key ./volumes/certs/
  ```

  * Modify `vault.json` to enable TLS and copy it to the Docker volume

  ```
  {
    ...
    "listener": {
      "tcp":{
        "address": "0.0.0.0:8200",
        "tls_disable": 0,
        "tls_cert_file": "/vault/certs/vault.crt",
        "tls_key_file": "/vault/certs/vault.key"
      }
    },
    ...
  }
  ```

  * Recreate Vault docker container

  * Reconfigure Vault CLI env

  ```
  export VAULT_ADDR="https://127.0.0.1:8200"
  export VAULT_CACERT=./certs/ca.crt
  ```

  * Unseal the vault and login as root again

  * Create a Vault policy file

  ```
  cat <<EOF > my-policy-permissions.hcl
  path "my-role/*" {
    capabilities = ["create","read","update","delete","list"]
  }

  path "my-role/data/*" {
    capabilities = ["create","read","update","delete"]
  }

  path "my-role/delete/*" {
    capabilities = ["update"]
  }

  path "my-role/undelete/*" {
      capabilities = ["update"]
  }

  path "my-role/destroy/*" {
      capabilities = ["update"]
  }

  path "my-role/metadata/*" {
      capabilities = ["delete","list","read"]
  }

  path "/auth/approle/role/my-role" {
  capabilities = ["update"]
    allowed_parameters = {
          "token_ttl" = []
    }
  }

  path "/auth/approle/role/my-role/secret-id" {
      capabilities = ["create", "read", "update", "delete", "list"]
  }

  path "/auth/approle/role/my-role/secret-id/*" {
      capabilities = ["create", "read", "update", "delete", "list"]
  }

  path "/auth/approle/role/my-role/secret-id-accessor" {
      capabilities = ["create", "read", "update", "delete", "list"]
  }

  path "/auth/approle/role/my-role/secret-id-accessor/*" {
      capabilities = ["create", "read", "update", "delete", "list"]
  }

  path "secret*" {
    capabilities = [ "create", "read", "update", "delete", "list" ]
  }
  EOF
  ```

  * Create an AppRole with role_id and secret_id

  ```
  # Policy indicates the permissions and scopes an AppRole will have
  vault policy write my-policy my-policy-permissions.hcl

  # Create an AppRole, usually one per application
  vault write auth/approle/role/my-role secret_id_ttl="720h"  token_ttl="12h"\
  token_max_tll="12h"  policies="my-policy"

  # Get the AppRole role-id
  vault read auth/approle/role/my-role/role-id

  # Get the initial secret-id tied to the role-id
  vault write -f auth/approle/role/my-role/secret-id
  ```

  * Enable kubernetes auth method and create a role

  ```
  # Enable kubernetes auth method and mount it on default auth/kubernetes
  vault auth enable kubernetes

  # Get you K8s cluster info
  kubectl cluster-info

  # Configure a service account for the vault
  kubectl apply -f ./tests/k8s-service-account.yaml

  # Find out the vault-auth service account token
  kubectl get secret <secret_name> -o jsonpath={.data.token} | base64 -d

  # Configure Vault K8s auth method
  vault write auth/kubernetes/config \
    token_reviewer_jwt="<your reviewer service account JWT>" \
    kubernetes_host=https://192.168.99.119:8443 \
    kubernetes_ca_cert=@k8s-ca.crt

  # Create a named role
  vault write auth/kubernetes/role/my-role \
    bound_service_account_names=vault-auth \
    bound_service_account_namespaces=default \
    policies=default \
    ttl=1h

  # Test a login using K8s auth method
  vault write auth/kubernetes/login \
    role=my-role \
    jwt="<your reviewer service account JWT>"
  ```

* Enable TLS cert auth method and create a cert

  ```
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
  ```
