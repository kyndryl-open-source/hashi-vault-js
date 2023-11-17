import Vault from '../dist/Vault';

const SECRET1: { name: string, secrets: { [key: string]: string } } = {
  name: "slack5",
  secrets: {
    bot_token1: "xoxb-123456789012-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3"
  }
};
const SECRET2: { name: string, secrets: { [key: string]: string } } = {
  name: "slack5",
  secrets: {
    bot_token1: "xoxb-123456789013-1234567890124-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789014-1234567890125-1w1lln0tt3llmys3cr3tatm3"
  }
};
const Metadata: { [key: string]: string } = {
  tag1: "development",
  tag2: "unit-test"
};
let token: string | null = null;
let newSecretId: string | null = null;

const RoleId: string = process.env.ROLE_ID!;
const SecretId: string = process.env.SECRET_ID!;
const ClientCert: string = process.env.CLIENT_CERT!;
const ClientKey: string = process.env.CLIENT_KEY!;
const CACert: string = process.env.CA_CERT!;
const VaultUrl: string = process.env.VAULT_URL!;
const AppRole: string = process.env.APPROLE!;

const vault = new Vault({
  https: true,
  cert: ClientCert,
  key: ClientKey,
  cacert: CACert,
  baseUrl: VaultUrl,
  timeout: 1000,
  proxy: false,
});

//TODO: Improve expect assertion on all tests
//TODO: Automatically delete previous data on KV engine
//TODO: Automatically clean up /$RootPath mount point

describe('Testing loginWithAppRole', () => {
  test('the result is a new AppRole authentication token', async () => {
    const data = await vault.loginWithAppRole(RoleId, SecretId);
    console.log(data);
    token = data.client_token;
    return expect(data).toBeDefined();
  });
});
