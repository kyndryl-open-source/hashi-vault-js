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
    timeout: 5000,
    proxy: false
});

const CertParams = {
  role: "acme",
  commonName: "www.vault.acme.com",
  altNames: "www1.vault.acme.com",
  ipSans: "10.0.0.200",
  uriSans: "",
  otherSans: "",
  ttL: "365d",
  format: "pem_bundle",
  pkFormat: "der",
  excludeCnFromSans: false
};

vault.healthCheck().then(function(data) {
  console.log('> healthCheck output: \n',data);
  if (!data.sealed) {

    vault.genPkiCertificate(RootToken, CertParams).then(function(data){
      console.log('>>>> genPkiCertificate output: \n',data);
      vault.revokePkiCertificate(RootToken, data.serial_number).then(function(data){
        console.log('>>>>> revokePkiCertificate output: \n',data);
      }).catch(function(revokeError){
        console.error('>>>>> revokePkiCertificate error: \n',revokeError);
      });
    }).catch(function(genError){
      console.error('>>>> genPkiCertificate error: \n',genError);
    });

    vault.setCrlConfig(RootToken, '720h', false).then(function(data){
      console.log('>>>> setCrlConfig output: \n',data);
      vault.readCrlConfig(RootToken).then(function(data){
        console.log('>>>> readCrlConfig output: \n',data);
      }).catch(function(readError){
        console.error('>>>>> readCrlConfig error: \n',readError);
      });
    }).catch(function(setError){
      console.error('>>>> setCrlConfig error: \n',setError);
    });

    vault.setPkiUrls(RootToken, [ 'https://127.0.0.1:8200/v1/pki/ca/pem' ], [ 'https://127.0.0.1:8200/v1/pki/crl' ], [ 'https://127.0.0.1:8200/v1/pki/oscp' ]).then(function(data){
      console.log('>>>> setPkiUrls output: \n',data);
      vault.readPkiUrls(RootToken).then(function(data){
        console.log('>>>>> readPkiUrls output: \n',data);
      }).catch(function(readError){
        console.error('>>>>> readPkiUrls error: \n',readError);
      });
    }).catch(function(setError){
      console.error('>>>> setPkiUrls error: \n',readError);
    });
    vault.rotatePkiCrl(RootToken).then(function(data){
      console.log('>>>> rotatePkiCrl output: \n',data);
      vault.readPkiCrl('pem').then(function(data){
        console.log('>>>>> readPkiCrl output: \n',data);
      }).catch(function(readError){
        console.error('>>>>> readPkiCrl error: \n',readError);
      });
    }).catch(function(rotateError){
      console.error('>>> rotatePkiCrl error: \n',rotateError);
    });

    vault.listCertificates(RootToken).then(function(data){
      console.log('>>>> listCertificates output: \n',data);
      vault.readCertificate(data.keys[0]).then(function(data){
        console.log('>>>>> readCertificate output: \n',data);
      }).catch(function(readError){
        console.error('>>>>> readCertificate error: \n',readError);
      });
    }).catch(function(listError){
      console.error('>>>> listCertificates error: \n',listError);
    });
  }
}).catch(function(healthError){
  console.error('> healthCheck error: \n',healthError);
});
