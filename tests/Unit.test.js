const Vault = require('../Vault');

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
let token = null;

const RoleId = process.env.ROLE_ID;
const SecretId = process.env.SECRET_ID;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;

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

test('the result is the authentication token', async () => {
    const data = await vault.loginWithAppRole(RoleId, SecretId);
    console.log(data);
    token = data.client_token;
	return expect(data).toBeDefined();
});


test('the result is the kv engine config', async () => {
    const data = await vault.readKVEngineConfig(token);
    console.log('kv engine config:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a created new kv entry', async () => {
    const data = await vault.createKVSecret(token, SECRET1.name , SECRET1.secrets);
    console.log('Create output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is a read kv entry', async () => {
    const data = await vault.readKVSecret(token, SECRET1.name);
    console.log('Read output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is an updated kv entry', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 1);
    console.log('Update output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is an updated kv entry', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 2);
    console.log('Update output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is an updated kv entry', async () => {
    const data = await vault.updateKVSecret(token, SECRET2.name , SECRET2.secrets, 3);
    console.log('Update output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the latest version of kv entry deleted', async () => {
    const data = await vault.deleteLatestVerKVSecret(token, SECRET1.name);
    console.log('LV Delete output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions of kv entry deleted', async () => {
    const data = await vault.deleteVersionsKVSecret(token, SECRET1.name, [2, 3]);
    console.log('Versions Delete output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions of kv entry undeleted', async () => {
    const data = await vault.undeleteVersionsKVSecret(token, SECRET1.name, [2, 3]);
    console.log('Versions Undelete output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the versions of kv entry destroyed', async () => {
    const data = await vault.destroyVersionsKVSecret(token, SECRET1.name, [ 1 ]);
    console.log('Versions Detroy output:\n',data);
	return expect(data).toBeDefined();
});

test('the result is the list of keys for a kv entry', async () => {
    const data = await vault.listKVSecret(token, SECRET1.name);
    console.log('List output:\n',data);
	return expect(data).toBeDefined();
});
