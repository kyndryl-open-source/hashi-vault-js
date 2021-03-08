# Hashi Vault JS

## LDAP Functions List

* loginWithLdap(username, password)

```javascript
/**
* @param {String<required>} username
* @param {String<required>} password
* @param {String} mount
* @returns {Object}
*/
```

* listLdapUsers(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createLdapUser(token, username, policies, groups)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {[String]<required>} policies
* @param {String<required>} groups
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

* readLdapUser(token, username)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateLdapUser(token, username, policies, groups)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {[String]<required>} policies
* @param {String<required>} groups
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

**Note:** This is just an alias to createLdapUser as they share the same API endpoint.

* deleteLdapUser(token, username)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createLdapGroup(token, group, policies)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

* readLdapGroup(token, group)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listLdapGroups(token)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateLdapGroup(token, group, policies)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

**Note:** This is just an alias to createLdapGroup as they share the same API endpoint.

* deleteLdapGroup(token, group)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {String} mount
* @returns {Promise<Object>}
*/
```
