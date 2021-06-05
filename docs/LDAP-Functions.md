# Hashi Vault JS

## LDAP Functions List

* loginWithLdap(username, password, mount)

```javascript
/**
* @param {String<required>} username
* @param {String<required>} password
* @param {String} mount
* @returns {Object}
*/
```

* listLdapUsers(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createLdapUser(token, username, policies, groups, mount)

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

* readLdapUser(token, username, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateLdapUser(token, username, policies, groups, mount)

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

* deleteLdapUser(token, username, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} username
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createLdapGroup(token, group, policies, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {[String]<required>} policies
* @param {String} mount
* @returns {Promise<Oject>}
*/
```

* readLdapGroup(token, group, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listLdapGroups(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updateLdapGroup(token, group, policies, mount)

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

* deleteLdapGroup(token, group, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} group
* @param {String} mount
* @returns {Promise<Object>}
*/
```
