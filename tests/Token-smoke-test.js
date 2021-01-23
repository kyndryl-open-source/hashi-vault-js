//Simple test

// source process.env
// node Token-smoke-test.js
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

const Vault = require('../Vault');
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
let token= '';
let accessor = '';

vault.listAccessors(ProvToken).then(function(data){
  console.log('> listAccessors output: \n', data);
}).catch(function(accessorError){
  console.error('listAccessors error: \n',accessorError);
});

vault.lookupToken(ProvToken, ProvToken).then(function(data){
  console.log('> ProvToken - lookupToken output: \n', data);
}).catch(function(lookupError){
  console.error('lookupToken error: \n',lookupError);
});

vault.createToken(ProvToken,
  {
    role_name: 'knight',
    meta: Metadata,
    ttl: '1h',
    type: 'batch',
    policies: 'default',
  }).then(function(data){
  console.log('> Batch Token - createToken output: \n', data);
  token=data.client_token;
  accessor=data.accessor;
  vault.lookupAccessor(ProvToken, accessor).then(function(data){
    console.log('>> Batch Token - lookupAccessor output: \n', data);
    vault.renewAccessor(ProvToken, accessor).then(function(data){
      console.log('>>> Batch Token - renewAccessor output: \n', data);
      vault.revokeAccessor(ProvToken, accessor).then(function(data){
        console.log('>>>> Batch Token - revokeAccessor output: \n', data);
      }).catch(function(revokeError){
        console.error('>>>> Batch Token - revokeAccessor error: \n',revokeError);
      });
    }).catch(function(renewError){
      console.error('>>> Batch Token - renewAccessor error: \n',renewError);
    });
  }).catch(function(accessorError){
    console.error('>> Batch Token - lookupAccessor error: \n',accessorError);
  });
}).catch(function(createError){
  console.error('> Batch Token - createToken error: \n',createError);
});

vault.createToken(ProvToken,
  {
    role_name: 'knight',
    meta: Metadata,
    ttl: '1h',
    policies: 'default',
  }).then(function(data){
  console.log('Service Token - createToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('> Service Token - lookupSelfToken output: \n', data);
    vault.revokeSelfToken(token).then(function(data){
      console.log('>> Service Token - revokeSelfToken output: \n', data);
    }).catch(function(revokeError){
      console.error('>>> Service Token - revokeSelfToken error: \n',revokeError);
    });
  }).catch(function(lookupError){
    console.error('>> Service Token - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> Service Token - createToken error: \n',createError);
});

vault.createToken(ProvToken,
  {
    no_parent: true,
    ttl: '1h',
    policies: ['knight-vault'],
  }).then(function(data){
  console.log('> Orphan Service Token - createToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> Orphan Service Token - lookupSelfToken output: \n', data);
    vault.renewToken(ProvToken, token, '1h').then(function(data){
      console.log('>>> Orphan Service Token - renewToken output: \n', data);
      vault.revokeToken(ProvToken, token).then(function(data){
        console.log('>>>> Orphan Service Token - revokeToken output: \n', data);
      }).catch(function(revokeError){
        console.error('>>>> Orphan Service Token - revokeToken error: \n',revokeError);
      });
    }).catch(function(renewError){
      console.error('>>> Orphan Service Token - renewToken error: \n',renewError);
    });
  }).catch(function(lookupError){
    console.error('>> Orphan Service Token - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> Orphan Service Token - createOrphanSToken - error: \n',createError);
});

vault.createToken(ProvToken,
  {
    no_parent: true,
    ttl: '24h',
    type: 'batch',
    policies: ['knight-vault'],
  }).then(function(data){
  console.log('> Orphan Batch Token - createToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> Orphan Batch Token - lookupSelfToken output: \n', data);
    vault.revokeToken(ProvToken, token).then(function(data){
      console.log('>>> Orphan Batch Token - revokeToken output: \n', data);
    }).catch(function(revokeError){
      console.error('>>> Orphan Batch Token - revokeToken error: \n',revokeError);
    });
  }).catch(function(lookupError){
    console.error('>> Orphan Batch Token - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> Orphan Batch Token - createOrphanBToken error: \n',createError);
});
