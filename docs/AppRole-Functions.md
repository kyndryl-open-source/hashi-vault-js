# Hashi Vault JS

## AppRole Functions List

* loginWithAppRole(roleId, secretId)

```javascript
/**
* @param {String} roleId
* @param {String} secretId
* @returns {Object}
*/
```

* generateAppRoleSecretId(token, appRole, metadata)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} metadata
* @returns {Promise<Object>}
*/
```

* readAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} secretId
* @returns {Promise<Object>}
*/
```

* destroyAppRoleSecretId(token, appRole, secretId)

```javascript
/**
* @param {String} token
* @param {String} appRole
* @param {String} secretId
* @returns {Promise<Object>}
*/
```
