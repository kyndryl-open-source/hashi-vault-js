const Vault = require('../Vault');
const fs = require('fs');

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
    rootPath: 'pki_int',
    timeout: 10000,
    proxy: false
});

const RootCAParams = {
  type: "exported",
  commonName: "root-ca.vault.acme.com",
  altNames: "",
  ipSans: "127.0.0.1, 10.0.0.100",
  uriSans: "https://root-ca.vault.acme.com",
  otherSans: "",
  ttl: "87600h",
  format: "pem_bundle",
  pkFormat: "der",
  keyType: "rsa",
  keyBits: 4096,
  maxPathLength: 2,
  excludeCnFromSans: false,
  ou: "ACME",
  organization: "Security",
  country: "Brazil",
  locality: "Campinas",
  province: "Sao Paulo",
  streetAddress: "",
  postalCode: "13087",
  serialNumber: "01"
};

const IntCAParams = {
  type: "internal",
  commonName: "intermediate-ca.vault.acme.com",
  altNames: null,
  ipSans: null,
  uriSans: null,
  otherSans: null,
  format: "pem_bundle",
  pkFormat: "der",
  keyType: "rsa",
  keyBits: 4096,
  excludeCnFromSans: false,
  ou: "ACME",
  organization: null,
  country: "Brazil",
  locality: null,
  province: null,
  streetAddress: null,
  postalCode: null,
  serialNumber: null
};

let signIntCAParams = {
  csr: "",
  commonName: "intermediate-ca.vault.acme.com",
  altNames: null,
  ipSans: null,
  uriSans: null,
  otherSans: null,
  format: "pem_bundle",
  maxPathLength: null,
  excludeCnFromSans: null,
  useCsrValues: null,
  permittedDnsDomains: null,
  ou: null,
  organization: null,
  country: null,
  locality: null,
  province: null,
  streetAddress: null,
  postalCode: null,
  serialNumber: null
}

let certificate = "";
let key = null;

try {
  caBundle = fs.readFileSync('tests/ca-bundle.pem', 'utf-8');
} catch(error){
  console.error('FS error: ', error);
}

// Set jest async callback timeout
jest.setTimeout(10000);

test('setCACertificate: the result is a new CA root certificate and key configured', async () => {
  const data = await vault.setCACertificate(RootToken, caBundle);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deleteRootCA: the result is root CA deleted (HTTP code 204)', async () => {
  const data = await vault.deleteRootCA(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('generateRootCA: the result is a new root CA generated', async () => {
  const data = await vault.generateRootCA(RootToken, RootCAParams);
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

test('genIntermediateCA: the result is a new generated intermediate CA CSR', async () => {
  const data = await vault.genIntermediateCA(RootToken, IntCAParams);
    console.log(data);
    signIntCAParams.csr = data.csr;
	return expect(data).toBeDefined();
});

test('signIntermediateCA: the result is a signed intermediate CA certificate', async () => {
  const data = await vault.signIntermediateCA(RootToken, signIntCAParams, 'pki');
    console.log(data);
    certificate = data.certificate;
	return expect(data).toBeDefined();
});

test('setIntermediateCA: the result is a new intermediate CA set', async () => {
  const data = await vault.setIntermediateCA(RootToken, certificate);
    console.log(data);
	return expect(data).toBeDefined();
});
