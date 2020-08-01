const Vault = require('../Vault');

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;
const Paths = ["/sys/host-info", "/sys/capabilities", "/sys/init" ];

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

//TODO: Improve expected data assertion on all tests

test('the result is the Vault host info', async () => {
    const data = await vault.sysHostInfo(RootToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('the result is the Vault internal counters', async () => {
    const data = await vault.sysInternalCounters(RootToken, 'tokens');
    //console.log(data);
	return expect(data).toBeDefined();
});

test('the result is the Vault system metrics', async () => {
    const data = await vault.sysMetrics(RootToken, 'promotheus');
    //console.log(data);
	return expect(data).toBeDefined();
});

test('the result is the root token capabilities on paths', async () => {
    const data = await vault.sysCapabilities(RootToken, RootToken, Paths);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('the result is the root token capabilities on paths using self', async () => {
    const data = await vault.sysCapabilitiesSelf(RootToken, Paths);
    //console.log(data);
	return expect(data).toBeDefined();
});
