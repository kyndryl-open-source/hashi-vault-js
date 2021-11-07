# Hashi Vault JS

## TLS Certificate Functions List

### loginWithCert

* **Function:** loginWithCert(certName, mount)

* **Description:**

  Performs a Vault login to get a valid token by using Vault TLS Certificate auth method. It only requires the certification name issued by the Vault Server through its PKI module and registered in the auth role. The certificate and private key are passed as the Vault class constructor properties instead of using the call payload.

* **Payload:**

  ```javascript
  /**
  * @param {String} mount
  * @param {String} certName
  * @returns {Promise<Object>}
  */
  ```
