# Hashi Vault JS

## Kubernetes Functions List

* loginWithK8s(role, jwt)

```javascript
/**
* @param {String<required>} role
* @param {String<required>} jwt
* @param {String} mount
* @returns {Object}
*/
```

* updateK8sConfig(token, data)

```javascript
/**
* @param {String<required>} token
* @param {Object<required>} data
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readK8sConfig(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createK8sRole(token, role, data)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {Object<required>} data
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readK8sRole(token, role)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listK8sRoles(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteK8sRole(token, role)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```
