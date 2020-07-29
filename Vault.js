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

  /**
  * @returns {Promise}
  */
  async healthCheck(){
    return new Promise((resolve, reject) => {
      let message = {};
      const getOptions = {
        url: config.sysHealth,
        method: 'get'
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      });
    });
  }

  /**
  * @returns {Promise}
  */
  async sealStatus(){
    return new Promise((resolve, reject) => {
      let message = {};
      const getOptions = {
        url: config.sysSealStatus,
        method: 'get'
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      });
    });
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise}
  */
  async sysHostInfo(sudoToken){
    return new Promise((resolve, reject) => {
      let message = {};
      const getOptions = {
        url: config.sysHostInfo,
        method: 'get',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
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
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: config.sysCapabilitiesSelf,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          paths: paths
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
        const getOptions = {
          url: `${config.sysInternalCounters}/${type}`,
          method: 'get',
          headers: {
            "X-Vault-Token": sudoToken
          }
        };
        this.instance(getOptions).then(function(response){
          if (response.data) {
            message = response.data.data;
          } else {
            message['status']= response.status;
            message['statusText'] = response.statusText;
          }
          resolve(message);
        }).catch(function(error){
          if (error.response){
            message['status']= error.response.status;
            message['data']= error.response.data;
            message['headers']= error.response.headers;
          } else if (error.request) {
            message = error.request;
          } else {
            message = error.message;
          }
          reject(message);
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
      let message = {};
      const getOptions = {
        url: '',
        method: 'get',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      if (config.sysMetricFormats.includes(format)) {
        getOptions.url= `${config.sysMetrics}?format=${format}`;
      }
      else {
        getOptions.url= `${config.sysMetrics}`;
      }
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      }) ;
    });
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise}
  */
  async sysSeal(sudoToken){
    return new Promise((resolve, reject) => {
      let message = {};
      const putOptions = {
        url: config.sysSeal,
        method: 'put',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };
      this.instance(putOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const putOptions = {
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
      this.instance(putOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      });
    });
  }

  /**
  * @param {String} roleId
  * @param {String} secretId
  * @returns {Object}
  */
  async loginWithAppRole(roleId, secretId) {
    return new Promise((resolve, reject) => {
      let message = {};
      const postOptions = {
        url: config.appRoleLogin,
        method: 'post',
        data: {
          role_id: roleId,
          secret_id: secretId
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data.auth;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      });
    });
  }

  /**
  * @param {String} token
  * @returns {Promise}
  */
  async readKVEngineConfig(token) {
    return new Promise((resolve, reject) => {
      let message = {};
      const getOptions = {
        url: `/${this.rootPath}/${config.enginePath}`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
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
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
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
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const suffix = version ? `?version=${version}` : "";
      const getOptions = {
        url: `/${this.rootPath}/${config.readPath}/${name}${suffix}`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const deleteOptions = {
        url: `/${this.rootPath}/${config.lvDeletePath}/${name}`,
        method: 'delete',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(deleteOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `/${this.rootPath}/${config.deletePath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `/${this.rootPath}/${config.undeletePath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `/${this.rootPath}/${config.destroyPath}/${name}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "versions": versions
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const getOptions = {
        url: `/${this.rootPath}/${config.listPath}/${name}/?=list=true`,
        method: 'get',
        headers: {
          "X-Vault-Token": token
        }
      };
      this.instance(getOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `${config.appRolePath}/${appRole}/secret-id`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "metadata": metadata
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `${config.appRolePath}/${appRole}/secret-id/lookup`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "secret_id": secretId
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
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
      let message = {};
      const postOptions = {
        url: `${config.appRolePath}/${appRole}/secret-id/destroy`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          "secret_id": secretId
        }
      };
      this.instance(postOptions).then(function(response){
        if (response.data) {
          message = response.data;
        } else {
          message['status']= response.status;
          message['statusText'] = response.statusText;
        }
        resolve(message);
      }).catch(function(error){
        if (error.response){
          message['status']= error.response.status;
          message['data']= error.response.data;
          message['headers']= error.response.headers;
        } else if (error.request) {
          message = error.request;
        } else {
          message = error.message;
        }
        reject(message);
      });
    });
  }

}

module.exports = Vault;
