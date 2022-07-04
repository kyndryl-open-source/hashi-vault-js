const Vault = require('../Vault');
const randomWords = require('random-words');

const RandName = randomWords({ exactly: 1, wordsPerString: 2, separator:'-' });
const RandNum = Math.floor((Math.random() * 100) + 1);
const SecretName = `${RandName}-${RandNum}`;
const Secrets1 = {
    bot_token1: "xoxb-123456789011-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789011-1234567890124-1w1lln0tt3llmys3cr3tatm3"
};
const Secrets2 = {
    bot_token3: "xoxb-123456789022-1234567890125-1w1lln0tt3llmys3cr3tatm3",
    bot_token4: "xoxb-123456789022-1234567890126-1w1lln0tt3llmys3cr3tatm3"
};
const Secrets3 = {
    bot_token5: "xoxb-123456789033-1234567890127-1w1lln0tt3llmys3cr3tatm3",
    bot_token6: "xoxb-123456789033-1234567890128-1w1lln0tt3llmys3cr3tatm3"
};
const Metadata = {
  tag1: "development",
  tag2: "unit-test"
};
const Config = {
  max_versions: 5
};

let token = null;
let version = 1;
let newSecretId = null;
const Token = process.env.VAULT_KNIGHT_TOKEN;
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
    timeout: 1000,
    proxy: false
});

//TODO: Improve expect assertion on all tests
//TODO: Automatically delete previous data on KV engine
//TODO: Automatically clean up /$RootPath mount point


test('updateKVEngineConfig: the result is the KV engine config', async () => {
  const data = await vault.updateKVEngineConfig(Token, Config, RootPath);
  console.log('updateKVEngineConfig output:\n', data);
  return expect(data).toBeDefined();
});

test('readKVEngineConfig: the result is the KV engine config', async () => {
    const data = await vault.readKVEngineConfig(Token, RootPath);
    console.log('readKVEngineConfig output:\n',data);
	return expect(data).toBeDefined();
});

test('createKVSecret: the result is a new KV entry created', () => {
	return vault.createKVSecret(Token, SecretName , Secrets1, RootPath).then(data => {
    //console.log('createKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('readKVSecret: the result is a KV entry information', async () => {
    const data = await vault.readKVSecret(Token, SecretName, 1, RootPath);
    //console.log('readKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('updateKVSecret: the result is a KV entry updated with new version', () => {
	return vault.updateKVSecret(Token, SecretName , Secrets2, 1, RootPath).then(data => {
    //console.log('updateKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('updateKVSecret: the result is a KV entry updated with new version', () => {
	return vault.updateKVSecret(Token, SecretName , Secrets1, 2, RootPath).then(data => {
    //console.log('updateKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('updateKVSecret: the result is a KV entry updated with new version', () => {
	return vault.updateKVSecret(Token, SecretName , Secrets3, 3, RootPath).then(data => {
    //console.log('updateKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('listKVSecret: the result is the list of keys for a KV root folder', async () => {
    const data = await vault.listKVSecrets(Token, null, RootPath);
    console.log('listKVSecrets:\n',data);
	return expect(data).toBeDefined();
});

test('readKVSecret: the result is a KV entry information', async () => {
    const data = await vault.readKVSecret(Token, SecretName, null, RootPath);
    console.log('readKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('deleteLatestVerKVSecret: the result is the latest version (one version) of KV entry deleted - HTTP 204', () => {
	return vault.deleteLatestVerKVSecret(Token, SecretName, RootPath).then(data => {
    //console.log('deleteLatestVerKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('deleteVersionsKVSecret: the result is the versions (one or more) of KV entry deleted - HTTP 204', () => {
	return vault.deleteVersionsKVSecret(Token, SecretName, [2, 3], RootPath).then(data => {
    //console.log('deleteVersionsKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('undeleteVersionsKVSecret: the result is the versions (one or more) of KV entry undeleted - HTTP 204', () => {
	return vault.undeleteVersionsKVSecret(Token, SecretName, [2, 3], RootPath).then(data => {
    //console.log('undeleteVersionsKVSecret output:\n',data);
    expect(data).toBeDefined();
  });
});

test('destroyVersionsKVSecret: the result is the versions of KV entry destroyed - HTTP 204', async () => {
    const data = await vault.destroyVersionsKVSecret(Token, SecretName, [ 1 ], RootPath);
    //console.log('destroyVersionsKVSecret output:\n',data);
	return expect(data).toBeDefined();
});

test('eliminateKVSecret: the result is the versions of KV secrete eliminated - HTTP 204', async () => {
    const data = await vault.eliminateKVSecret(Token, SecretName, RootPath);
    //console.log('eliminateKVSecret output:\n',data);
	return expect(data).toBeDefined();
});
