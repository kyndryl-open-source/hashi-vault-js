# Hashi Vault JS

## Token Functions List

* createToken(vaultToken, id, roleName, policies, meta, noParent,
  noDefaultPolicy, renewable, ttl, type, explicitMaxTtl, displayName,
  numUses, period, entityAlias)

```javascript
/**
* @param {String} vaultToken
* @param {String} roleName
* @param {[String]} policies
* @param {Object} meta
* @param {Boolean} noParent
* @param {Boolean} noDefaultPolicy
* @param {Boolean} renewable
* @param {String} ttl
* @param {String} type
* @param {String} explicitMaxTtl
* @param {String} displayName
* @param {Integer} numUses
* @param {String} period
* @param {String} entityAlias
* @returns {Promise<Object>}
*/
```
**Note:** vaultToken is a Vault token that has _create_ capability on the `auth/token/create` path.

* createSToken(vaultToken, roleName, policies, renewable, ttl)

```javascript
/**
* @param {String} vaultToken
* @param {String} roleName
* @param {[String]} policies
* @param {Boolean} renewable
* @param {String} ttl
* @returns {Promise<Object>}
*/
```

**Note:** This is a pre-parameterized call to createToken.

* createBToken(vaultToken, roleName, policies, ttl)

```javascript
/**
* @param {String} vaultToken
* @param {String} roleName
* @param {[String]} policies
* @param {String} ttl
* @returns {Promise<Object>}
*/
```

**Note:** This is a pre-parameterized call to createToken.

* createOrphanSToken(vaultToken, policies, renewable, ttl)

```javascript
/**
* @param {String} vaultToken
* @param {[String]} policies
* @param {Boolean} renewable
* @param {String} ttl
* @returns {Promise<Object>}
*/
```

**Note:** This is a pre-parameterized call to createToken.

* createOrphanBToken(vaultToken, policies, ttl)

```javascript
/**
* @param {String} vaultToken
* @param {[String]} policies
* @param {String} ttl
* @returns {Promise<Object>}
*/
```

**Note:** This is a pre-parameterized call to createToken.

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
