/*
 * Copyright (C) 2020 International Business Machines Corporation and others. All Rights Reserved.
 * The accompanying program is provided under the terms of the IBM public license ("agreement").
 * Written by Rod Anami <rod.anami@br.ibm.com>, June 2020.
*/

const config = require('./Config.js');
// I personally prefer request, but it's deprecated now
const axios = require('axios');
//const _ = require('underscore');
const https = require('https');
const fs = require('fs');

// Internal function - create new https agent
const getHttpsAgent = function(certificate, key, cacert) {
  return new https.Agent({
    // Client certificate
    cert: fs.readFileSync(certificate),
    key: fs.readFileSync(key),
    // CA cert from Hashicorp Vault PKI
    ca: fs.readFileSync(cacert)
  });
}

// Internal function - creates new axios instance
const getAxiosInstance = function(baseurl, timeout, agent, proxy) {
  return axios.create({
      baseURL: baseurl,
      timeout: timeout,
      headers: {
        'X-Application-Name': config.appName
      },
      httpsAgent: agent,
      proxy: proxy
  });
}

// Internal function - parse axios response
const parseAxiosResponse = function(response){
  let message = {};
  if (response.data.data) {
    message = response.data.data;
  } else if (response.data.auth){
    message = response.data.auth;
  } else if (response.data) {
    message = response.data;
  } else {
    message['status']= response.status;
    message['statusText'] = response.statusText;
  }
  return message;
}

// Internal function - parse axios error
const parseAxiosError = function(error){
  let message = {};
  if (error.response){
    message['status']= error.response.status;
    message['data']= error.response.data;
    message['headers']= error.response.headers;
  } else if (error.request) {
    message = error.request;
  } else {
    message = error.message;
  }
  return message;
}

// main class constructor
class Vault {
  constructor(params) {
    this.https = params.https || false;
    this.cert = params.cert;
    this.key = params.key;
    this.cacert = params.cacert;
    this.baseUrl = params.baseUrl || config.baseUrl;
    this.rootPath = params.rootPath || config.rootPath;
    this.timeout = params.timeout || config.timeout;
    this.proxy = params.proxy || config.proxy;
    try {
      if (this.https) {
        this.agent = getHttpsAgent(this.cert, this.key, this.cacert);
      }
      else {
        this.agent = false;
      }
      this.instance = getAxiosInstance(this.baseUrl, this.timeout, this.agent, this.proxy);
    } catch (error) {
      console.error('Error initiating Vault class:\n', error);
    }
  }

  // /sys API endpoints
  /**
  * @returns {Promise}
  */
  async healthCheck(){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysHealth,
        method: 'get'
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @returns {Promise}
  */
  async sealStatus(){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysSealStatus,
        method: 'get'
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise}
  */
  async sysHostInfo(sudoToken){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysHostInfo,
        method: 'get',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @param {String} token
  * @param {[String]} paths
  * @returns {Promise}
  */
  async sysCapabilities(sudoToken, token, paths){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysCapabilities,
        method: 'post',
        headers: {
          "X-Vault-Token": sudoToken
        },
        data: {
          token: token,
          paths: paths
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {[String]} paths
  * @returns {Promise}
  */
  async sysCapabilitiesSelf(token, paths){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysCapabilitiesSelf,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          paths: paths
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @param {Const} type
  * @returns {Promise}
  */
  async sysInternalCounters(sudoToken, type){
    return new Promise((resolve, reject) => {
      let message = {};
      if (config.sysCounterTypes.includes(type)) {
        const Options = {
          url: `${config.sysInternalCounters}/${type}`,
          method: 'get',
          headers: {
            "X-Vault-Token": sudoToken
          }
        };
        this.instance(Options).then(function(response){
          resolve(parseAxiosResponse(response));
        }).catch(function(error){
          reject(parseAxiosError(error));
        });
      } else {
        message['status']= 400;
        message['statusText'] = 'Bad request: Counter type error';
        reject(message);
      }
    });
  }

  /**
  * @param {String} sudoToken
  * @param {Const} type
  * @returns {Promise}
  */
  async sysMetrics(sudoToken, format){
    return new Promise((resolve, reject) => {
      const Options = {
        url: '',
        method: 'get',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      if (config.sysMetricFormats.includes(format)) {
        Options.url= `${config.sysMetrics}?format=${format}`;
      }
      else {
        Options.url= `${config.sysMetrics}`;
      }
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      }) ;
    });
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise}
  */
  async sysSeal(sudoToken){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysSeal,
        method: 'put',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @param {String} key
  * @param {Boolean} reset
  * @param {Boolean} migrate
  * @returns {Promise}
  */
  async sysUnseal(sudoToken, key, reset, migrate){
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.sysUnseal,
        method: 'put',
        headers: {
          "X-Vault-Token": sudoToken
        },
        data: {
          "key": key,
          "reset": reset,
          "migrate": migrate
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  // Token auth method API endpoints
  /**
  * @param {String} vaultToken
  * @param {String} roleName
  * @param {[String]} policies
  * @param {Object} meta
  * @param {Boolean} noParent
  * @param {Boolean} noDefaultPolicy
  * @param {Boolean} renewable
  * @param {String} ttl
  * @param {String} type
  * @param {String} explicitMaxTtl
  * @param {String} displayName
  * @param {Integer} numUses
  * @param {String} period
  * @param {String} entityAlias
  * @returns {Promise}
  */
  async createToken(vaultToken, id, roleName, policies, meta, noParent,
    noDefaultPolicy, renewable, ttl, type, explicitMaxTtl, displayName,
    numUses, period, entityAlias) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenCreate,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          id: id || null,
          policies: policies || null,
          meta: meta || null,
          no_parent: noParent || false,
          no_default_policy: noDefaultPolicy || false,
          renewable: renewable || true,
          ttl: ttl || null,
          type: type || 'service',
          explicit_max_ttl: explicitMaxTtl || null,
          display_name: displayName || '',
          num_uses: numUses || 0,
          period: period || null,
          entity_alias: entityAlias || null
        }
      };
      if (roleName) {
        Options.url = `${config.tokenCreate}/${roleName}`;
      }
      //console.log(Options.data);
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  //createToken encapsulations
  /**
  * @param {String} vaultToken
  * @param {String} roleName
  * @param {[String]} policies
  * @param {Boolean} renewable
  * @param {String} ttl
  * @returns {Promise}
  */
  async createSToken(vaultToken, roleName, policies, renewable, ttl) {
    const Metadata = {
      calledFunction: "createSToken"
    };
    return await this.createToken(vaultToken, null, roleName, policies,
      Metadata, false, false, renewable, ttl, 'service', null,
      null, 0, null, null);
  }

  /**
  * @param {String} vaultToken
  * @param {String} roleName
  * @param {[String]} policies
  * @param {String} ttl
  * @returns {Promise}
  */
  async createBToken(vaultToken, roleName, policies, ttl) {
    const Metadata = {
      calledFunction: "createBToken"
    };
    return await this.createToken(vaultToken, null, roleName, policies,
      Metadata, false, false, false, ttl, 'batch', null, null,
      0, null, null);
  }

  /**
  * @param {String} vaultToken
  * @param {[String]} policies
  * @param {Boolean} renewable
  * @param {String} ttl
  * @returns {Promise}
  */
  async createOrphanSToken(vaultToken, policies, renewable, ttl) {
    const Metadata = {
      calledFunction: "createOrphanSToken"
    };
    return await this.createToken(vaultToken, null, null, policies,
      Metadata, true, false, renewable, ttl, 'service', null,
      null, 0, null, null);
  }

  /**
  * @param {String} vaultToken
  * @param {[String]} policies
  * @param {String} ttl
  * @returns {Promise}
  */
  async createOrphanBToken(vaultToken, policies, ttl) {
    const Metadata = {
      calledFunction: "createOrphanBToken"
    };
    return await this.createToken(vaultToken, null, null, policies,
      Metadata, true, false, false, ttl, 'batch', null,
      null, 0, null, null);
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @returns {Promise}
  */
  async revokeToken(vaultToken, clientToken) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRevoke,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          token: clientToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} clientToken
  * @returns {Promise}
  */
  async revokeSelfToken(clientToken) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRevokeSelf,
        method: 'post',
        headers: {
          "X-Vault-Token": clientToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @returns {Promise}
  */
  async lookupToken(vaultToken, clientToken) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenLookup,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          token: clientToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} clientToken
  * @returns {Promise}
  */
  async lookupSelfToken(clientToken) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenLookupSelf,
        method: 'get',
        headers: {
          "X-Vault-Token": clientToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @param {String} increment
  * @returns {Promise}
  */
  async renewToken(vaultToken, clientToken, increment) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRenew,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          token: clientToken,
          increment: increment || null
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} clientToken
  * @param {String} increment
  * @returns {Promise}
  */
  async renewSelfToken(clientToken, increment) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRenewSelf,
        method: 'post',
        headers: {
          "X-Vault-Token": clientToken
        },
        data: {
          increment: increment || null
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise}
  */
  async listAccessors(sudoToken) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenListAccessors,
        method: 'list',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @returns {Promise}
  */
  async lookupAccessor(vaultToken, accessor) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenLookupAccessor,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          accessor: accessor
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @param {String} increment
  * @returns {Promise}
  */
  async renewAccessor(vaultToken, accessor, increment) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRenewAccessor,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          accessor: accessor,
          increment: increment || null
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @returns {Promise}
  */
  async revokeAccessor(vaultToken, accessor) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.tokenRevokeAccessor,
        method: 'post',
        headers: {
          "X-Vault-Token": vaultToken
        },
        data: {
          accessor: accessor
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  // AppRole auth method API endpoints
  /**
  * @param {String} roleId
  * @param {String} secretId
  * @returns {Object}
  */
  async loginWithAppRole(roleId, secretId) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: config.appRoleLogin,
        method: 'post',
        data: {
          role_id: roleId,
          secret_id: secretId
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} appRole
  * @param {String} metadata
  * @returns {Promise}
  */
  async generateAppRoleSecretId(token, appRole, metadata) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.appRolePath}/${appRole}/secret-id`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "metadata": metadata
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} appRole
  * @param {String} secretId
  * @returns {Promise}
  */
  async readAppRoleSecretId(token, appRole, secretId) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.appRolePath}/${appRole}/secret-id/lookup`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "secret_id": secretId
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} appRole
  * @param {String} secretId
  * @returns {Promise}
  */
  async destroyAppRoleSecretId(token, appRole, secretId) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.appRolePath}/${appRole}/secret-id/destroy`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "secret_id": secretId
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  // KV secret engine API endpoints
  /**
  * @param {String} token
  * @returns {Promise}
  */
  async readKVEngineConfig(token) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.enginePath}`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {Object} secrets
  * @returns {Promise}
  */
  async createKVSecret(token, name, secrets) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.createPath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          options: {
            "cas": 0
          },
          data: secrets
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {Object} secrets
  * @param {Number} version
  * @returns {Promise}
  */
  async updateKVSecret(token, name, secrets, version) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.updatePath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          options: {
            "cas": version
          },
          data: secrets
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {Number} version
  * @returns {Promise}
  */
  async readKVSecret(token, name, version) {
    return new Promise((resolve, reject) => {
      const suffix = version ? `?version=${version}` : "";
      const Options = {
        url: `/${this.rootPath}/${config.readPath}/${name}${suffix}`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @returns {Promise}
  */
  async deleteLatestVerKVSecret(token, name) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.lvDeletePath}/${name}`,
        method: 'delete',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {[Number]} versions
  * @returns {Promise}
  */
  async deleteVersionsKVSecret(token, name, versions) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.deletePath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {[Number]} versions
  * @returns {Promise}
  */
  async undeleteVersionsKVSecret(token, name, versions) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.undeletePath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @param {[Number]} versions
  * @returns {Promise}
  */
  async destroyVersionsKVSecret(token, name, versions) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.destroyPath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} token
  * @param {String} name
  * @returns {Promise}
  */
  async listKVSecret(token, name) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `/${this.rootPath}/${config.listPath}/${name}/?=list=true`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

}

module.exports = Vault;
