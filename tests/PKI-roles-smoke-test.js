//Simple test


// source process.env
// node PKI-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const Vault = require('../Vault');

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: 'pki',
    timeout: 10000,
    proxy: false
});

let roleParams = {
  name: "dummy",
  ttl: "8760h",
  maxTtl: "43800h",
  allowLocalhost: true,
  allowedDomains: ["dummy.com", "acme.com"],
  allowedDomainsTemplate: false,
  allowBareDomains: false,
  allowSubdomains: true,
  allowGlobDomains: false,
  allowAnyName: false,
  enforceHostnames: true,
  allowIpSans: true,
  allowedUriSans: "https://dummy.com,https://acme.com",
  allowedOtherSans: null,
  serverFlag: true,
  clientFlag: false,
  codeSigningFlag: false,
  emailProtectionFlag: false,
  keyType: "rsa",
  keyBits: 4096,
  keyUsage: ["DigitalSignature", "KeyAgreement", "KeyEncipherment"],
  externalKeyUsage: null,
  extKeyUsageOids: null,
  useCsrCommonName: true,
  useCsrSans: true,
  ou: "vault",
  organization: "acme",
  country: "br",
  locality: "campinas",
  province: "sp",
  streetAddress: "",
  postalCode: "",
  serialNumber: "",
  generateLease: false,
  noStore: false,
  requireCn: true,
  policyIdentifiers: null,
  basicConstraintsValidForNonCa: false,
  notBeforeDuration: "5m"
}

vault.healthCheck().then(function(data) {
  console.log('1> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.createPkiRole(RootToken, roleParams, 'pki').then(function(data){
      console.log('2> createPkiRole output: \n',data);
      roleParams.codeSigningFlag = true;
      roleParams.notBeforeDuration = "1m";
      vault.updatePkiRole(RootToken, roleParams, 'pki').then(function(data){
        console.log('3> updatePkiRole output: \n',data);
        vault.readPkiRole(RootToken, roleParams.name).then(function(data){
          console.log('4> readPkiRole output: \n',data);
          vault.deletePkiRole(RootToken, roleParams.name).then(function(data){
            console.log('5> deletePkiRole output: \n',data);
            vault.readPkiRole(RootToken, roleParams.name).then(function(data){
              console.log('6> readPkiRole output: \n',data);
            }).catch(function(readError){
                console.error('6> readPkiRole error: \n',readError);
            });
          }).catch(function(deleteError){
              console.error('5> deletePkiRole error: \n',deleteError);
          });
          vault.listPkiRoles(RootToken).then(function(data){
            console.log('5> listPkiRoles output: \n',data);
          }).catch(function(listError){
              console.error('5> listPkiRoles error: \n',listError);
          });
        }).catch(function(readError){
            console.error('4> readPkiRole error: \n',readError);
        });
      }).catch(function(updateError){
          console.error('3> updatePkiRole error: \n',updateError);
      });
    }).catch(function(createError){
        console.error('2> createPkiRole error: \n',createError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
