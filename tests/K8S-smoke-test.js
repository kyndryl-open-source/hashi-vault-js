//Simple test

// source process.env
// node K8S-smoke-test.js
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
  k8sCA = fs.readFileSync('./k8s-ca.crt', 'utf8');
  k8sJWT = fs.readFileSync('./k8s-sa-jwt.key', 'utf8');
} catch(fsError) {
  console.error('FS error: ', fsError);
}

const K8sConfig = {
  kubernetes_host: "https://192.168.99.119:8443",
  kubernetes_ca_cert: k8sCA,
  token_reviewer_jwt: k8sJWT,
  issuer: "kubernetes/serviceaccount"
}

const Vault = require('../Vault');
const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    timeout: 1000,
    proxy: false
});

let token = null;

vault.healthCheck().then(function(data) {
  console.log('0> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.loginWithK8s(K8sRole, K8sJWT).then(function(data){
      token = data.client_token;
      console.log('1> loginWithK8s output: \n',data);

    }).catch(function(loginError){
        console.error('1> loginWithK8s error: \n',loginError);
    });

    vault.listK8sRoles(AdminToken).then(function(data){
      console.log('1> listK8sRoles output: \n',data);

    }).catch(function(loginError){
        console.error('1> listK8sRoles error: \n',loginError);
    });

    vault.readK8sRole(AdminToken, K8sRole).then(function(data){
      console.log('1> readK8sRole output: \n',data);

    }).catch(function(loginError){
        console.error('1> readK8sRole error: \n',loginError);
    });

    vault.createK8sRole(AdminToken, 'new-role', RoleParams).then(function(data){
      console.log('1> createK8sRole output: \n',data);

      vault.readK8sRole(AdminToken, 'new-role').then(function(data){
        console.log('2> readK8sRole output: \n',data);

        vault.deleteK8sRole(AdminToken, 'new-role').then(function(data){
          console.log('3> deleteK8sRole output: \n',data);

        }).catch(function(loginError){
            console.error('3> deleteK8sRole error: \n',loginError);
        });
      }).catch(function(loginError){
          console.error('2> readK8sRole error: \n',loginError);
      });
    }).catch(function(loginError){
        console.error('1> createK8sRole error: \n',loginError);
    });

    vault.updateK8sConfig(AdminToken, K8sConfig).then(function(data){
      console.log('1> updateK8sConfig output: \n',data);

      vault.readK8sConfig(AdminToken).then(function(data){
        console.log('2> readK8sConfig output: \n',data);
      }).catch(function(loginError){
          console.error('2> readK8sConfig error: \n',loginError);
      });

    }).catch(function(loginError){
        console.error('1> updateK8sConfig error: \n',loginError);
    });


  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
