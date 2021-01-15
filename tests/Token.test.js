const Vault = require('../Vault');

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const ProvToken = process.env.VAULT_PROV_TOKEN;
const Metadata = {
  tag1: "knight-vault",
  tag2: "smoke-test"
};

const vault = new Vault( {
    // https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: RootPath,
    timeout: 1000,
    proxy: false
});

let orphanSToken = '';
let orphanBToken = '';
let sToken = '';

//TODO: Improve expected data assertion on all tests

test('listAccessors: the result is a list of all accessors', async () => {
    const data = await vault.listAccessors(ProvToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('lookupToken: the result is detailed information on token', async () => {
    const data = await vault.lookupToken(ProvToken,ProvToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('createToken: the result is a created service token based o knight role', async () => {
    const data = await vault.createToken(ProvToken, {
        // role_name: 'knight',
        meta: Metadata,
        renewable: true,
        ttl: '1h',
        type: 'service',
        display_name: 'app1'
    });
    //console.log(data);
    sToken = data.client_token;
	return expect(data).toBeDefined();
});

test('renewSelfToken: the result is a service token renewed that was created previously', async () => {
    const data = await vault.renewSelfToken(sToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('revokeSelfToken: the result is a service token revoked that was created previously', async () => {
    const data = await vault.revokeSelfToken(sToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('createBToken: the result is a created batch token based o knight role', async () => {
    const data = await vault.createBToken(ProvToken, 'knight', null, '1h');
    //console.log(data);
	return expect(data).toBeDefined();
});

test('createOrphanSToken: the result is a created orphan service token with knight-vault policy', async () => {
    const data = await vault.createOrphanSToken(ProvToken, ['knight-vault'], true, '1h');
    //console.log(data);
    orphanSToken = data.client_token;
	return expect(data).toBeDefined();
});

test('renewToken: the result is an orphan service token renewed that was created previously', async () => {
    const data = await vault.renewToken(ProvToken, orphanSToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('revokeToken: the result is an orphan service token revoked that was created previously', async () => {
    const data = await vault.revokeToken(ProvToken, orphanSToken);
    //console.log(data);
	return expect(data).toBeDefined();
});

test('createOrphanBToken: the result is a created orphan batch token with knight-vault policy', async () => {
    const data = await vault.createOrphanBToken(ProvToken, ['knight-vault'], '1h');
    //console.log(data);
    orphanBtoken = data.client_token;
	return expect(data).toBeDefined();
});

test('lookupSelfToken: the result are details on orphan batch token created previously', async () => {
    const data = await vault.lookupSelfToken(orphanBtoken);
    //console.log(data);
	return expect(data).toBeDefined();
});
