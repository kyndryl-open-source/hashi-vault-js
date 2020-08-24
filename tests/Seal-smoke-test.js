//Simple test

// source process.env
// node Seal-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;
const VaultUnsealKey1 = process.env.VAULT_UNSEAL_KEY1;
const VaultUnsealKey2 = process.env.VAULT_UNSEAL_KEY2;
const VaultUnsealKey3 = process.env.VAULT_UNSEAL_KEY3;
const Metadata = {
  tag1: "knight-vault",
  tag2: "smoke-test"
};
const Paths = ["/sys/host-info", "/sys/capabilities", "/sys/init" ];

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

vault.sealStatus().then(function(data){
  console.log('> sealStatus output: \n', data);
  if (!data.sealed && data.initialized) {
    vault.sysSeal(RootToken).then(function(data){
      console.log('> sysSeal output: \n', data);
    }).catch(function(sealError){
      console.error('> sysSeal error: \n',sealError);
    });
  } else {
    vault.sysUnseal(RootToken, VaultUnsealKey1, false, false).then(function(data){
      console.log('> sysUnseal output: \n', data);
    }).catch(function(unsealError){
      console.error('> sysUnseal error: \n',unsealError);
    });
    vault.sysUnseal(RootToken, VaultUnsealKey2, false, false).then(function(data){
      console.log('> sysUnseal output: \n', data);
    }).catch(function(unsealError){
      console.error('> sysUnseal error: \n',unsealError);
    });
    vault.sysUnseal(RootToken, VaultUnsealKey3, false, false).then(function(data){
      console.log('> sysUnseal output: \n', data);
    }).catch(function(unsealError){
      console.error('> sysUnseal error: \n',unsealError);
    });
  }
}).catch(function(sealError){
  console.error('> sealStatus error: \n',sealError);
});
