const Vault = require('../Vault');

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;
const VaultUnsealKey1 = process.env.VAULT_UNSEAL_KEY1;
const VaultUnsealKey2 = process.env.VAULT_UNSEAL_KEY2;
const VaultUnsealKey3 = process.env.VAULT_UNSEAL_KEY3;

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

let sealed = false;


//TODO: Improve expected data assertion on all tests

test('the result is status of Vault seal', async () => {
    const data = await vault.sealStatus();
    //console.log(data);
    sealed = data.sealed;
	return expect(data).toBeDefined();
});

test('the result is a sealed Vault', async () => {
    const data = await vault.sysSeal(RootToken);
    //console.log(data);
  return expect(data).toBeDefined();
});

test('the result is a accepted unseal key 1 shard', async () => {
    const data = await vault.sysUnseal(RootToken, VaultUnsealKey1, false, false);
    //console.log(data);
  return expect(data).toBeDefined();
});

test('the result is a accepted unseal key 2 shard', async () => {
    const data = await vault.sysUnseal(RootToken, VaultUnsealKey2, false, false);
    //console.log(data);
  return expect(data).toBeDefined();
});

test('the result is a accepted unseal key 3 shard', async () => {
    const data = await vault.sysUnseal(RootToken, VaultUnsealKey3, false, false);
    //console.log(data);
  return expect(data).toBeDefined();
});
