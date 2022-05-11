# Hashi Vault JS

## LDAP Functions List

* setLdapConfig(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @param {String} params.url
* @param {Boolean} params.case_sensitive_names
* @param {Integer} params.request_timeout
* @param {Boolean} params.starttls
* @param {String} params.tls_min_version
* @param {String} params.tls_max_version
* @param {Boolean} params.insecure_tls
* @param {String} params.certificate
* @param {String} params.client_tls_cert
* @param {String} params.client_tls_key
* @param {String} params.binddn
* @param {String} params.bindpass
* @param {String} params.userdn
* @param {String} params.userattr
* @param {Boolean} params.discoverdn
* @param {Boolean} params.deny_null_bind
* @param {String} params.upndomain
* @param {String} params.userfilter
* @param {Boolean} params.anonymous_group_search
* @param {String} params.groupfilter
* @param {String} params.groupdn
* @param {String} params.groupattr
* @param {Boolean} params.username_as_alias
* @param {Integer} params.token_ttl
* @param {Integer} params.token_max_ttl
* @param {[String]} params.token_policies
* @param {[String]} params.token_bound_cidrs
* @param {Integer} params.token_explicit_max_ttl
* @param {Boolean} params.token_no_default_policy
* @param {Integer} params.token_num_uses
* @param {Integer} params.token_period
* @param {String} params.token_type
* @returns {Promise<Object>}
*/
```

* readLdapConfig(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

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
