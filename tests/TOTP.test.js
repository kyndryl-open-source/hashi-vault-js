// Jest unit test for Vault.js
// TOTP secret engine
// This test will create a new TOTP key, read the TOTP key, and delete the TOTP key.
// npm run test:totp
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
    timeout: 3000,
    proxy: false
});

const KeyName = "my-totp-key";

const KeyParams = {
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

test('createTOTPKey: the result is a TOTP key created - HTTP 200', async () => {
  const data = await vault.createTOTPKey(RootToken, KeyName, KeyParams);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readTOTPKey: the result is a TOTP key information retrieved', async () => {
  const data = await vault.readTOTPKey(RootToken, KeyName);
    console.log(data);
	return expect(data).toBeDefined();
});