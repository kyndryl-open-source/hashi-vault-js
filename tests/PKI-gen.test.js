const Vault = require('../Vault');
let key = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
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
    rootPath: 'pki',
    timeout: 10000,
    proxy: false
});

const CertParams = {
  role: "acme",
  commonName: "www.vault.acme.com",
  altNames: "www1.vault.acme.com",
  ipSans: "10.0.0.200",
  uriSans: "",
  otherSans: "",
  ttL: "365d",
  format: "pem_bundle",
  pkFormat: "der",
  excludeCnFromSans: false
};

// Set jest async callback timeout
jest.setTimeout(10000);
//TODO: Improve expect assertion on all tests

test('genPkiCertificate: the result is a new certificate issued', async () => {
  const data = await vault.genPkiCertificate(RootToken, CertParams);
    console.log(data);
    key = data.serial_number;
	return expect(data).toBeDefined();
});

test('revokePkiCertificate: the result is a revoked certificate', async () => {
  const data = await vault.revokePkiCertificate(RootToken, key);
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

test('rotatePkiCrl: the result is the Certificate Revocation List (CRL) rotation', async () => {
  const data = await vault.rotatePkiCrl(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});
