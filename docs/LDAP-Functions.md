# Hashi Vault JS

## LDAP Functions List

* loginWithLdap(username, password)

```javascript
/**
* @param {String} username
* @param {String} password
* @returns {Object}
*/
```

* listLdapUsers(token)

```javascript
/**
* @param {String} token
* @returns {Promise<Object>}
*/
```

* createLdapUser(token, username, policies, groups)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {[String]} policies
* @param {String} groups
* @returns {Promise<Object>}
*/
```

* readLdapUser(token, username)

```javascript
/**
* @param {String} token
* @param {String} username
* @returns {Promise<Object>}
*/
```

* updateLdapUser(token, username, policies, groups)

```javascript
/**
* @param {String} token
* @param {String} username
* @param {[String]} policies
* @param {String} groups
* @returns {Promise<Object>}
*/
```

**Note:** This is just an alias to createLdapUser as they share the same API endpoint.

* deleteLdapUser(token, username)

```javascript
/**
* @param {String} token
* @param {String} username
* @returns {Promise<Object>}
*/
```

* listLdapGroups(token)

```javascript
/**
* @param {String} token
* @returns {Promise<Object>}
*/
```

* createLdapGroup(token, group, policies)

```javascript
/**
* @param {String} token
* @param {String} group
* @param {[String]} policies
* @returns {Promise<Object>}
*/
```

* readLdapGroup(token, group)

```javascript
/**
* @param {String} token
* @param {String} group
* @returns {Promise<Object>}
*/
```

* updateLdapGroup(token, group, policies)

```javascript
/**
* @param {String} token
* @param {String} group
* @param {[String]} policies
* @returns {Promise<Object>}
*/
```

**Note:** This is just an alias to createLdapGroup as they share the same API endpoint.

* deleteLdapGroup(token, group)

```javascript
/**
* @param {String} token
* @param {String} group
* @returns {Promise<Object>}
*/
```
