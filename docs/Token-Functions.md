# Hashi Vault JS

## Token Functions List

* createToken(vaultToken, params)

```javascript
/**
* @param {String} vaultToken
* @param {Object} [params]
* @param {String} [params.id]
* @param {String} [params.role_name]
* @param {String} [params.policies]
* @param {Object} [params.meta]
* @param {Boolean} [params.no_narent=false]
* @param {Boolean} [params.no_default_policy=false]
* @param {Boolean} [params.renewable=true]
* @param {String} [params.ttl]
* @param {String} [params.type=service]
* @param {String} [params.explicit_max_ttl]
* @param {String} [params.display_name]
* @param {Integer} [params.num_uses]
* @param {String} [params.period]
* @param {String} [params.entity_alias]
* @returns {Promise<Object>}
*/
```
**Note:** vaultToken is a Vault token that has _create_ capability on the `auth/token/create` path.

* createSToken - *WITHDRAW*

* createBToken - *WITHDRAW*

* createOrphanSToken - *WITHDRAW*

* createOrphanBToken - *WITHDRAW*

* revokeToken(vaultToken, clientToken)

```javascript
/**
* @param {String} vaultToken
* @param {String} clientToken
* @returns {Promise<Object>}
*/
```

* revokeSelfToken(clientToken)

```javascript
/**
* @param {String} clientToken
* @returns {Promise<Object>}
*/
```

* lookupToken(vaultToken, clientToken)

```javascript
/**
* @param {String} vaultToken
* @param {String} clientToken
* @returns {Promise<Object>}
*/
```

* lookupSelfToken(clientToken)

```javascript
/**
* @param {String} clientToken
* @returns {Promise<Object>}
*/
```

* renewToken(vaultToken, clientToken, increment)

```javascript
/**
* @param {String} vaultToken
* @param {String} clientToken
* @param {String} increment
* @returns {Promise<Object>}
*/
```

* renewSelfToken(clientToken, increment)

```javascript
/**
* @param {String} clientToken
* @param {String} increment
* @returns {Promise<Object>}
*/
```

* listAccessors(sudoToken)

```javascript
/**
* @param {String} sudoToken
* @returns {Promise<Object>}
*/
```

* lookupAccessor(vaultToken, accessor)

```javascript
/**
* @param {String} vaultToken
* @param {String} accessor
* @returns {Promise<Object>}
*/
```

* renewAccessor(vaultToken, accessor, increment)

```javascript
/**
* @param {String} vaultToken
* @param {String} accessor
* @param {String} increment
* @returns {Promise<Object>}
*/
```

* revokeAccessor(vaultToken, accessor)

```javascript
/**
* @param {String} vaultToken
* @param {String} accessor
* @returns {Promise<Object>}
*/
```
