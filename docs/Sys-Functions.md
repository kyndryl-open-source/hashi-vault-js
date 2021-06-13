# Hashi Vault JS

## System Functions List

* healthCheck(params)

```javascript
/**
* @param {Object} params
* @returns {Promise<Object>}
*/
```

* sysHostInfo(sudoToken)

```javascript
/**
* @param {String} sudoToken
* @returns {Promise<Object>}
*/
```

**Note:** sudoToken is a Vault token that has _sudo_ capability on the `sys/*` path.


* sysCapabilities(sudoToken, token, paths)

```javascript
/**
* @param {String} sudoToken
* @param {String} token
* @param {[String]} paths
* @returns {Promise<Object>}
*/
```

* sysCapabilitiesSelf(token, paths)

```javascript
/**
* @param {String} token
* @param {[String]} paths
* @returns {Promise<Object>}
*/
```

* sysInternalCounters(sudoToken, type)

```javascript
/**
* @param {String} sudoToken
* @param {Const} type
* @returns {Promise<Object>}
*/
```

* sysMetrics(sudoToken, format)

```javascript
/**
* @param {String} sudoToken
* @param {Const} type
* @returns {Promise<Object>}
*/
```
