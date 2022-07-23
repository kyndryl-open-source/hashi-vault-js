const Vault = require('../Vault');

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

const SetName = "sre-team";

const LibraryPayload1 = {
  name: SetName,
  service_account_names: ['rod.anami@chatopsknight.com'],
  ttl: '1h',
  max_ttl: '2h',
  disable_check_in_enforcement: false
};

const LibraryPayload2 = {
  name: SetName,
  service_account_names: ['rod.anami@chatopsknight.com', 'john.smith@chatopsknight.com'],
  ttl: '6h',
  max_ttl: '12h',
  disable_check_in_enforcement: false
};


test('createADLibrary: the result is an AD library created - HTTP 204', async () => {
  const data = await vault.createADLibrary(RootToken, LibraryPayload1);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADLibrary: the result is an AD library information retrieved', async () => {
  const data = await vault.readADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('updateADLibrary: the result is an AD library updated - HTTP 204', async () => {
  const data = await vault.updateADLibrary(RootToken, LibraryPayload2);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADLibrary: the result is an AD library information retrieved', async () => {
  const data = await vault.readADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('listADLibraries: the result is a list of AD libraries', async () => {
  const data = await vault.listADLibraries(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deleteADLibrary: the result is an AD library deleted - HTTP 204', async () => {
  const data = await vault.deleteADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});
