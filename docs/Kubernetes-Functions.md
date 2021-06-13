# Hashi Vault JS

## Kubernetes Functions List

* loginWithK8s(role, jwt, mount)

```javascript
/**
* @param {String<required>} role
* @param {String<required>} jwt
* @param {String} mount
* @returns {Object}
*/
```

* updateK8sConfig(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {Object<required>} params
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readK8sConfig(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createK8sRole(token, role, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {Object<required>} params
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readK8sRole(token, role, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listK8sRoles(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteK8sRole(token, role, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```
