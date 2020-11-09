# Hashi Vault JS

## PKI Functions List

* setCACertificate(token, pemBundle, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} pemBundle
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readCACertificate(format, mount)

```javascript
/**
* @param {String: 'der', 'pem'} format
* @param {String} mount
* @returns {Promise<String>}
*/
```

* readCAChain(mount)

```javascript
/**
* @param {String} mount
* @returns {Promise<String>}
*/
```

* readCertificate(serial, mount)

```javascript
/**
* @param {String<required>} serial
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listCertificates(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readCrlConfig(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* setCrlConfig(token, expiry, disable, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} expiry
* @param {Boolean} disable
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readPkiUrls(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* setPkiUrls(token, issuingCertificates, crlDistributionPoints, oscpServers, mount)

```javascript
/**
* @param {String<required>} token
* @param {[String]} issuingCertificates
* @param {[String]} crlDistributionPoints
* @param {[String]} oscpServers
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readPkiCrl(format, mount)

```javascript
/**
* @param {String: 'der', 'pem'} format
* @param {String} mount
* @returns {Promise<String>}
*/
```

* rotatePkiCrl(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* generateRootCA(sudoToken, params, mount)

```javascript
/**
* @param {String<required>} sudoToken
* @param {String<required>: 'internal', 'exported'} params.type
* @param {String<required>} params.commonName
* @param {String} params.altNames
* @param {String} params.ipSans
* @param {String} params.uriSans
* @param {String} params.otherSans
* @param {String} params.ttl
* @param {String: 'der', 'pem', 'pem_bundle'} params.format
* @param {String: 'der', 'pkcs8'} params.pkFormat
* @param {String: 'rsa', 'ec'} params.keyType
* @param {Integer} params.keyBits
* @param {Boolean} params.excludeCnFromSans
* @param {Integer} params.maxPathLength
* @param {String} params.permittedDnsDomains
* @param {String} params.ou
* @param {String} params.organization
* @param {String} params.country
* @param {String} params.locality
* @param {String} params.province
* @param {String} params.streetAddress
* @param {String} params.postalCode
* @param {String} params.serialNumber
* @param {String} mount
* @returns {Promise<String>}
*/
```

* deleteRootCA(sudoToken, mount)


```javascript
/**
* @param {String<required>} sudoToken
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* genIntermediateCA(token, params, mount)


```javascript
/**
* @param {String<required>} token
* @param {String<required>: 'internal', 'exported'} params.type
* @param {String<required>} params.commonName
* @param {String} params.altNames
* @param {String} params.ipSans
* @param {String} params.uriSans
* @param {String} params.otherSans
* @param {String: 'der', 'pem', 'pem_bundle'} params.format
* @param {String: 'der', 'pkcs8'} params.pkFormat
* @param {String: 'rsa', 'ec'} params.keyType
* @param {Integer} params.keyBits
* @param {Boolean} params.excludeCnFromSans
* @param {String} params.ou
* @param {String} params.organization
* @param {String} params.country
* @param {String} params.locality
* @param {String} params.province
* @param {String} params.streetAddress
* @param {String} params.postalCode
* @param {String} params.serialNumber
* @param {String} mount
* @returns {Promise<String>}
*/
```

* signIntermediateCA(sudoToken, params, mount)

```javascript
/**
* @param {String<required>} sudoToken
* @param {String<required>} params.csr
* @param {String<required>} params.commonName
* @param {String} params.altNames
* @param {String} params.ipSans
* @param {String} params.uriSans
* @param {String} params.otherSans
* @param {String} params.ttl
* @param {String: 'der', 'pem', 'pem_bundle'} params.format
* @param {Integer} params.maxPathLength
* @param {Boolean} params.excludeCnFromSans
* @param {Boolean} params.useCsrValues
* @param {String} params.permittedDnsDomains
* @param {String} params.ou
* @param {String} params.organization
* @param {String} params.country
* @param {String} params.locality
* @param {String} params.province
* @param {String} params.streetAddress
* @param {String} params.postalCode
* @param {String} params.serialNumber
* @param {String} mount
* @returns {Promise<String>}
*/
```

* setIntermediateCA(token, certificate, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} certificate
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* genPkiCertificate(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>: 'internal', 'exported'} params.role
* @param {String<required>} params.commonName
* @param {String} params.altNames
* @param {String} params.ipSans
* @param {String} params.uriSans
* @param {String} params.otherSans
* @param {String} params.ttl
* @param {String: 'der', 'pem', 'pem_bundle'} params.format
* @param {String: 'der', 'pkcs8'} params.pkFormat
* @param {Boolean} params.excludeCnFromSans
* @param {String} mount
* @returns {Promise<String>}
*/
```

* revokePkiCertificate(token, serialNumber, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} serialNumber
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* createPkiRole(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} params.name
* @param {String} params.ttl
* @param {String} params.maxTtl
* @param {Boolean} params.allowLocalhost
* @param {[String]} params.allowedDomains
* @param {Boolean} params.allowedDomainsTemplate
* @param {Boolean} params.allowBareDomains
* @param {Boolean} params.allowSubdomains
* @param {Boolean} params.allowGlobDomains
* @param {Boolean} params.allowAnyName
* @param {Boolean} params.enforceHostnames
* @param {String} params.allowIpSans
* @param {String} params.allowedUriSans
* @param {String} params.allowedOtherSans
* @param {Boolean} params.serverFlag
* @param {Boolean} params.clientFlag
* @param {Boolean} params.codeSigningFlag
* @param {Boolean} params.emailProtectionFlag
* @param {String: 'rsa', 'ec'} params.keyType
* @param {Integer} params.keyBits
* @param {[String]} params.keyUsage
* @param {[String]} params.externalKeyUsage
* @param {String} params.extKeyUsageOids
* @param {Boolean} params.useCsrCommonName
* @param {Boolean} params.useCsrSans
* @param {String} params.ou
* @param {String} params.organization
* @param {String} params.country
* @param {String} params.locality
* @param {String} params.province
* @param {String} params.streetAddress
* @param {String} params.postalCode
* @param {String} params.serialNumber
* @param {Boolean} params.generateLease
* @param {Boolean} params.noStore
* @param {Boolean} params.requireCn
* @param {[String]} params.policyIdentifiers
* @param {Boolean} params.basicConstraintsValidForNonCa
* @param {String} params.notBeforeDuration
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* updatePkiRole(token, params, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} params.name
* @param {String} params.ttl
* @param {String} params.maxTtl
* @param {Boolean} params.allowLocalhost
* @param {[String]} params.allowedDomains
* @param {Boolean} params.allowedDomainsTemplate
* @param {Boolean} params.allowBareDomains
* @param {Boolean} params.allowSubdomains
* @param {Boolean} params.allowGlobDomains
* @param {Boolean} params.allowAnyName
* @param {Boolean} params.enforceHostnames
* @param {String} params.allowIpSans
* @param {String} params.allowedUriSans
* @param {String} params.allowedOtherSans
* @param {Boolean} params.serverFlag
* @param {Boolean} params.clientFlag
* @param {Boolean} params.codeSigningFlag
* @param {Boolean} params.emailProtectionFlag
* @param {String: 'rsa', 'ec'} params.keyType
* @param {Integer} params.keyBits
* @param {[String]} params.keyUsage
* @param {[String]} params.externalKeyUsage
* @param {String} params.extKeyUsageOids
* @param {Boolean} params.useCsrCommonName
* @param {Boolean} params.useCsrSans
* @param {String} params.ou
* @param {String} params.organization
* @param {String} params.country
* @param {String} params.locality
* @param {String} params.province
* @param {String} params.streetAddress
* @param {String} params.postalCode
* @param {String} params.serialNumber
* @param {Boolean} params.generateLease
* @param {Boolean} params.noStore
* @param {Boolean} params.requireCn
* @param {[String]} params.policyIdentifiers
* @param {Boolean} params.basicConstraintsValidForNonCa
* @param {String} params.notBeforeDuration
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* readPkiRole(token, name, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* listPkiRoles(token, mount)

```javascript
/**
* @param {String<required>} token
* @param {String} mount
* @returns {Promise<Object>}
*/
```

* deletePkiRole(token, name, mount)

```javascript
/**
* @param {String<required>} token
* @param {String<required>} name
* @param {String} mount
* @returns {Promise<Object>}
*/
```
