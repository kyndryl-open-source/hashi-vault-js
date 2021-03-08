# Hashi Vault JS

## AppRole Functions List

* loginWithAppRole(roleId, secretId)

```javascript
/**
* @param {String<required>} roleId
* @param {String<required>} secretId
* @param {String} mount
* @returns {Object}
*/
```

* generateAppRoleSecretId(token, appRole, metadata)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} appRole
* @param {String} metadata
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} appRole
* @param {String<required>} secretId
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* destroyAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} appRole
* @param {String<required>} secretId
* @param {String} mount
* @returns {Promise<Object>}
*/
```
