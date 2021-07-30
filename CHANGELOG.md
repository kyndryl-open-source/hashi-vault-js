# Hashi Vault JS

## Change Log

* `0.4.8`
  * Support for eliminateKVSecret()

* `0.4.7`
  * Support Namespaces (Enterprise Vault feature)

* `0.4.6`
  * Change constructor to allow instantiation without client certificates

* `0.4.5`
  * Added *Kubernetes (K8s) auth method* functions
    * `loginWithK8s`, `updateK8sConfig`, `readK8sConfig`, `createK8sRole`, `readK8sRole`, `listK8sRoles`, and `deleteK8sRole`
    * Improved general documentation

* `0.4.4`
  * Duplicated

* `0.4.3`
  * Added *KV v2 secret engine* function:
    * `updateKVEngineConfig`
  * Upgraded development env to Vault server `1.7.2`
  * Fixed security vulnerability (npm audit fix)

* `0.4.2`
  * Fixed security vulnerabilities (npm audit fix)
  * `hosted-git-info` and `lodash` vulnerabilities

* `0.4.1`
  * Added `mount` optional parameter to auth methods and secret engines that might be mounted on a custom path
    * LDAP auth method functions
    * Userpass auth method functions
    * AppRole auth method functions
  * Added error handling documentation to README
  * Updated dev environment to Vault `1.6.3`
  * Split AppRole and KV test suite into 2 distinct isolated tests
  * Improved KV v2 secret engine unit test

* `0.4.0`
  * Refactored `createToken` function to accept an object as parameter (Issue#6)
  * Merged Pull Request `Make createToken more friendly to use #8`
  * Implemented a new Axios error parse to fix and improve stack trace (Issue#7)

* `0.3.22`
  * Updated development env to Vault server `1.6.1`
  * Moved CHANGELOG to root directory

* `0.3.21`
  * Re-fixed bug on `createToken` function related to `typeof` never returning `undefined` (Issue#5)

* `0.3.20`
  * Updated `package.json` to force using `axios@0.21.1` (or higher) due to CVE-2020-28168

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

* `0.3.17`
  * Quick fix on KV v2 Function `listKVSecrets` when folder is defined

* `0.3.16`
  * Changed software license to EPL-2.0
  * Improved documentation about creating your test environment with HTTPS
  * Fixed and renamed KV v2 Function `listKVSecrets` to use the proper method

* `0.3.15`
  * Added *PKI secret engine* role functions:
    * `createPkiRole` (`updatePkiRole`), `readPkiRole`, `listPkiRoles`, and `deletePkiRole`

* `0.3.14`
  * Fixed package name typo in readme
  * Upgraded axios to `0.21.0` and jest to `26.6.1`
  * Set jest async callback timeout on PKI test suite

* `0.3.12`
  * Added *PKI secret engine* certificate functions:
    * `genPkiCertificate`, and `revokePkiCertificate`
  * Added *PKI secret engine* CA functions:
    * `genIntermediateCA`, `setIntermediateCA`, and `signIntermediateCA`
    * `deleteRootCA`, and `generateRootCA`
  * Added *PKI secret engine* CRL functions: `rotatePkiCrl`
  * Restructured documentation
  * Improved PKI test suite
  * Fixed parameters mismatch for `setPkiUrls`
  * Added to PKI functions support for RootPath from the constructor
  * Added mount as parameter for PKI functions

* `0.3.10`
  * Added *PKI secret engine* certificate functions: `genPkiCertificate`, `revokePkiCertificate`, `setIntermediateCA`, `signIntermediateCA`, `genIntermediateCA`, `deleteRootCA`, and `generateRootCA`
  * Added PKI secret engine CRL Functions: `rotatePkiCrl`

* `0.3.9`
  * Added *PKI secret engine* functions
    * `setCACertificate`, `readCACertificate`, `readCAChain`, `listCertificates`, and `readCertificate`
    * `setCrlConfig`, `readCrlConfig`, `setPkiUrls`, `readPkiUrls`, and `readPkiCrl`

* `0.3.8`
  * Added *Userpass auth method* functions
    * `loginWithUserpass`
    * `createUserpassUser` (`updateUserpassUser`), `readUserpassUser`, `deleteUserpassUser`, `updateUserpassPassword`, `updateUserpassPolicies`, and `listUserpassUsers`

* `0.3.7`
  * Added *LDAP auth method* functions
    * `loginWithLdap`
    * `createLdapUser` (`updateLdapUser`), `readLdapUser`, `deleteLdapUser`, and `listLdapUsers`
    * `createLdapGroup` (`updateLdapGroup`), `readLdapGroup`, `deleteLdapGroup`, and `listLdapGroup`
  * Fixed Axios parsing order for error and response handling
  * Upgraded Axios to `0.20.0`

* `0.3.6`
  * Upgraded dev environment to node.js v12.x
  * Fixed functions' interfaces documentation

* `0.3.3`
  * Added *token auth method* functions:
    * `createToken` (`createSToken`, `createBToken`, `createOrphanSToken`, `createOrphanBToken`)
    * `listAccessors`, `lookupAccessor`, `renewAccessor`, and `revokeAccessor`
    * `renewToken` and `renewTokenSelf`
    * `lookupToken` and `lookupSelfToken`
    * `revokeToken` and `revokeSelfToken`
    * `listAccessors`, `lookupAccessor`, `renewAccessor` and `revokeAccessor`
  * Refactored Axios options, and response parsing, and returned error parsing

* `0.3.1`
  * Added *System backend* helper functions `sysHostInfo`, `sysCapabilities`, `sysCapabilitiesSelf`, `sysInternalCounters`, and `sysMetrics`
  * Added *System backend* Seal functions `sealStatus`, `sysSeal`, and `sysUnseal`
  * Refactored and added to test suite

* `0.2.3`
  * Fixed security vulnerability on lodash dependency

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
  * First working module with AppRole auth method and KV v2 secret engine
