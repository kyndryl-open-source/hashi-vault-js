# Hashi Vault JS
<img alt="David" src="https://img.shields.io/david/rod4n4m1/hashi-vault-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rod4n4m1/hashi-vault-js">
<img alt="npm" src="https://img.shields.io/npm/dm/hashi-vault-js">
<img alt="NPM" src="https://img.shields.io/npm/l/hashi-vault-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/rod4n4m1/hashi-vault-js">

This module provides a set of functions to help **JavaScript** Developers working with HashiCorp Vault to authenticate and access API endpoints using **JavaScript** _promises_.

## Requirements (MacOS/Windows)

* NodeJs
  * Minimum: v10.x
  * Recommended: **v12.x**
* npm
  * Tested on: **v6.14.x**
* HashiCorp Vault
  * Minimum: v1.4.x
  * Accepted: v1.5.x
  * Recommended: **v1.6.x**

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire Xcode App installed.

### Install

`npm install hashi-vault-js --save`

### Uninstall

`npm uninstall hashi-vault-js`

### Change Log

* `0.3.19`
  * Fixed bug on `createToken` function related to using logical OR operator with attribution on boolean params, this causes the params to be always true (Issue#5)
  * Also, removed unnecessary `null` conditional attribution to params on `renewToken`, `renewSelfToken`, and `renewAccessor` functions (Refactoring)
  * Updated development env to `axios@0.21.1` and `jest@26.6.3`
  * Mentioned Richard (richie765) as contributor

* `0.3.18`
  * Enhanced promises rejection to follow best practice (Issue#4)
  * Removed Axios call wrapping with a new promise (Issue#4)
  * Refactored KV V2 functions to accept a mount point
  * Updated development environment to Vault `1.6.0`

[Older release notes](/docs/CHANGELOG.md)

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

**Note:** This package covers some auth methods and KV v2 secret engine. Check `Limitations` section for more details.

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

Perform a login on the Vault with LDAP username/password pair and get a valid client token:

```javascript
const token = await vault.loginWithLdap(Username, Password).client_token;
```

Perform a login on the Vault with Userpass username/password pair and get a valid client token:

```javascript
const token = await vault.loginWithUserpass(Username, Password).client_token;
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

Check below docs for more information on specific function groups.

### List of functions available

**System Backend API endpoints - General**

[Doc file](/docs/Sys-Functions.md)

**System Backend API endpoints - SEAL operations**

[Doc file](/docs/Sys-Seal-Functions.md)

**Token auth method API endpoints - /auth/token**

[Doc file](/docs/Token-Functions.md)

**LDAP auth method API endpoints - /auth/ldap**

[Doc file](/docs/LDAP-Functions.md)

**Userpass auth method API endpoints - /auth/userpass**

[Doc file](/docs/Userpass-Functions.md)

**AppRole auth method API endpoints - /auth/approle**

[Doc file](/docs/AppRole-Functions.md)

**PKI secret engine API endpoints**

[Doc file](/docs/PKI-Functions.md)

**KV v2 secret engine API endpoints**

[Doc file](/docs/KVV2-Functions.md)


### Coverage and Limitations

The following HashiCorp Vault API endpoints are currently covered:

* [System Backend](https://www.vaultproject.io/api-docs/system) - Partially

* Auth methods:

| **Method** | **Coverage status** |
|:-----------|:-----------|
|  [AppRole](https://www.vaultproject.io/api-docs/auth/approle) | `Partially` |
| [LDAP](https://www.vaultproject.io/api-docs/auth/ldap) | `Most of them` |
| [Userpass](https://www.vaultproject.io/api-docs/auth/userpass) | `All endpoints` |
| [Token](https://www.vaultproject.io/api-docs/auth/token) | `Most of them` |
| | |

* Secret engines:

| **Engine** | **Coverage status** |
|:------------|:-----------|
| [KV Version 2](https://www.vaultproject.io/api-docs/secret/kv/kv-v2) | `All endpoints` |
| [PKI](https://www.vaultproject.io/api-docs/secret/pki) | `Most of them` |
| | |


### Creating your test environment (with HTTPS)

Follow the detailed instructions from this [doc](/docs/Test-environment.md)

### References

  * HashiCorp Vault Using KV engine [doc](https://learn.HashiCorp.com/vault/secrets-management/sm-versioned-kv)

  * HashiCorp Vault Docker Hub [page](https://hub.docker.com/_/vault)

  * Ruan Bekker's Blog [post](https://blog.ruanbekker.com/blog/2019/05/06/setup-hashicorp-vault-server-on-docker-and-cli-guide/)


### Contributing
If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a **Pull Request**. It will be reviewed and merged to main branch if accepted.

### Reporting an issue
If you have found what you believe to be an issue with `hashi-vault-js` please do not hesitate to file an issue on the GitHub repository [here](https://github.com/rod4n4m1/hashi-vault-js/issues/new?template=bug-report.md).

### Suggesting a new feature
If you want to see new features or enhancements to the current ones, we would love to hear them. Please submit an issue on the GitHub repository [here](https://github.com/rod4n4m1/hashi-vault-js/issues/new?template=new-feature.md).

### Authors
Written by Rod Anami <rod.anami@br.ibm.com>, June 2020.

### Contributors
Richard <richie765@>

### License
This project is licensed under the [Eclipse Public License 2.0](https://opensource.org/licenses/EPL-2.0).

HashiCorp Vault open source is licensed under the [Mozilla Public License 2.0](https://github.com/HashiCorp/vault/blob/master/LICENSE).
