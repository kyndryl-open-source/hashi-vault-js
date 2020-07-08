# Hashi Vault JS
<img alt="David" src="https://img.shields.io/david/rod4n4m1/hashi-vault-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rod4n4m1/hashi-vault-js">
<img alt="npm" src="https://img.shields.io/npm/dm/hashi-vault-js">
<img alt="NPM" src="https://img.shields.io/npm/l/hashi-vault-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/rod4n4m1/hashi-vault-js">

This module provides a set of functions to help **JavaScript** Developers working with Hashicorp Vault to authenticate and access API endpoints using **JavaScript** _promises_.

## Requirements (MacOS/Windows)

* Node v10.x
* npm v6.x
* Hashicorp Vault v1.4.x

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire Xcode App installed.

### Install

`npm install hashi-corp-js`

### Uninstall

`npm uninstall hashi-corp-js`

### Change Log

* `0.2.2`
  * Improved documentation and README
  * Added new function `healthCheck`

* `0.2.1`
  * Fixed README and documentation

* `0.2.0`
  * Added new functions `generateAppRoleSecretId`, `readAppRoleSecretId` and `destroyAppRoleSecretId`
  * Improved test suite

* `0.1.1`
  * Removed dependency on fs as it's native now

* `0.1.0`
  * First working module with KV v2 secret engine

### Class Constructor

```javascript
{
  // Indicates if the HTTP request to the Vault server should use
  // HTTPS (secure) or HTTP (non-secure) protocol
  https: true,
  // If https is true, then provide client certificate, client key and
  // the root CA cert
  cert: './client.crt',
  key: './client.key',
  cacert: './ca.crt',
  // Indicate the server name/IP, port and API version for the Vault,
  // all paths are relative to this one
  baseUrl: 'https://127.0.0.1:8200/v1',
  // Sets the root path after the base URL, it translates to a
  // partition inside the Vault where the secret engine was enabled
  rootPath: 'secret',
  // HTTP request timeout in milliseconds
  timeout: 1000,
  // If should use a proxy or not by the HTTP request
  // Example:
  // proxy: { host: proxy.ip, port: proxy.port }
  proxy: false
}
```

### Module usage

**Note:** This module only implements API client for the Vault KV version 2 secret engine

```javascript
const Vault = require('hashi-vault-js');

const vault = new Vault( {
    https: true,
    cert: './client.crt',
    key: './client.key',
    cacert: './ca.crt',
    baseUrl: 'https://127.0.0.1:8200/v1',
    rootPath: 'secret',
    timeout: 2000,
    proxy: false
});
```

Check health status of the Vault server:

```javascript
const status = await vault.healthCheck();
```

Perform a login on the Vault with role-id/secret-id pair (AppRole login) and get a valid client token:

```javascript
const token = await vault.loginWithAppRole(RoleId, SecretId).client_token;
```

Define a function to return secret engine information from the Vault:

```javascript
const secretEngineInfo = function(token) {
  return vault.readKVEngineConfig(token).then(function(result){
    return result;
  }).catch(function(error){
    return error;
  });
};
```

Create a new secret in the Vault:

```javascript
const Item={
  name: "slack",
  data: {
    bot_token1: "xoxb-123456789012-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3"
  }
};

const data = await vault.createKVSecret(token, Item.name , Item.data);
```

Read a secret from the Vault:

```javascript
const secrets = await vault.readKVSecret(token, Item.name);
```

Update secret version 1 in the Vault:

```javascript
const data = await vault.updateKVSecret(token, Item.name , newData, 1);
```

### List of functions available

* healthCheck()

```javascript
/**
* @returns {Promise}
*/
```

* loginWithAppRole(roleId, secretId)

```javascript
/**
* @param {String} roleId
* @param {String} secretId
* @returns {Object}
*/
```  

* readKVEngineConfig(token)

```javascript
/**
* @param {String} token
* @returns {Promise}
*/
```

* createKVSecret(token, name, secrets)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Object} secrets
* @returns {Promise}
*/
```

* updateKVSecret(token, name, secrets, version)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Object} secrets
* @param {Number} version
* @returns {Promise}
*/
```

* readKVSecret(token, name, version)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Number} version
* @returns {Promise}
*/
```

* deleteLatestVerKVSecret(token, name)

```javascript
/**
* @param {String} token
* @param {String} name
* @returns {Promise}
*/
```

* deleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Number]} versions
* @returns {Promise}
*/
```

* undeleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Number]} versions
* @returns {Promise}
*/
```

* destroyVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Number]} versions
* @returns {Promise}
*/
```

* listKVSecret(token, name)

```javascript
/**
* @param {String} token
* @param {String} name
* @returns {Promise}
*/
```

* generateAppRoleSecretId(token, appRole, metadata)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} metadata
* @returns {Promise}
*/
```

* readAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} secretId
* @returns {Promise}
*/
```

* destroyAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} secretId
* @returns {Promise}
*/
```

### Limitations

The following Hashicorp Vault API endpoints are currently covered:

* [System Backend](https://www.vaultproject.io/api-docs/system) - Partially

* [AppRole Auth Method](https://www.vaultproject.io/api-docs/auth/approle) - Partially

* [KV Secrets Engine - Version 2](https://www.vaultproject.io/api-docs/secret/kv/kv-v2) - Full


### Creating your test environment (with HTTPS)

* Install Vault CLI. Instructions are on this [link](https://www.vaultproject.io/downloads)

* Configure your Vault CLI environment

  ```
  # Should match the Vault listener configuration
  export VAULT_ADDR="https://127.0.0.1:8200"
  # CA root certificate for HTTPS protocol
  export VAULT_CACERT=~/Library/vault/CA_cert.crt
  # Location of the vault command
  export PATH=$PATH:~/Library/vault
  ```

* Modify Docker compose configuration on this file: `docker-compose.yaml`

* Alter Vault server configuration on this file: `vault.json`

* Create volumes and copy any certificate/key that you have

  ```
  # Create volumes on your local filesystem, for cloud environments you'll need a private volume
  mkdir ./volumes
  mkdir ./volumes/config
  mkdir ./volumes/file
  mkdir ./volumes/logs
  # Copy Vault server config to the volume
  cp vault.json ./volumes/config/
  # Copy Vault server TLS certificate and key to the volume, this can be created by Vault PKI secret engine
  cp vault.crt ./volumes/config/
  cp vault.key ./volumes/config/
  ```

* Spin up the container on your environment `docker-compose up --build -d`

* Initiate your Vault with the following command: `vault operator init -key-shares=6 -key-threshold=3`

* Unseal your Vault by providing at least 3 keys out of 6

  ```
  vault operator unseal $KEY1
  vault operator unseal $KEY2
  vault operator unseal $KEY3
  ```

  * Every time you restart your Vault you'll need to unseal it
  * It's recommended that no single person has all the 6 keys
  * It's possible to automate this unsealing process for high availability

* Configure your Vault accordingly, but minimally
  * Enable the KV v2 secret engine

  ```
  vault secrets enable -path=secrets kv-v2
  ```

  * Create root CA, intermediate and Vault certificates

  ```
  # Enable PKI secret engine
  vault secrets enable pki
  # Configure PKI TTL
  vault secrets tune -max-lease-ttl="87600h" pki
  # Create root CA certificate
  vault write -field=certificate pki/root/generate/internal common_name="example.com" ttl="87600h" > ca.crt
  # Enable Intermediary PKI
  vault secrets enable -path=pki_int pki
  # Configure Intermediary PKI TTL
  vault secrets tune -max-lease-ttl="87600h" pki_int
  # Create intermediate CSR
  vault write -format=json pki_int/intermediate/generate/internal common_name="example.com Intermediate Authority" | jq -r '.data.csr' > intermediate.csr
  # Sign intermediate Certificate
  vault write -format=json pki/root/sign-intermediate csr=@intermediate.csr format=pem_bundle ttl="87600h" | jq -r '.data.certificate' > intermediate.pem
  # Sign intermediate certificate with root CA
  vault write pki_int/intermediate/set-signed certificate=@intermediate.pem
  # Create a role
  vault write pki_int/roles/role-name allowed_domains="example.com" allow_subdomains=true max_ttl="87600h"
  # Issue new certificate
  vault write pki_int/issue/role-name common_name="vault.example.com" ttl="87500h"
  ```

  * Create an AppRole with role_id and secret_id

  ```
  # Policy indicates the permissions and scopes an AppRole will have
  vault policy write policy-name policy-permissions.hcl
  # Create an AppRole, usually one per application
  vault write auth/approle/role/role-name secret_id_ttl="720h"  token_ttl="12h"  token_max_tll="12h"  policies="policy-name"
  # Get the AppRole role-id
  vault read auth/approle/role/role-name/role-id
  # Get the initial secret-id tied to the role-id
  vault write -f auth/approle/role/role-name/secret-id
  ```

### References

  * Hashicorp Vault Using KV engine [doc](https://learn.hashicorp.com/vault/secrets-management/sm-versioned-kv)

  * Hashicorp Vault Docker Hub [page](https://hub.docker.com/_/vault)

  * Ruan Bekker's Blog [post](https://blog.ruanbekker.com/blog/2019/05/06/setup-hashicorp-vault-server-on-docker-and-cli-guide/)


### Contributing
If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a **Pull Request**.


### Authors
Written by Rod Anami <rod.anami@br.ibm.com>, June 2020.


### License
This project is licensed under the [IBM Public License 1.0](https://opensource.org/licenses/IPL-1.0).

Copyright (c) 2020 IBM

Hashicorp Vault open source is licensed under the [Mozilla Public License 2.0](https://github.com/hashicorp/vault/blob/master/LICENSE).
