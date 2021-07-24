# Hashi Vault JS

## Kubernetes Functions List

* loginWithK8s(role, jwt, mount)

```javascript
/**
* @param {String<required>} role
* @param {String<required>} jwt
* @param {String} mount
* @returns {Object}
*/
```

* updateK8sConfig(token, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {Object<required>} params
 * @param {String} params.kubernetes_host
 * @param {String} params.kubernetes_ca_cert
 * @param {String} params.token_reviewer_jwt
 * @param {Object} [params.pem_keys]
 * @param {String} params.issuer
 * @param {Boolean} params.disable_iss_validation
 * @param {Boolean} params.disable_local_ca_jwt
 * @param {String} mount
 * @returns {Object}
 */
```

* readK8sConfig(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createK8sRole(token, role, params, mount)

```javascript
/**
 * @param {String<required>} token
 * @param {String<required>} role
 * @param {Object<required>} params
 * @param {Object} [params.bound_service_account_names]
 * @param {Object} [params.bound_service_account_namespaces]
 * @param {String} params.audience
 * @param {Integer or String} params.token_ttl
 * @param {Integer or String} params.token_max_ttl
 * @param {Object} [params.token_policies]
 * @param {Object} [params.token_bound_cidrs]
 * @param {Integer or String} params.token_explicit_max_ttl
 * @param {Boolean} params.token_no_default_policy
 * @param {Integer} params.token_num_uses
 * @param {Integer or String} params.token_period
 * @param {String} params.token_type
 * @param {String} mount
 * @returns {Object}
 */
```

* readK8sRole(token, role, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listK8sRoles(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deleteK8sRole(token, role, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} role
* @param {String} mount
* @returns {Promise<Object>}
*/
```
