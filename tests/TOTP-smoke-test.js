//Simple smoke test
// TOTP secret engine
// This test will create a new TOTP key, read the TOTP key, and delete the TOTP key.
// source process.env
// node TOTP-smoke-test.js
import Vault from '../src/Vault.js';

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: 'totp',
    timeout: 5000,
    proxy: false
});

const name = "my-totp-key";

const params = {
  generate: true,
  exported: true,
  issuer: "hashi-vault-js",
  account_name: "chatopsknight",
  algorithm: "SHA512",  
  digits: 8,
  period: 60,
  skew: 0,
  qr_size: 400
};

vault.createTOTPKey(RootToken, name, params).then(function(data){
    console.log('1> createTOTPKey output:\n',data);
    vault.readTOTPKey(RootToken, name).then(function(data){
        console.log('2> readTOTPKey output:\n',data);
    }).catch(function(readError){
        console.error('2> readTOTPKey error:\n',readError);
    });
}).catch(function(createError){
    console.error('1> createTOTPKey error:\n',createError);
    console.error('1> createTOTPKey error:\n',createError.response.data);
});