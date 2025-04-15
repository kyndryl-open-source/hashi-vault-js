//Simple smoke test for the KV secret engine
// This test will create a new secret engine, create a secret, read the secret, update the secret, delete the secret, and then delete the secret engine.
import Vault from '../src/Vault.js';
import { generate } from 'random-words';

// source process.env
const RandName = generate({ exactly: 1, wordsPerString: 2, separator:'-' });
const RandNum = Math.floor((Math.random() * 100) + 1);
const SecretName = `${RandName}-${RandNum}`;
const Secrets1 = {
    bot_token1: "xoxb-123456789011-1234567890123-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789011-1234567890124-1w1lln0tt3llmys3cr3tatm3"
};
const Secrets2 = {
    bot_token1: "xoxb-123456789022-1234567890125-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789022-1234567890126-1w1lln0tt3llmys3cr3tatm3"
};
const Secrets3 = {
    bot_token1: "xoxb-123456789033-1234567890127-1w1lln0tt3llmys3cr3tatm3",
    bot_token2: "xoxb-123456789033-1234567890128-1w1lln0tt3llmys3cr3tatm3"
};
const Metadata = {
  max_versions: 5,
  cas_required: false,
  delete_version_after: "3h25m19s",
  custom_metadata: {
    tag1: "development",
    tag2: "unit-test"
  }
};
const Metadata2 = {
  max_versions: 7,
  cas_required: false,
  delete_version_after: "200h20m20s",
  custom_metadata: {
    tag1: "development",
    tag2: "unit-test",
    tag3: "smoke-test"
  }
};
const Config = {
  max_versions: 5
};

let token = null;
let newSecretId = null;
const Token = process.env.VAULT_KNIGHT_TOKEN;
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CA_CERT;
const VaultUrl = process.env.VAULT_URL;
const RootPath = process.env.ROOT_PATH;

const vault = new Vault( {
    https: true,
    cert: ClientCert,
    key: ClientKey,
    cacert: CACert,
    baseUrl: VaultUrl,
    timeout: 1000,
    proxy: false
});

vault.healthCheck().then(function(data) {
  console.log('1> healthCheck output: \n',data);
  if (!data.sealed) {
    vault.updateKVEngineConfig(Token, Config, RootPath).then(function(data) {
      console.log('2> updateKVEngineConfig output: \n',data);
      vault.readKVEngineConfig(Token, RootPath).then(function(data) {
        console.log('3> readKVEngineConfig output: \n',data);
        vault.createKVSecret(Token, SecretName , Secrets1, RootPath).then(function(data) {
          console.log('4> createKVSecret output: \n',data);
          vault.readKVSecret(Token, SecretName, 1, RootPath).then(function(data) {
            console.log('5> readKVSecret output: \n',data);
            vault.updateKVSecret(Token, SecretName, Secrets2, 1, RootPath).then(function(data) {
              console.log('6> updateKVSecret output: \n',data);
              vault.updateKVSecret(Token, SecretName, Secrets3, 2, RootPath).then(function(data) {
                console.log('7> updateKVSecret output: \n',data);

                vault.eliminateKVSecret(Token, SecretName, RootPath).then(function(data) {
                  console.log('8> eliminateKVSecret output: \n',data);


                  vault.createKVSecretMeta(Token, SecretName, Metadata, RootPath).then(function(data) {
                    console.log('9> createKVSecretMeta output: \n',data);

                    vault.readKVSecretMeta(Token, SecretName, RootPath).then(function(data) {
                      console.log('10> readKVSecretMeta output: \n',data);

                      vault.updateKVSecretMeta(Token, SecretName, Metadata2, RootPath).then(function(data) {
                        console.log('11> updateKVSecretMeta output: \n',data);
  
                      }).catch(function(updateError){
                        console.error('11> readKVSecretMeta error: \n',updateError);
                      });
                    }).catch(function(readError){
                      console.error('10> readKVSecretMeta error: \n',readError);
                    });

                  }).catch(function(createError){
                    console.error('9> createKVSecretMeta error: \n',createError);
                    console.error('9> createKVSecretMeta error: \n',createError.response.data);
                  });
                  

                }).catch(function(updateError){
                  console.error('8> eliminateKVSecret error: \n',updateError);
                });
              }).catch(function(updateError){
                console.error('7> updateKVSecret error: \n',updateError);
              });
            }).catch(function(updateError){
              console.error('6> updateKVSecret error: \n',updateError);
            });
          }).catch(function(readError){
            console.error('5> readKVSecret error: \n',readError);
          });
        }).catch(function(createError){
          console.error('4> createKVSecret error: \n',createError);
        });
      }).catch(function(engineError) {
        console.error('3> readKVEngineConfig error: \n', engineError);
      });
    }).catch(function(engineError){
      console.error('2> updateKVEngineConfig error: \n',engineError);
    });
  }
}).catch(function(healthError){
  console.error('1> healthCheck error: \n',healthError);
});
