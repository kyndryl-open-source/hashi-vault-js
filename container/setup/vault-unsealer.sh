#!/usr/bin/env bash

## Important notice
## This shell script unseals the Vault server with the following:
## - Unseal the vault with 3 keys from the 6 available keys without any protection
## or key isolation
## This script should be used as model for configuring an dev/test environment, 
## and should NEVER used in production.
## 

export VAULT_ADDR=https://vault.chatopsknight.ibm.com:8200
export VAULT_CACERT=ca.crt

source vault-seals.env

# it requires at least 3 keys from the existing 6 to unseal the vault
vault operator unseal $VAULT_UNSEAL_KEY1
vault operator unseal $VAULT_UNSEAL_KEY3
vault operator unseal $VAULT_UNSEAL_KEY5
# Log as root after the vault is unsealed
vault login $VAULT_ROOT_TOKEN
