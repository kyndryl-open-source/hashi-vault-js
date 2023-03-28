# Hashi Vault JS

![GitHub issues](https://img.shields.io/github/issues/rod4n4m1/hashi-vault-js)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/rod4n4m1/hashi-vault-js)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/rod4n4m1/hashi-vault-js)
![GitHub top language](https://img.shields.io/github/languages/top/rod4n4m1/hashi-vault-js)
![GitHub contributors](https://img.shields.io/github/contributors/rod4n4m1/hashi-vault-js)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/rod4n4m1/hashi-vault-js/axios)
![npm](https://img.shields.io/npm/dm/hashi-vault-js)
![NPM](https://img.shields.io/npm/l/hashi-vault-js)

This module provides a set of functions to help **JavaScript** Developers working with HashiCorp Vault to authenticate and access API endpoints using **JavaScript** _promises_.

This package is **NOT** affected by the _log4shell_ [CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228) vulnerability!

## Requirements (MacOS/Windows)

* NodeJs
  * Minimum: v14.x
  * Recommended: **v16.x**  
* npm
  * Tested on: **v9.2.x**
* HashiCorp Vault
  * Minimum: v1.11.x
  * Accepted: v1.12.x
  * Recommended: **v1.13.x**

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire Xcode App installed.

## Table of Contents

* [Install](#install)
* [Uninstall](#uninstall)
* [Release notes and versions](#release-notes-and-versions)
* [Class Constructor](#class-constructor)
* [Module usage](#module-usage)
* [TypeScript](#typescript)
* [Mount points](#mount-points)
* [Error handling](#error-handling)
* [Available functions](#available-functions)
* [Coverage and limitations](#coverage-and-limitations)
* [Test environment](#test-environment)
* [References](#references)
* [Contributing](#contributing)
* [Reporting an issue](#reporting-an-issue)
* [Suggesting a new feature](#suggesting-a-new-feature)
* [Authors](#authors)
* [Contributors](#contributors)
* [License](#license)

### Install

`npm install hashi-vault-js --save`

### Uninstall

`npm uninstall hashi-vault-js`

### Release notes and versions

[Change log](./CHANGELOG.md)

### Class Constructor

```javascript
{
  // Indicates if the HTTP request to the Vault server should use
  // HTTPS (secure) or HTTP (non-secure) protocol
  https: true,
  // If https is true, then provide client certificate, client key and
  // the root CA cert
  // Client cert and key are optional now
  cert: './client.crt',
  key: './client.key',
  cacert: './ca.crt',
  // Indicate the server name/IP, port and API version for the Vault,
  // all paths are relative to this one
  baseUrl: 'https://127.0.0.1:8200/v1',
  // Sets the root path after the base URL, it translates to a
  // partition inside the Vault where the secret engine / auth method was enabled
  // Can be passed individually on each function through mount parameter
  rootPath: 'secret',
  // HTTP request timeout in milliseconds
  timeout: 1000,
  // If should use a proxy or not by the HTTP request
  // Example:
  // proxy: { host: proxy.ip, port: proxy.port }
  proxy: false,
  // Namespace (multi-tenancy) feature available on all Vault Enterprise versions
  namespace: 'admin'
}
```

### Module usage

**Note:** This package covers some auth methods and secret engines. Check `Limitations` section for more details.

* **Production**

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
    proxy: false,
    // Only for Vault Enterprise
    namespace: 'ns1'
});
```

* **Development**

```javascript
const Vault = require('hashi-vault-js');

const vault = new Vault( {
    https: true,
    baseUrl: 'https://127.0.0.1:8200/v1',
    rootPath: 'secret',
    timeout: 5000,
    proxy: false
});
```

Check health status of the Vault server:

```javascript
const status = await vault.healthCheck();
```

Perform a login on the Vault with role-id/secret-id pair, (AppRole login) and get a valid client token:

```javascript
const token = await vault.loginWithAppRole(RoleId, SecretId).client_token;
```

Perform a login on the Vault with LDAP username/password pair, and get a valid client token:

```javascript
const token = await vault.loginWithLdap(Username, Password).client_token;
```

Perform a login on the Vault with Userpass username/password pair, and get a valid client token:

```javascript
const token = await vault.loginWithUserpass(Username, Password).client_token;
```

Perform a login on the Vault with Kubernetes service accounts token, and get a valid client token:

```javascript
const token = await vault.loginWithK8s(Role, Token).client_token;
```

Perform a login on the Vault with TLS certificate and key, and get a valid client token:

```javascript
const token = await vault.loginWithCert(certName, Token).client_token;
```

Define a function to return secret engine information from the Vault:

```javascript
const secretEngineInfo = function(token) {
  vault.readKVEngineConfig(token).then(function(result){
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

### TypeScript

`hashi-vault-js` includes TypeScript definitions in the `Vault.d.ts`.

```javascript
let response: ReadKVSecretResponse = null;
try {
  const { data } = await vault.readKVSecret(token, Item.name);
  response = data;
}
```

### Mount points

Most of the Vault Server API endpoints can be mounted on non-default path. For that reason, there's a last parameter in the related functions to allow using a custom mount path.

For instance, if you want to enable `KV v2` on a different path, you can do so:

```shell
vault secrets enable -path=knight kv-v2
```

Now you call this helper library functions with the correct mount path:

```javascript
const config = await vault.readKVEngineConfig(token, "knight")
```

### Error handling

This package extends the error stack to differentiate if the exception occurred on the Vault API layer or not. Also, adds a help message from the Vault API docs.

```javascript
try {
  vault.function(...);
}
// An exception happened and it was thrown
catch(err) {
  if(err.isVaultError) {
    // This an error from Vault API
    // Check Vault hint on this error
    console.log(err.vaultHelpMessage);
  }
  else {
    // Here is still the full Axios error, e.g. err.isAxiosError, err.response, err.request
    // This allows handling of network/tls related issues
    // Or just re-kthrow if you don't care
    throw err;
  }
}
```

Check below docs for more information on specific function groups.

### Available functions

| **Group** | **Type** | **Default mount point** | **Link** |
|:------------------|:------------------|:------------------|:--------------:|
| **Active Directory** (AD) | Secret engine | `/ad` | [Doc file](/docs/AD-Functions.md) |
| **AppRole** | Auth method | `/auth/approle` | [Doc file](/docs/AppRole-Functions.md) |
| **LDAP** | Auth method | `/auth/ldap` | [Doc file](/docs/LDAP-Functions.md) |
| **Kubernetes** | Auth method | `/auth/kubernetes` | [Doc file](/docs/Kubernetes-Functions.md) |
| **KV v2** | Secret engine | `/kv` | [Doc file](/docs/KVV2-Functions.md) |
| **PKI** | Secret engine | `/pki` | [Doc file](/docs/PKI-Functions.md) |
| **System Backend** | System | General operations | [Doc file](/docs/Sys-Functions.md) |
| **System Backend** | System | SEAL operations | [Doc file](/docs/Sys-Seal-Functions.md) |
| **TLS Certificate** | Auth method | `/auth/cert` | [Doc file](/docs/TLS-Cert-Functions.md) |
| **Token** | Auth method | `/auth/token` | [Doc file](/docs/Token-Functions.md) |
| **Userpass** | Auth method | `/auth/userpass` | [Doc file](/docs/Userpass-Functions.md) |
|  |  |  |  |

### Coverage and limitations

The following HashiCorp Vault API endpoints are currently covered:

* [System Backend](https://www.vaultproject.io/api-docs/system) - Partially

* Auth methods:

| **Method** | **Coverage status** |
|:-----------|:-----------|
| [AppRole](https://www.vaultproject.io/api-docs/auth/approle) | `Partially` |
| [LDAP](https://www.vaultproject.io/api-docs/auth/ldap) | `All endpoints` |
| [Userpass](https://www.vaultproject.io/api-docs/auth/userpass) | `All endpoints` |
| [Kubernetes](https://www.vaultproject.io/api-docs/auth/kubernetes) | `All endpoints` |
| [TLS Cert](https://www.vaultproject.io/docs/auth/cert) | `Partially` |
| [Token](https://www.vaultproject.io/api-docs/auth/token) | `Most of them` |
| | |

* Secret engines:

| **Engine** | **Coverage status** |
|:------------|:-----------|
| [Active Directory (AD)](https://www.vaultproject.io/api-docs/secret/ad) | `Most of them` |
| [KV Version 2](https://www.vaultproject.io/api-docs/secret/kv/kv-v2) | `All endpoints` |
| [PKI](https://www.vaultproject.io/api-docs/secret/pki) | `Most of them` |
| | |

### Test environment

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

Written by Rod Anami <rod.anami@kyndryl.com>, June 2020.

### Contributors

* Richard <richie765@>
* Ordinary IT9 <hkgnobody@>
* Osama Adil <adilosama47@gmail.com>
* Jose <josedev-union@>

### License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

HashiCorp Vault open source is licensed under the [Mozilla Public License 2.0](https://github.com/HashiCorp/vault/blob/master/LICENSE).
