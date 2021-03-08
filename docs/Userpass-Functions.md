# Hashi Vault JS

## Userpass Functions List

* loginWithUserpass(username, password)

```javascript
/**
* @param {String<required>} username
* @param {String<required>} password
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createUserpassUser(token, username, password, policies)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String<required>} password
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateUserpassUser(token, username, password, policies)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String<required>} password
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Object>}
*/
```

**Note:** This is just an alias to createUserpassUser

* readUserpassUser(token, username)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteUserpassUser(token, username)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateUserpassPassword(token, username, password)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String<required>} password
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

* updateUserpassPolicies(token, username, policies)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

* listUserpassUsers(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```
