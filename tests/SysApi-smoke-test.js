//Simple test

// source process.env
// node SysApi.test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;
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

console.log(".................................\n \n \n");
let token = null;

// Other functions
vault.sealStatus().then(function(data){
  console.log('sealStatus output: \n', data);
  if (!data.sealed) {
    vault.sysHostInfo(RootToken).then(function(data){
      console.log('sysHostInfo output: \n', data);
    }).catch(function(hostError){
      console.error('sysHostInfo error: \n',hostError);
    });
    vault.sysInternalCounters(RootToken, 'tokens').then(function(data){
      console.log('sysInternalCounters output: \n', data);
    }).catch(function(countersError){
      console.error('sysInternalCounters error: \n',countersError);
    });
    vault.sysMetrics(RootToken, 'json').then(function(data){
      console.log('sysMetrics output: \n', data);
    }).catch(function(metricsError){
      console.error('sysMetrics error: \n',metricsError);
    });
    vault.sysCapabilities(RootToken, RootToken, Paths).then(function(data){
      console.log('sysCapabilities output: \n', data);
      vault.sysCapabilitiesSelf(RootToken, Paths).then(function(data){
        console.log('sysCapabilitiesSelf output: \n', data);
      }).catch(function(capabilitiesError){
        console.error('sysCapabilitiesSelf error: \n',capabilitiesError);
      });
    }).catch(function(capabilitiesError){
      console.error('sysCapabilities error: \n',capabilitiesError);
    });
  }
  console.log("\n \n \n.................................\n");
}).catch(function(sealError){
  console.error('sealStatus error: \n',sealError);
});
