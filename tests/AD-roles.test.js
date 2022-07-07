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

test('listADRoles: the result is the AD roles listed', async () => {
  const data = await vault.listADRoles(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});
