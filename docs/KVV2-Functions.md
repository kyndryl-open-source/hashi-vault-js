# Hashi Vault JS

## KV v2 Functions List

* readKVEngineConfig(token)

```javascript
/**
* @param {String} token
* @returns {Promise<Object>}
*/
```

* createKVSecret(token, name, secrets)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Object} secrets
* @returns {Promise<Object>}
*/
```

* updateKVSecret(token, name, secrets, version)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Object} secrets
* @param {Integer} version
* @returns {Promise<Object>}
*/
```

* readKVSecret(token, name, version)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {Integer} version
* @returns {Promise<Object>}
*/
```

* deleteLatestVerKVSecret(token, name)

```javascript
/**
* @param {String} token
* @param {String} name
* @returns {Promise<Object>}
*/
```

* deleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Integer]} versions
* @returns {Promise<Object>}
*/
```

* undeleteVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Integer]} versions
* @returns {Promise<Object>}
*/
```

* destroyVersionsKVSecret(token, name, versions)

```javascript
/**
* @param {String} token
* @param {String} name
* @param {[Integer]} versions
* @returns {Promise<Object>}
*/
```

* listKVSecret(token, name)

```javascript
/**
* @param {String} token
* @param {String} name
* @returns {Promise<Object>}
*/
```
