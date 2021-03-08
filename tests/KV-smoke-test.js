//Simple test
const Vault = require('../Vault');

// source process.env
const SecretName = "Slack104";
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
  tag1: "development",
  tag2: "unit-test"
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
    vault.readKVEngineConfig(Token, RootPath).then(function(data) {
      console.log('2> readKVEngineConfig output: \n',data);
      vault.createKVSecret(Token, SecretName , Secrets1, RootPath).then(function(data) {
        console.log('3> createKVSecret output: \n',data);
        vault.readKVSecret(Token, SecretName, 1, RootPath).then(function(data) {
          console.log('4> readKVSecret output: \n',data);
          vault.updateKVSecret(Token, SecretName, Secrets2, 1, RootPath).then(function(data) {
            console.log('5> updateKVSecret output: \n',data);
            vault.updateKVSecret(Token, SecretName, Secrets3, 2, RootPath).then(function(data) {
              console.log('6> updateKVSecret output: \n',data);

            }).catch(function(updateError){
              console.error('6> updateKVSecret error: \n',updateError);
            });
          }).catch(function(updateError){
            console.error('5> updateKVSecret error: \n',updateError);
          });
        }).catch(function(readError){
          console.error('4> readKVSecret error: \n',readError);
        });
      }).catch(function(createError){
        console.error('3> createKVSecret error: \n',createError);
      });
    }).catch(function(engineError){
      console.error('2> readKVEngineConfig error: \n',engineError);
    });
  }
}).catch(function(healthError){
  console.error('1> healthCheck error: \n',healthError);
});
