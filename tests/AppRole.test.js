const Vault = require('../Vault');

const SECRET1={
  name: "slack5",
  secrets: {
    bot_token1: "xoxb-123456789012-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3"
  }
};
const SECRET2={
  name: "slack5",
  secrets: {
    bot_token1: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789014-1234567890125-1w1lln0tt3llmys3cr3tatm3"
  }
};
const Metadata = {
  tag1: "development",
  tag2: "unit-test"
};
let token = null;
let newSecretId = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const AppRole = process.env.APPROLE;

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
//TODO: Automatically delete previous data on KV engine
//TODO: Automatically clean up /$RootPath mount point

test('loginWithAppRole: the result is a new AppRole authentication token', async () => {
    const data = await vault.loginWithAppRole(RoleId, SecretId);
    console.log(data);
    token = data.client_token;
	return expect(data).toBeDefined();
});

test('readAppRoleSecretId: the result is the AppRole secret-id information', async () => {
    const data = await vault.readAppRoleSecretId(token, AppRole, SecretId);
    //console.log('readAppRoleSecretId output:\n',data);
	return expect(data).toBeDefined();
});

test('generateAppRoleSecretId: the result is new AppRole secret-id generated', async () => {
    const data = await vault.generateAppRoleSecretId(token, AppRole, JSON.stringify(Metadata));
    //console.log('generateAppRoleSecretId output:\n',data);
    newSecretId = data.secret_id;
	return expect(data).toBeDefined();
});

test('destroyAppRoleSecretId: the result is an AppRole secret-id destroyed - HTTP 204', async () => {
    const data = await vault.destroyAppRoleSecretId(token, AppRole, newSecretId);
    //console.log('generateAppRoleSecretId output:\n',data);
	return expect(data).toBeDefined();
});
