//Simple test

// source process.env
// node SysApi.test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;
const NameSpace = "ns1";
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
    proxy: false,
    namespace: NameSpace,
});

let token = null;

// Other functions
vault.sealStatus().then(function(data){
  console.log('1> sealStatus output: \n', data);
  if (!data.sealed) {
    vault.sysHostInfo(RootToken).then(function(data){
      console.log('2> sysHostInfo output: \n', data);
    }).catch(function(hostError){
      console.error('2> sysHostInfo error: \n',hostError);
    });
    vault.sysInternalCounters(RootToken, 'tokens').then(function(data){
      console.log('2> sysInternalCounters output: \n', data);
    }).catch(function(countersError){
      console.error('2> sysInternalCounters error: \n',countersError);
    });
    vault.sysMetrics(RootToken, 'json').then(function(data){
      console.log('2> sysMetrics output: \n', data);
    }).catch(function(metricsError){
      console.error('2> sysMetrics error: \n',metricsError);
    });
    vault.sysCapabilities(RootToken, RootToken, Paths).then(function(data){
      console.log('2> sysCapabilities output: \n', data);
      vault.sysCapabilitiesSelf(RootToken, Paths).then(function(data){
        console.log('3>sysCapabilitiesSelf output: \n', data);
      }).catch(function(capabilitiesError){
        console.error('3> sysCapabilitiesSelf error: \n',capabilitiesError);
      });
    }).catch(function(capabilitiesError){
      console.error('2> sysCapabilities error: \n',capabilitiesError);
    });
  }
}).catch(function(sealError){
  console.error('1> sealStatus error: \n',sealError);
});
