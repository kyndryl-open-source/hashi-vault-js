const Vault = require('../Vault');

const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const K8sJWT = process.env.K8S_JWT;
const K8sRole = process.env.K8S_ROLE;
const AdminToken = process.env.VAULT_ADMIN_TOKEN;

const RoleParams = {
  bound_service_account_names: [ 'service-account' ],
  bound_service_account_namespaces: [ 'dedault' ],
  audience: "test",
  token_ttl: "72h",
  token_max_ttl: "",
  token_policies: [ 'admin' ],
  token_bound_cidrs: "",
  token_explicit_max_ttl: 0,
  token_no_default_policy: false,
  token_num_uses: 0,
  token_period: 0,
  token_type: "service"
};

const fs =require('fs');
let k8sCA = "";
let k8sJWT = "";

try {
  k8sCA = fs.readFileSync('tests/k8s-ca.crt', 'utf8');
  k8sJWT = fs.readFileSync('tests/k8s-sa-jwt.key', 'utf8');
} catch(fsError) {
  console.error('FS error: ', fsError);
}

const K8sConfig = {
  kubernetes_host: "https://192.168.99.119:8443",
  kubernetes_ca_cert: k8sCA,
  token_reviewer_jwt: k8sJWT,
  issuer: "kubernetes/serviceaccount"
}

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

test('loginWithK8s: the result is a new AppRole authentication token', async () => {
  const data = await vault.loginWithK8s(K8sRole, K8sJWT);
  // console.log(data);
	return expect(data).toBeDefined();
});

test('listK8sRoles: the result is a list of roles for k8s auth method', async () => {
  const data = await vault.listK8sRoles(AdminToken);
  // console.log(data);
	return expect(data).toBeDefined();
});

test('readK8sRole: the result is the details of a role', async () => {
  const data = await vault.readK8sRole(AdminToken, K8sRole);
  // console.log(data);
	return expect(data).toBeDefined();
});

test('createK8sRole: the result is new role created (HTTP 204)', async () => {
  const data = await vault.createK8sRole(AdminToken, 'new-role', RoleParams);
  // console.log(data);
	return expect(data).toBeDefined();
});

test('deleteK8sRole: the result is the previous role deleted (HTTP 204)', async () => {
  const data = await vault.deleteK8sRole(AdminToken, 'new-role');
  // console.log(data);
	return expect(data).toBeDefined();
});

test('updateK8sConfig: the result is the K8s auth configuration updated (HTTP 204)', async () => {
  const data = await vault.updateK8sConfig(AdminToken, K8sConfig);
  // console.log(data);
	return expect(data).toBeDefined();
});

test('readK8sConfig: the result is the details of the K8s auth config', async () => {
  const data = await vault.readK8sConfig(AdminToken);
  // console.log(data);
	return expect(data).toBeDefined();
});
