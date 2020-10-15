# Hashi Vault JS

## Change Log

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
