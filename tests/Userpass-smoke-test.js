//Simple test


// source process.env
// node LDAP-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const Username = process.env.USERPASS_USER;
const Password = process.env.USERPASS_PASS;

const Vault = require('../Vault');
const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    timeout: 3000,
    proxy: false
});

let token = null;

vault.healthCheck().then(function(data) {
  console.log('> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.loginWithUserpass(Username, Password).then(function(data){
      console.log('>> loginWithUserpass output: \n',data);
      token = data.client_token;
      vault.readUserpassUser(token, Username).then(function(data){
        console.log('>>> readUserpassUser output: \n',data);
      }).catch(function(readError){
        console.error('>>> readUserpassUser error: \n',readError);
      });
      vault.listUserpassUsers(token).then(function(data){
        console.log('>>> listUserpassUsers output: \n',data);
      }).catch(function(listError){
        console.error('>>> listUserpassUsers error: \n',listError);
      });
      vault.createUserpassUser(token, 'rod.anami', 'p@ssw0rd', 'provisioner').then(function(data){
        console.log('>>> createUserpassUser output: \n',data);
        vault.updateUserpassUser(token, 'rod.anami', 'p@ssw0rd2', ['fake-policy', 'fake-policy2']).then(function(data){
          console.log('>>>> updateUserpassUser output: \n',data);
          vault.readUserpassUser(token, 'rod.anami').then(function(data){
            console.log('>>>>> readUserpassUser output: \n',data);
            vault.deleteUserpassUser(token, 'rod.anami').then(function(data){
              console.log('>>>>> deleteUserpassUser output: \n',data);
            }).catch(function(deleteError){
              console.error('>>>>> deleteUserpassUser error: \n',deleteError);
            });
          }).catch(function(readError){
            console.error('>>>>> readUserpassUser error: \n',readError);
          });
        }).catch(function(updateError){
          console.error('>>>> updateUserpassUser error: \n',deleteError);
        });
      }).catch(function(createError){
        console.error('>>>> createUserpassUser error: \n',createError);
      });
    }).catch(function(loginError){
      console.error('>> loginWithUserpass error: \n',loginError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
