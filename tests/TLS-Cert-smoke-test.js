//Simple test


// source process.env
// node TLS-Cert-smoke-test.js

const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootToken = process.env.VAULT_ROOT_TOKEN;
const TLSCertName = process.env.TLS_CERT_NAME;
const TLSCertCertificate = process.env.TLS_CERT_CERTIFICATE;
const TLSCertPrivKey = process.env.TLS_CERT_PRIV_KEY;

const Vault = require('../Vault');

const vault = new Vault( {
    https: true,
    cert: TLSCertCertificate,
    key: TLSCertPrivKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: 'auth/cert',
    timeout: 20000,
    proxy: false
});


vault.healthCheck().then(function(data) {
  console.log('> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.loginWithCert(TLSCertName, null).then(function(data){
      console.log('>> loginWithCert output: \n',data);
    }).catch(function(setError){
      console.error('>>> loginWithCert error: \n',setError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
