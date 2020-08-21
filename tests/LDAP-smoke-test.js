//Simple test


// source process.env
// node LDAP-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const Username = process.env.LDAP_USERNAME;
const Password = process.env.LDAP_PASSWORD;
const Group = process.env.LDAP_GROUP;

const Vault = require('../Vault');
const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: RootPath,
    timeout: 3000,
    proxy: false
});

let token = null;

vault.healthCheck().then(function(data) {
  console.log('> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.loginWithLdap(Username, Password).then(function(data){
      console.log('>> loginWithLdap output: \n',data);
      token = data.client_token;
      vault.readLdapGroup(token, Group).then(function(data){
        console.log('>>> readLdapGroup output: \n',data);
      }).catch(function(readError){
        console.error('>>> readLdapGroup error: \n',readError);
      });
      vault.listLdapGroups(token).then(function(data){
        console.log('>>> listLdapGroups output: \n',data);
      }).catch(function(listError){
        console.error('>>> listLdapGroups error: \n',listError);
      });
      vault.readLdapUser(token, Username).then(function(data){
        console.log('>>> readLdapUser output: \n',data);
      }).catch(function(readError){
        console.error('>>> readLdapUser error: \n',readError);
      });
      vault.listLdapUsers(token).then(function(data){
        console.log('>>> listLdapUsers output: \n',data);
      }).catch(function(listError){
        console.error('>>> listLdapUsers error: \n',listError);
      });
      vault.createLdapGroup(token, 'engineers', Group).then(function(data){
        console.log('>>> createUpdateLdapGroup output: \n',data);
        vault.updateLdapGroup(token, 'engineers', 'admins2').then(function(data){
          console.log('>>>> updateLdapGroup output: \n',data);
          vault.deleteLdapGroup(token, 'engineers').then(function(data){
            console.log('>>>>> deleteLdapGroup output: \n',data);
          }).catch(function(deleteError){
            console.error('>>>>> deleteLdapGroup error: \n',deleteError);
          });
        }).catch(function(updateError){
          console.error('>>>> updateLdapGroup error: \n',deleteError);
        });
      }).catch(function(createError){
        console.error('>>> createLdapGroup error: \n',createError);
      });
      vault.createLdapUser(token, 'rod.anami', null, Group).then(function(data){
        console.log('>>> createLdapUser output: \n',data);
        vault.updateLdapUser(token, 'rod.anami', 'fake-policy', 'admins2').then(function(data){
          console.log('>>>> updateLdapUser output: \n',data);
          vault.deleteLdapUser(token, 'rod.anami').then(function(data){
            console.log('>>>>> deleteLdapUser output: \n',data);
          }).catch(function(deleteError){
            console.error('>>>>> deleteLdapUser error: \n',deleteError);
          });
        }).catch(function(updateError){
          console.error('>>>> updateLdapUser error: \n',deleteError);
        });
      }).catch(function(createError){
        console.error('>>>> createLdapUser error: \n',createError);
      });
    }).catch(function(loginError){
      console.error('>> loginWithLdap error: \n',loginError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
