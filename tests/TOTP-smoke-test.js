// Test: TOTP-smoke-test.js
const Vault = require('../Vault');

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
    issuer: "hashi-vault-js",
    account_name: "hashi-vault-js",
    algorithm: "SHA256",
    generate: true
};

vault.createTOTPKey(RootToken, name, params).then(function(data){
    console.log('1> createTOTPKey output:\n',data);
}).catch(function(createError){
    console.error('1> createTOTPKey error:\n',createError);
    console.error('1> createTOTPKey error:\n',createError.response.data);
});