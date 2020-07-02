const Vault = require('hashi-vault-js');

const SECRET1={
  name: "slack",
  secrets: {
    wpp: "xoxb-123456789012-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    abn_amro: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3"
  }
};
const SECRET2={
  name: "slack",
  secrets: {
    wpp: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3",
    abn_amro: "xoxb-123456789014-1234567890125-1w1lln0tt3llmys3cr3tatm3"
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
const RootPath = process.env.ROOT_PATH;
const AppRole = process.env.APPROLE;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: RootPath,
    timeout: 1000,
    proxy: false
});

console.log(".................................\n \n \n");

test('the result is a new AppRole authentication token', async () => {
    const data = await vault.loginWithAppRole(RoleId, SecretId);
    console.log(data);
    token = data.client_token;
	return expect(data).toBeDefined();
});


test('the result is the KV engine config', async () => {
    const data = await vault.readKVEngineConfig(token);
    console.log('readKVEngineConfig output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a new KV entry created', async () => {
    const data = await vault.createKVSecret(token, SECRET1.name , SECRET1.secrets);
    console.log('createKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a KV entry information', async () => {
    const data = await vault.readKVSecret(token, SECRET1.name);
    console.log('readKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a KV entry updated with new version', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 1);
    console.log('updateKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a KV entry updated with new version', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 2);
    console.log('updateKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a KV entry updated with new version', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 3);
    console.log('updateKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the latest version (one version) of KV entry deleted - HTTP 204', async () => {
    const data = await vault.deleteLatestVerKVSecret(token, SECRET1.name);
    console.log('deleteLatestVerKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions (one or more) of KV entry deleted - HTTP 204', async () => {
    const data = await vault.deleteVersionsKVSecret(token, SECRET1.name, [2, 3]);
    console.log('deleteVersionsKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions (one or more) of KV entry undeleted - HTTP 204', async () => {
    const data = await vault.undeleteVersionsKVSecret(token, SECRET1.name, [2, 3]);
    console.log('undeleteVersionsKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions of KV entry destroyed - HTTP 204', async () => {
    const data = await vault.destroyVersionsKVSecret(token, SECRET1.name, [ 1 ]);
    console.log('destroyVersionsKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the list of keys for a KV entry', async () => {
    const data = await vault.listKVSecret(token, SECRET1.name);
    console.log('listKVSecret:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the AppRole secret-id information', async () => {
    const data = await vault.readAppRoleSecretId(token, AppRole, SecretId);
    console.log('readAppRoleSecretId output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is new AppRole secret-id generated', async () => {
    const data = await vault.generateAppRoleSecretId(token, AppRole, JSON.stringify(Metadata));
    console.log('generateAppRoleSecretId output:\n',data);
    newSecretId = data.secret_id;
	return expect(data).toBeDefined();
});

test('the result is an AppRole secret-id destroyed - HTTP 204', async () => {
    const data = await vault.destroyAppRoleSecretId(token, AppRole, newSecretId);
    console.log('generateAppRoleSecretId output:\n',data);
	return expect(data).toBeDefined();
});

console.log("\n \n \n.................................\n");
