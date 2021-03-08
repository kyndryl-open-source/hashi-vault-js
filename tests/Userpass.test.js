const Vault = require('../Vault');
let token = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const Username = process.env.USERPASS_USER;
const Password = process.env.USERPASS_PASS;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    timeout: 1000,
    proxy: false
});

//TODO: Improve expect assertion on all tests

test('loginWithUserpass: the result is a new Userpass authentication token', async () => {
  const data = await vault.loginWithUserpass(Username, Password);
    console.log(data);
    token = data.client_token;
	return expect(data).toBeDefined();
});


test('createUserpassUser: the result is a new Userpass user created  - http code 204', async () => {
  const data = await vault.createUserpassUser(token, 'rod.anami', 'p@ssw0rd', 'provisioner');
    //console.log('createUserpassUser output:\n',data);
	return expect(data).toBeDefined();
});

test('readUserpassUser: the result is the LDAP user information', async () => {
    const data = await vault.readUserpassUser(token, Username);
    //console.log('readUserpassUser output:\n',data);
	return expect(data).toBeDefined();
});

test('updateUserpassUser: the result is the Userpass user updated with new policy - http code 204', async () => {
    const data = await vault.updateUserpassUser(token, 'rod.anami', 'p@ssw0rd2', [ 'fake-policy', 'fake-policy2']);
    //console.log('updateUserpassUser output:\n',data);
	return expect(data).toBeDefined();
});

test('deleteUserpassUser: the result is a Userpass user deleted - http code 204', async () => {
    const data = await vault.deleteUserpassUser(token, 'rod.anami');
    //console.log('deleteUserpassUser output:\n',data);
	return expect(data).toBeDefined();
});

test('listUserpassUsers: the result is a list of existing Userpass users', async () => {
    const data = await vault.listUserpassUsers(token);
    //console.log('listUserpassUsers output:\n',data);
	return expect(data).toBeDefined();
});
