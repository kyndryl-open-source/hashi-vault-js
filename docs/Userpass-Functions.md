# Hashi Vault JS

## Userpass Functions List

* loginWithUserpass(username, password)

```javascript
/**
* @param {String} username
* @param {String} password
* @returns {Promise<Object>}
*/
```

* createUserpassUser(token, username, password, policies)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {String} password
* @param {[String]} policies
* @returns {Promise<Object>}
*/
```

* updateUserpassUser(token, username, password, policies)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {String} password
* @param {[String]} policies
* @returns {Promise<Object>}
*/
```

* readUserpassUser(token, username)

```javascript
/**
* @param {String} token
* @param {String} username
* @returns {Promise<Object>}
*/
```

* deleteUserpassUser(token, username)

```javascript
/**
* @param {String} token
* @param {String} username
* @returns {Promise<Object>}
*/
```

* updateUserpassPassword(token, username, password)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {String} password
* @returns {Promise<Object>}
*/
```

* updateUserpassPolicies(token, username, policies)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {[String]} policies
* @returns {Promise<Object>}
*/
```

* listUserpassUsers(token)

```javascript
/**
* @param {String} token
* @returns {Promise<Object>}
*/
```
