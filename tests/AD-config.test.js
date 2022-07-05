const Vault = require('../Vault');
const fs = require('fs');

const BindDN = process.env.LDAP_BIND_DN;
const BindPass = process.env.LDAP_BIND_PASS;
const LdapUrl = process.env.LDAP_SECURE_URL;
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
    rootPath: 'ad',
    timeout: 3000,
    proxy: false
});


let ldapBundle = "";
let key = null;

try {
  ldapBundle = fs.readFileSync('tests/ldap-server.pem', 'utf-8');
} catch(error){
  console.error('FS error: ', error);
}

const ADConfig1 = {
  binddn: BindDN,
  bindpass: BindPass,
  url: LdapUrl,
  userdn: 'dc=example,dc=com',
  insecure_tls: false
};

const ADConfig2 = {
  binddn: BindDN,
  bindpass: BindPass,
  url: LdapUrl,
  userdn: 'dc=chatopsknight,dc=com',
  certificate: ldapBundle,
  insecure_tls: false
};

test('setADConfig: the result is the AD secret engine configured', async () => {
  const data = await vault.setADConfig(RootToken, ADConfig1);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADConfig: the result is the AD secret engine configuration', async () => {
  const data = await vault.readADConfig(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('updateADConfig: the result is the AD secret engine configuration updated - HTTP 204', async () => {
  const data = await vault.updateADConfig(RootToken, ADConfig2);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADConfig: the result is the AD secret engine configuration', async () => {
  const data = await vault.readADConfig(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deleteADConfig: the result is the AD secret engine configuration deleted - HTTP 204', async () => {
  const data = await vault.deleteADConfig(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('setADConfig: the result is the AD secret engine configured', async () => {
  const data = await vault.setADConfig(RootToken, ADConfig2);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADConfig: the result is the AD secret engine configuration', async () => {
  const data = await vault.readADConfig(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});
