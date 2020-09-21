//Simple test


// source process.env
// node PKI-smoke-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;
const RootToken = process.env.VAULT_ROOT_TOKEN;

const Vault = require('../Vault');
const fs =require('fs');
let caBundle = "";

try {
  caBundle = fs.readFileSync('./ca-bundle.pem', 'utf8');
} catch(fsError) {
  console.error('FS error: ', fsError);
}

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
  if (!data.sealed && caBundle) {
    //caBundle = caBundle.replace(/\r\n|\n/gi, '\\n');
    vault.setCACertificate(RootToken, caBundle).then(function(data){
      console.log('>> setCACertificate output: \n',data);
      vault.readCACertificate('pem').then(function(data){
        console.log('>>> readCACertificate output: \n',data);
      }).catch(function(readError){
        console.error('>>> readCACertificate error: \n',readError);
      });
      vault.readCAChain().then(function(data){
        console.log('>>> readCAChain output: \n',data);
      }).catch(function(readError){
        console.error('>>> readCAChain error: \n',readError);
      });
      vault.setCrlConfig(RootToken, '720h', false).then(function(data){
        console.log('>>> setCrlConfig output: \n',data);
        vault.readCrlConfig(RootToken).then(function(data){
          console.log('>>>> readCrlConfig output: \n',data);
        }).catch(function(readError){
          console.error('>>>> readCrlConfig error: \n',readError);
        });
      }).catch(function(setError){
        console.error('>>> setCrlConfig error: \n',setError);
      });
      vault.setPkiUrls(RootToken, [ 'https://vault.local:8200/v1/pki/crl' ], [ 'https://vault.local:8200/v1/pki/ca' ], [ 'https://vault.local:8200/v1/pki/oscp' ]).then(function(data){
        console.log('>>> setPkiUrls output: \n',data);
        vault.readPkiUrls(RootToken).then(function(data){
          console.log('>>>> readPkiUrls output: \n',data);
        }).catch(function(readError){
          console.error('>>>> readPkiUrls error: \n',readError);
        });
      }).catch(function(setError){
        console.error('>>> setPkiUrls error: \n',readError);
      });
      vault.readPkiCrl('pem').then(function(data){
        console.log('>>> readPkiCrl output: \n',data);
      }).catch(function(readError){
        console.error('>>> readPkiCrl error: \n',readError);
      });
      vault.listCertificates(RootToken).then(function(data){
        console.log('>>> listCertificates output: \n',data);
        vault.readCertificate(data.keys[0]).then(function(data){
          console.log('>>>> readCertificate output: \n',data);
        }).catch(function(readError){
          console.error('>>>> readCertificate error: \n',readError);
        });
      }).catch(function(listError){
        console.error('>>> listCertificates error: \n',listError);
      });
    }).catch(function(configError){
      console.error('> setCACertificate error: \n',configError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
