// Jest unit test for Vault.js
// AD secret engine -- libraries
// This test will create a new AD library, check out and check in service account credentials, and delete the AD library.
import Vault from '../src/Vault.js';

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: 'ad',
    timeout: 3000,
    proxy: false
});
const ABC = 'abcdefghijklmnopqrstuvwxyz';
const RandName = Array(3).join().split(',').map(function() { 
  return ABC.charAt(Math.floor(Math.random() * ABC.length) + 1); 
}).join('');
const RandNum = Math.floor((Math.random() * 100) + 1);
const SetName = `${RandName}${RandNum}-team`;
const LibraryPayload1 = {
  name: SetName,
  service_account_names: ['hela.odinson@chatopsknight.com'],
  ttl: '1h',
  max_ttl: '2h',
  disable_check_in_enforcement: false
};

const LibraryPayload2 = {
  name: SetName,
  service_account_names: ['hela.odinson@chatopsknight.com', 'thor.odinson@chatopsknight.com'],
  ttl: '6h',
  max_ttl: '12h',
  disable_check_in_enforcement: false
};

const CredCheckOut = {
  name: SetName,
  ttl: '30m'
}

const CredCheckIn1 = {
  name: SetName,
  service_account_names: ['hela.odinson@chatopsknight.com']
}

const CredCheckIn2 = {
  name: SetName,
  service_account_names: ['thor.odinson@chatopsknight.com']
}

test('createADLibrary: the result is an AD library created - HTTP 204', async () => {
  const data = await vault.createADLibrary(RootToken, LibraryPayload1);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADLibrary: the result is an AD library information retrieved', async () => {
  const data = await vault.readADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('updateADLibrary: the result is an AD library updated - HTTP 204', async () => {
  const data = await vault.updateADLibrary(RootToken, LibraryPayload2);
    console.log(data);
	return expect(data).toBeDefined();
});

test('readADLibrary: the result is an AD library information retrieved', async () => {
  const data = await vault.readADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('checkADCredOut: the result is the first service account credential in the AD library checked out', async () => {
  const data = await vault.checkADCredOut(RootToken, CredCheckOut);
    console.log(data);
	return expect(data).toBeDefined();
});

test('checkADCredOut: the result is the second service account credential in the AD library checked out', async () => {
  const data = await vault.checkADCredOut(RootToken, CredCheckOut);
    console.log(data);
	return expect(data).toBeDefined();
});

test('getADCredSatus: the result is an AD library credential status', async () => {
  const data = await vault.getADCredSatus(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('checkADCredIn: the result is the first service account credential in the AD library checked in', async () => {
  const data = await vault.checkADCredIn(RootToken, CredCheckIn1, false);
    console.log(data);
	return expect(data).toBeDefined();
});

test('checkADCredIn: the result is the second service account credential in the AD library checked in', async () => {
  const data = await vault.checkADCredIn(RootToken, CredCheckIn2, true);
    console.log(data);
	return expect(data).toBeDefined();
});

test('getADCredSatus: the result is an AD library credential status', async () => {
  const data = await vault.getADCredSatus(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});

test('listADLibraries: the result is a list of AD libraries', async () => {
  const data = await vault.listADLibraries(RootToken);
    console.log(data);
	return expect(data).toBeDefined();
});

test('deleteADLibrary: the result is an AD library deleted - HTTP 204', async () => {
  const data = await vault.deleteADLibrary(RootToken, SetName);
    console.log(data);
	return expect(data).toBeDefined();
});
