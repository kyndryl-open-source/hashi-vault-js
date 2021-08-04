# Hashi Vault JS

## KV v2 Functions List

* eliminateKVSecret(token, name, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} name
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* updateKVEngineConfig(token, data, mount)

```javascript
/**
* @param {String<required>} token
* @param {Object<required>} data
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readKVEngineConfig(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createKVSecret(token, name, secrets, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {Object<required>} secrets
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateKVSecret(token, name, secrets, version, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {Object<required>} secrets
* @param {Integer<required>} version
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readKVSecret(token, name, version, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {Integer} version
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteLatestVerKVSecret(token, name, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteVersionsKVSecret(token, name, versions, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* undeleteVersionsKVSecret(token, name, versions, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* destroyVersionsKVSecret(token, name, versions, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listKVSecrets(token, folder, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} folder
* @param {String} mount
* @returns {Promise<Object>}
*/
```
