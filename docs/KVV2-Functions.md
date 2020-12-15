# Hashi Vault JS

## KV v2 Functions List

* readKVEngineConfig(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createKVSecret(token, name, secrets)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {Object<required>} secrets
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateKVSecret(token, name, secrets, version)

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

* readKVSecret(token, name, version)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {Integer} version
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteLatestVerKVSecret(token, name)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* undeleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* destroyVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {[Integer]<required>} versions
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listKVSecrets(token, folder)

```javascript
/**
* @param {String<required>} token
* @param {String} folder
* @param {String} mount
* @returns {Promise<Object>}
*/
```
