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

const RolePayload1 = {
  service_account_name: 'rod.anami@chatopsknight.com',
  ttl: '1h'
};

const RolePayload2 = {
  service_account_name: 'rod.anami@chatopsknight.com',
  ttl: '6h'
};

const RoleName = "my-application";

test('createADRole: the result is an AD role created - HTTP 204', async () => {
  const data = await vault.createADRole(RootToken, RoleName, RolePayload1);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADRole: the result is an AD role information retrieved', async () => {
  const data = await vault.readADRole(RootToken, RoleName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('updateADRole: the result is an AD role updated - HTTP 204', async () => {
  const data = await vault.updateADRole(RootToken, RoleName, RolePayload2);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADRole: the result is an AD role information retrieved', async () => {
  const data = await vault.readADRole(RootToken, RoleName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('listADRoles: the result is the AD roles listed', async () => {
  const data = await vault.listADRoles(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deleteADRole: the result is an AD role deleted - HTTP 204', async () => {
  const data = await vault.deleteADRole(RootToken, RoleName);
    console.log(data);
	return expect(data).toBeDefined();
});
