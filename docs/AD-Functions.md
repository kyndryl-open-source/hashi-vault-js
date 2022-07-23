# Hashi Vault JS

## AD Functions List

* Vault document [reference](https://www.vaultproject.io/api-docs/secret/ad)

* setADConfig(token, data, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {Integer} params.ttl
 * @param {Integer} params.max_ttl
 * @param {String} params.password_policy
 * @param {String} params.url
 * @param {String} params.request_timeout
 * @param {Boolean} params.starttls
 * @param {Boolean} params.insecure_tls
 * @param {String} params.certificate
 * @param {String<required>} params.binddn
 * @param {String<required>} params.bindpass
 * @param {String} params.userdn
 * @param {String} params.upndomain
 * @param {String} params.last_rotation_tolerance
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* updateADConfig(token, data, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {Integer} params.ttl
 * @param {Integer} params.max_ttl
 * @param {String} params.password_policy
 * @param {String} params.url
 * @param {String} params.request_timeout
 * @param {Boolean} params.starttls
 * @param {Boolean} params.insecure_tls
 * @param {String} params.certificate
 * @param {String<required>} params.binddn
 * @param {String<required>} params.bindpass
 * @param {String} params.userdn
 * @param {String} params.upndomain
 * @param {String} params.last_rotation_tolerance
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* readADConfig(token, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* deleteADConfig(token, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* listADRoles(token, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* createADRole(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} params.name
 * @param {String<required>} params.service_account_name
 * @param {String} params.ttl
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* updateADRole(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} params.name
 * @param {String<required>} params.service_account_name
 * @param {String} params.ttl
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* readADRole(token, roleName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} roleName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* deleteADRole(token, roleName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} roleName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* getADRoleCred(token, roleName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} roleName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* rotateADRoleCred(token, roleName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} roleName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* createADLibrary(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} params.name
 * @param {String[]<required>} params.service_account_names
 * @param {String} params.ttl
 * @param {String} params.max_ttl
 * @param {Boolean} params.disable_check_in_enforcement
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* updateADLibrary(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} params.name
* @param {String[]<required>} params.service_account_names
* @param {String} params.ttl
* @param {String} params.max_ttl
* @param {Boolean} params.disable_check_in_enforcement
* @param {String} mount
 * @returns {Promise<Object>}
 */
```

* readADLibrary(token, setName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} setName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* deleteADLibrary(token, setName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} setName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* checkADCredOut(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} params.name
 * @param {String} params.ttl
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* checkADCredIn(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} params.name
 * @param {String[]} params.service_account_names
 * @param {Boolean} forceMode
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```

* getADCredSatus(token, setName, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} setName
 * @param {String} mount
 * @returns {Promise<Object>}
 */
```
