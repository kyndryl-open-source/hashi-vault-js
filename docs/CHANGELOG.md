# Hashi Vault JS

## Change Log

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
