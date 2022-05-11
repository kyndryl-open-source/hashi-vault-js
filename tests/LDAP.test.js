const Vault = require('../Vault');
const fs = require('fs');
let token = null;
let ldapCABundle = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const Group = process.env.LDAP_GROUP;
const Username = process.env.LDAP_USERNAME;
const Password = process.env.LDAP_PASSWORD;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    timeout: 3000,
    proxy: false
});

try {
  ldapCABundle = fs.readFileSync('./tests/ldap-server.pem', 'utf-8');
} catch(error){
  console.error('FS error: ', error);
}

const LDAPConfigParams = {
  deny_null_bind: true,
  discoverdn: false,
  groupattr: "cn",
  groupdn: "ou=Groups,dc=chatopsknight,dc=com",
  groupfilter: "",
  insecure_tls: false,
  starttls: false,
  tls_max_version: "tls12",
  tls_min_version: "tls12",
  url: "ldaps://ldap.chatopsknight.com:636",
  username_as_alias: true,
  userattr: "uid",
  userdn: "ou=Employees,dc=chatopsknight,dc=com",
  certificate: ldapCABundle
};

//TODO: Improve expect assertion on all tests

test('loginWithLdap: the result is a new LDAP authentication token', async () => {
  const data = await vault.loginWithLdap(Username, Password);
    console.log(data);
    token = data.client_token;
	return expect(data).toBeDefined();
});

test('setLdapConfig: the result is the LDAP auth method config set  - http code 204', async () => {
  const data = await vault.setLdapConfig(token, LDAPConfigParams, null);
    //console.log('setLdapConfig output:\n',data);
	return expect(data).toBeDefined();
});


test('readLdapConfig: the result is the LDAP auth method config displayed  - http code 204', async () => {
  const data = await vault.readLdapConfig(token, null);
    //console.log('readLdapConfig output:\n',data);
	return expect(data).toBeDefined();
});

test('createLdapUser: the result is a new LDAP user created  - http code 204', async () => {
  const data = await vault.createLdapUser(token, 'rod.anami', null, Group);
    //console.log('createLdapUser output:\n',data);
	return expect(data).toBeDefined();
});

test('readLdapUser: the result is the LDAP user information', async () => {
    const data = await vault.readLdapUser(token, Username);
    //console.log('readLdapUser output:\n',data);
	return expect(data).toBeDefined();
});

test('updateLdapUser: the result is the LDAP user updated with new policy and group - http code 204', async () => {
    const data = await vault.updateLdapUser(token, 'rod.anami', 'fake-policy', 'admins2');
    //console.log('updateLdapUser output:\n',data);
	return expect(data).toBeDefined();
});

test('deleteLdapUser: the result is a LDAP user deleted - http code 204', async () => {
    const data = await vault.deleteLdapUser(token, 'rod.anami');
    //console.log('deleteLdapUser output:\n',data);
	return expect(data).toBeDefined();
});

test('listLdapUsers: the result is a list of existing LDAP users', async () => {
    const data = await vault.listLdapUsers(token);
    //console.log('listLdapUsers output:\n',data);
	return expect(data).toBeDefined();
});

test('createLdapGroup: the result is a new LDAP group created  - http code 204', async () => {
    const data = await vault.createLdapGroup(token, 'engineers', Group);
    //console.log('createLdapGroup output:\n',data);
	return expect(data).toBeDefined();
});

test('readLdapGroup: the result is the LDAP group information', async () => {
    const data = await vault.readLdapGroup(token, Group);
    //console.log('readLdapGroup output:\n',data);
	return expect(data).toBeDefined();
});

test('updateLdapGroup: the result is the LDAP user updated with new policy - http code 204', async () => {
    const data = await vault.updateLdapGroup(token, 'engineers', 'admins2');
    //console.log('updateLdapGroup output:\n',data);
	return expect(data).toBeDefined();
});

test('deleteLdapGroup: the result is the LDAP user deleted - http code 204', async () => {
    const data = await vault.deleteLdapGroup(token, 'engineers');
    //console.log('deleteLdapGroup output:\n',data);
	return expect(data).toBeDefined();
});

test('listLdapGroups: the result is a list of existing LDAP groups', async () => {
    const data = await vault.listLdapGroups(token);
    //console.log('listLdapGroups output:\n',data);
	return expect(data).toBeDefined();
});
