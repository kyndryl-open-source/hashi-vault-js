# Hashi Vault JS

## TOTP Functions List

* createTOTPKey(token, name, params, mount)

```javascript
/**
 * @param {string} token
 * @param {string} name
 * @param {Object} params
 * @param {boolean} params.generate
 * @param {boolean} [params.exported] - whether the key is exportable as QR code
 * @param {number} [params.key_size=20]
 * @param {string} [params.key_url]
 * @param {string} [params.key]
 * @param {string} [params.issuer] - key issuing entity
 * @param {string} [params.account_name]
 * @param {number} [params.period=30] - length of time for the counter on the code calculation
 * @param {string} [params.algorithm=sha1] - code generator algorithm, either "SHA1", "SHA256", or "SHA512"
 * @param {number} [params.digits] - number of code digits, either 6 or 8
 * @param {number} [params.skew=1] - number of delay periods valid for code validation, either 0 or 1
 * @param {number} [params.gr_size=200] - pixel size of the QR code image
 * @param {string} [mount]
 * @returns {PromiseLike<Object>}
 */
```

* readTOTPKey(token, name, mount)

```javascript
/**
* @param {string} token
* @param {string} name
* @param {string} [mount]
* @returns {PromiseLike<Object>}
*/
```

## End
