const Vault = require('../Vault');

const BindDN = process.env.LDAP_BIND_DN;
const BindPass = process.env.LDAP_BIND_PASS;
const LdapUrl = process.env.LDAP_SECURE_URL;
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

const RoleName = "my-application";

const RolePayload1 = {
  name: RoleName,
  service_account_name: 'nathan.hale@chatopsknight.com',
  ttl: '1h'
};

const RolePayload2 = {
  name: RoleName,
  service_account_name: 'nathan.hale@chatopsknight.com',
  ttl: '6h'
};

const SetName = "sre-team";

const LibraryPayload1 = {
  name: SetName,
  service_account_names: ['mathias.thulmann@chatopsknight.com'],
  ttl: '1h',
  max_ttl: '2h',
  disable_check_in_enforcement: false
};
const LibraryPayload2 = {
  name: SetName,
  service_account_names: ['mathias.thulmann@chatopsknight.com', 'triss.merigold@chatopsknight.com'],
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
  service_account_names: ['mathias.thulmann@chatopsknight.com']
}

const CredCheckIn2 = {
  name: SetName,
  service_account_names: ['triss.merigold@chatopsknight.com']
}

vault.createADRole(RootToken, RolePayload1).then(function(data){
    console.log('1> createADRole output:\n',data);
}).catch(function(createError){
    console.error('1> createADRole error:\n',createError);
    console.error('1> createADRole error:\n',createError.response.data);
});

vault.createADLibrary(RootToken, LibraryPayload1).then(function(data){
  console.log('1> createADLibrary output:\n',data);
  vault.updateADLibrary(RootToken, LibraryPayload2).then(function(data){
    console.log('2> updateADLibrary output:\n',data);
    vault.checkADCredOut(RootToken, CredCheckOut).then(function(data){
      console.log('3> checkADCredOut output:\n',data);
      vault.checkADCredOut(RootToken, CredCheckOut).then(function(data){
        console.log('4> checkADCredOut output:\n',data);
        vault.checkADCredIn(RootToken, CredCheckIn1, false).then(function(data){
          console.log('5a> checkADCredIn output:\n',data);
        }).catch(function(checkinError){
          console.error('5a> checkADCredIn error:\n',checkinError);
          console.error('5a> checkADCredIn error:\n',checkinError.response.data);
        });
        vault.checkADCredIn(RootToken, CredCheckIn2, false).then(function(data){
          console.log('5b> checkADCredIn output:\n',data);
        }).catch(function(checkinError){
          console.error('5b> checkADCredIn error:\n',checkinError);
          console.error('5b> checkADCredIn error:\n',checkinError.response.data);
        });
      }).catch(function(checkoutError){
        console.error('4> checkADCredOut error:\n',checkoutError);
        console.error('4> checkADCredOut error:\n',checkoutError.response.data);
      });
    }).catch(function(checkoutError){
      console.error('3> checkADCredOut error:\n',checkoutError);
      console.error('3> checkADCredOut error:\n',checkoutError.response.data);
    });
  }).catch(function(updateError){
    console.error('2> updateADLibrary error:\n',updateError);
    console.error('2> updateADLibrary error:\n',updateError.response.data);
  });
}).catch(function(createError){
  console.error('3> createADLibrary error:\n',createError);
  console.error('3> createADLibrary error:\n',createError.response.data);
});

// Forcing the credential checkin manually
// vault write ad/library/sre-team/check-in service_account_names=triss.merigold@chatopsknight.com
// vault write ad/library/sre-team/check-in service_account_names=mathias.thulmann@chatopsknight.com