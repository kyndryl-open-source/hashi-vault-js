//Simple test


// source process.env
// node PKI-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const Vault = require('../Vault');
const fs = require('fs');

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    rootPath: 'pki',
    timeout: 20000,
    proxy: false
});

const RootCAParams = {
  type: "exported",
  commonName: "root-ca.vault.acme.com",
  altNames: "",
  ipSans: "127.0.0.1, 10.0.0.100",
  uriSans: "https://root-ca.vault.acme.com",
  otherSans: "",
  ttl: "87600h",
  format: "pem_bundle",
  pkFormat: "der",
  keyType: "rsa",
  keyBits: 4096,
  maxPathLength: 2,
  excludeCnFromSans: false,
  ou: "ACME",
  organization: "Security",
  country: "Brazil",
  locality: "Campinas",
  province: "Sao Paulo",
  streetAddress: "",
  postalCode: "13087",
  serialNumber: "01"
};

const IntCAParams = {
  type: "internal",
  commonName: "intermediate-ca.vault.acme.com",
  altNames: null,
  ipSans: null,
  uriSans: null,
  otherSans: null,
  format: "pem_bundle",
  pkFormat: "der",
  keyType: "rsa",
  keyBits: 4096,
  excludeCnFromSans: false,
  ou: "ACME",
  organization: null,
  country: "Brazil",
  locality: null,
  province: null,
  streetAddress: null,
  postalCode: null,
  serialNumber: null
};

let signIntCAParams = {
  csr: "",
  commonName: "intermediate-ca.vault.acme.com",
  altNames: null,
  ipSans: null,
  uriSans: null,
  otherSans: null,
  format: "pem_bundle",
  maxPathLength: null,
  excludeCnFromSans: null,
  useCsrValues: null,
  permittedDnsDomains: null,
  ou: null,
  organization: null,
  country: null,
  locality: null,
  province: null,
  streetAddress: null,
  postalCode: null,
  serialNumber: null
}

let token = null;
let caBundle = null;

try {
  caBundle = fs.readFileSync('./ca-bundle.pem', 'utf-8');
} catch(error){
  console.error('FS error: ', error);
}

vault.healthCheck().then(function(data) {
  console.log('> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.setCACertificate(RootToken, caBundle).then(function(data){
      console.log('>> setCACertificate output: \n',data);
      vault.deleteRootCA(RootToken).then(function(data){
        console.log('>>> deleteRootCA output: \n',data);

        vault.generateRootCA(RootToken, RootCAParams).then(function(data){
          console.log('>>>> generateRootCA output: \n',data);
          vault.readCAChain().then(function(data){
            console.log('>>>>> readCAChain output: \n',data);
          }).catch(function(readError){
            console.error('>>>>> readCAChain error: \n',readError);
          });
          vault.readCACertificate('pem').then(function(data){
            console.log('>>>>> readCACertificate output: \n',data);
          }).catch(function(readError){
              console.error('>>>>> readCACertificate error: \n',readError);
          });

          vault.genIntermediateCA(RootToken, IntCAParams, 'pki_int').then(function(data){
            console.log('>>> genIntermediateCA output: \n',data);
            signIntCAParams.csr = data.csr;
            vault.signIntermediateCA(RootToken, signIntCAParams).then(function(data){
              console.log('>>>> signIntermediateCA output: \n',data);
              vault.setIntermediateCA(RootToken, data.certificate, 'pki_int').then(function(data){
                console.log('>>>>> setIntermediateCA output: \n',data);
              }).catch(function(setError){
                console.error('>>>>> setIntermediateCA error: \n',setError);
              });
            }).catch(function(signError){
              console.error('>>>> signIntermediateCA error: \n',signError);
            });
          }).catch(function(genError){
              console.error('>>> genIntermediateCA error: \n',genError);
          });
        }).catch(function(setError){
            console.error('>> setIntermediateCA error: \n',setError);
        });

      }).catch(function(genError){
        console.error('>>>> generateRootCA error: \n',genError);
      });
    }).catch(function(setError){
      console.error('>>> setCACertificate error: \n',setError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
