const Vault = require('../Vault');
let key = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const fs =require('fs');
let caBundle = "";

try {
  caBundle = fs.readFileSync('tests/ca-bundle.pem', 'utf8');
} catch(fsError) {
  console.error('FS error: ', fsError);
}

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: RootPath,
    timeout: 1000,
    proxy: false
});

//TODO: Improve expect assertion on all tests

test('configCA: the result is a new CA root certificate and key configured', async () => {
  const data = await vault.setCACertificate(RootToken, caBundle);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readCACertificate: the result is a root CA certificate on PEM format', async () => {
  const data = await vault.readCACertificate('pem');
    console.log(data);
	return expect(data).toBeDefined();
});

test('readCAChain: the result is a root CA chain - Returns 204 if not available', async () => {
  const data = await vault.readCAChain();
    console.log(data);
	return expect(data).toBeDefined();
});

test('listCertificates: the result is a list of issued certificates', async () => {
  const data = await vault.listCertificates(RootToken);
    console.log(data);
    key = data.keys[0];
	return expect(data).toBeDefined();
});

test('readCertificate: the result is the first certificate from previous list', async () => {
  const data = await vault.readCertificate(key);
    console.log(data);
	return expect(data).toBeDefined();
});

test('setCrlConfig: the result is the PKI CRL set', async () => {
  const data = await vault.setCrlConfig(RootToken, '720h', false);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readCrlConfig: the result is the PKI CRL configuration', async () => {
  const data = await vault.readCrlConfig(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('setPkiUrls: the result is the PKI URLs set', async () => {
  const data = await vault.setPkiUrls(RootToken, [ 'https://vault.local:8200/v1/pki/crl' ], [ 'https://vault.local:8200/v1/pki/ca' ], [ 'https://vault.local:8200/v1/pki/oscp' ]);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readPkiUrls: the result is the PKI URLs configuration', async () => {
  const data = await vault.readPkiUrls(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readPkiCrl: the result is the Certificate Revocation List (CRL) on PEM format', async () => {
  const data = await vault.readPkiCrl('pem');
    console.log(data);
	return expect(data).toBeDefined();
});
