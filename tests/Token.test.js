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
    https: true,
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

	expect(data).toBeDefined();
});

test('lookupToken: the result is detailed information on token', async () => {
    const data = await vault.lookupToken(ProvToken,ProvToken);
    //console.log(data);

	expect(data).toBeDefined();
});

test('createToken: the result is a created service token of knight role', async () => {
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

	expect(data).toBeDefined();
	expect(data).toMatchObject({ token_type: 'service' });
});

test('renewSelfToken: the result is a service token renewed that was created previously', async () => {
    const data = await vault.renewSelfToken(sToken);
    // console.log(data);

    expect(data).toBeDefined();
	expect(data).toMatchObject({ token_type: 'service' });
});

test('revokeSelfToken: the result is a service token revoked that was created previously', async () => {
    const data = await vault.revokeSelfToken(sToken);
    //console.log(data);

    expect(data).toBeDefined();
});

test('createToken(batch)-1: the result is a created batch token of knight role', async () => {
    const data = await vault.createToken(ProvToken, {
        role_name: 'knight',
        meta: Metadata,
        ttl: '1h',
        type: 'batch',
        policies: 'default',
    });
    // console.log(data);

	expect(data).toBeDefined();
	expect(data).toMatchObject({ token_type: 'batch' });
});

test('createToken(service): the result is a created orphan service token with knight-vault policy', async () => {
    const data = await vault.createToken(ProvToken, {
        no_parent: true,
        ttl: '1h',
        policies: ['knight-vault'],
    });
    // console.log(data);
    orphanSToken = data.client_token;

	expect(data).toBeDefined();
	expect(data).toMatchObject({ orphan: true });
});

test('renewToken: the result is an orphan service token renewed that was created previously', async () => {
    const data = await vault.renewToken(ProvToken, orphanSToken);
    //console.log(data);

    expect(data).toBeDefined();
});

test('revokeToken: the result is an orphan service token revoked that was created previously', async () => {
    const data = await vault.revokeToken(ProvToken, orphanSToken);
    //console.log(data);

    expect(data).toBeDefined();
});

test('createToken(batch)-3: the result is a created orphan batch token with knight-vault policy', async () => {
    const data = await vault.createToken(ProvToken, {
        no_parent: true,
        type: 'batch',
        ttl: '1h',
        policies: ['knight-vault'],
    });
    //console.log(data);
    orphanBtoken = data.client_token;

	expect(data).toBeDefined();
	expect(data).toMatchObject({ orphan: true, token_type: 'batch' });
});

test('lookupSelfToken: the result are details on orphan batch token created previously', async () => {
    const data = await vault.lookupSelfToken(orphanBtoken);
    //console.log(data);

    expect(data).toBeDefined();
});
