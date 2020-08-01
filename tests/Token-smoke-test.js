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

vault.createToken(ProvToken, null, 'knight', null, Metadata, false, false, true,
  '1h', 'service', '', 'app1', 0, '', '').then(function(data){
  console.log('> Token1 - createToken output: \n', data);
  token=data.client_token;
  accessor=data.accessor;
  vault.lookupAccessor(ProvToken, accessor).then(function(data){
    console.log('>> Token1 - lookupAccessor output: \n', data);
    vault.renewAccessor(ProvToken, accessor).then(function(data){
      console.log('>>> Token1 - renewAccessor output: \n', data);
      vault.revokeAccessor(ProvToken, accessor).then(function(data){
        console.log('>>>> Token1 - revokeAccessor output: \n', data);
      }).catch(function(revokeError){
        console.error('>>>> Token1 - revokeAccessor error: \n',revokeError);
      });
    }).catch(function(renewError){
      console.error('>>> Token1 - renewAccessor error: \n',renewError);
    });
  }).catch(function(accessorError){
    console.error('>> Token1 - lookupAccessor error: \n',accessorError);
  });
}).catch(function(createError){
  console.error('> Token1 - createToken error: \n',createError);
});

vault.createToken(ProvToken, null, 'knight', null, Metadata, false, false, true,
  '24h', 'batch', '', 'bot2', 0, '', '').then(function(data){
  console.log('Token - createToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('> Token2 - lookupSelfToken output: \n', data);
    vault.revokeSelfToken(token).then(function(data){
      console.log('>> Token2 - revokeSelfToken output: \n', data);
    }).catch(function(revokeError){
      console.error('>>> Token2 - revokeSelfToken error: \n',revokeError);
    });
  }).catch(function(lookupError){
    console.error('>> Token2 - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> Token2 - createToken error: \n',createError);
});

vault.createSToken(ProvToken, 'knight', ['knight-vault'], true, '12h').then(function(data){
  console.log('> SToken - createSToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> SToken - lookupSelfToken output: \n', data);
    vault.renewSelfToken(token, '1h').then(function(data){
      console.log('>>> SToken - renewSelfToken output: \n', data);
      vault.revokeSelfToken(token).then(function(data){
        console.log('>>>> SToken - revokeSelfToken output: \n', data);
      }).catch(function(revokeError){
        console.error('>>>> SToken - revokeSelfToken error: \n',revokeError);
      });
    }).catch(function(renewError){
      console.error('>>> SToken - renewSelfToken error: \n',renewError);
    });
  }).catch(function(lookupError){
    console.error('>> SToken - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> SToken - createSToken error: \n',createError);
});

vault.createBToken(ProvToken, 'knight', null, '24h').then(function(data){
  console.log('> BToken - createBToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> BToken - lookupSelfToken output: \n', data);
    vault.revokeToken(ProvToken, token).then(function(data){
      console.log('>>> BToken - revokeToken output: \n', data);
    }).catch(function(revokeError){
      console.error('>>> BToken - revokeToken error: \n',revokeError);
    });
  }).catch(function(lookupError){
    console.error('>> BToken - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> BToken - createBToken error: \n',createError);
});

vault.createOrphanSToken(ProvToken, ['knight-vault'], true, '1h').then(function(data){
  console.log('> OrphanSToken - createOrphanSToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> OrphanSToken - lookupSelfToken output: \n', data);
    vault.renewToken(ProvToken, token, '1h').then(function(data){
      console.log('>>> OrphanSToken - renewToken output: \n', data);
      vault.revokeToken(ProvToken, token).then(function(data){
        console.log('>>>> OrphanSToken - revokeToken output: \n', data);
      }).catch(function(revokeError){
        console.error('>>>> OrphanSToken - revokeToken error: \n',revokeError);
      });
    }).catch(function(renewError){
      console.error('>>> OrphanSToken - renewToken error: \n',renewError);
    });
  }).catch(function(lookupError){
    console.error('>> OrphanSToken - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> OrphanSToken - createOrphanSToken - error: \n',createError);
});

vault.createOrphanBToken(ProvToken, ['knight-vault'], '24h').then(function(data){
  console.log('> OrphanBToken - createOrphanBToken output: \n', data);
  token=data.client_token;
  vault.lookupSelfToken(token).then(function(data){
    console.log('>> OrphanBToken - lookupSelfToken output: \n', data);
    vault.revokeToken(ProvToken, token).then(function(data){
      console.log('>>> OrphanBToken - revokeToken output: \n', data);
    }).catch(function(revokeError){
      console.error('>>> OrphanBToken - revokeToken error: \n',revokeError);
    });
  }).catch(function(lookupError){
    console.error('>> OrphanBToken - lookupSelfToken error: \n',lookupError);
  });
}).catch(function(createError){
  console.error('> OrphanBToken - createOrphanBToken error: \n',createError);
});
