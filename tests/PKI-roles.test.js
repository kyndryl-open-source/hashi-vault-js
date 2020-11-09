const Vault = require('../Vault');

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
    timeout: 3000,
    proxy: false
});

let roleParams = {
  name: "dummy",
  ttl: "8760h",
  maxTtl: "43800h",
  allowLocalhost: true,
  allowedDomains: ["dummy.com", "acme.com"],
  allowedDomainsTemplate: false,
  allowBareDomains: false,
  allowSubdomains: true,
  allowGlobDomains: false,
  allowAnyName: false,
  enforceHostnames: true,
  allowIpSans: true,
  allowedUriSans: "https://dummy.com,https://acme.com",
  allowedOtherSans: null,
  serverFlag: true,
  clientFlag: false,
  codeSigningFlag: false,
  emailProtectionFlag: false,
  keyType: "rsa",
  keyBits: 4096,
  keyUsage: ["DigitalSignature", "KeyAgreement", "KeyEncipherment"],
  externalKeyUsage: null,
  extKeyUsageOids: null,
  useCsrCommonName: true,
  useCsrSans: true,
  ou: "vault",
  organization: "acme",
  country: "br",
  locality: "campinas",
  province: "sp",
  streetAddress: "",
  postalCode: "",
  serialNumber: "",
  generateLease: false,
  noStore: false,
  requireCn: true,
  policyIdentifiers: null,
  basicConstraintsValidForNonCa: false,
  notBeforeDuration: "5m"
}
// Set jest async callback timeout
jest.setTimeout(3000);

test('createPkiRole: the result is a new PKI role created in the mount (HTTP code 204)', async () => {
  const data = await vault.createPkiRole(RootToken, roleParams, 'pki');
    console.log(data);
	return expect(data).toBeDefined();
});

roleParams.codeSigningFlag = true;
roleParams.notBeforeDuration = "1m";

test('updatePkiRole: the result is PKI role above params updated (HTTP code 204)', async () => {
  const data = await vault.updatePkiRole(RootToken, roleParams, 'pki');
    console.log(data);
	return expect(data).toBeDefined();
});

test('readPkiRole: the result are the PKI role params', async () => {
  const data = await vault.readPkiRole(RootToken, roleParams.name);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deletePkiRole: the result is PKI role deleted (HTTP code 204)', async () => {
  const data = await vault.deletePkiRole(RootToken, roleParams.name);
    console.log(data);
	return expect(data).toBeDefined();
});

test('listPkiRoles: the result is a list of PKI roles within the mount', async () => {
  const data = await vault.listPkiRoles(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});
