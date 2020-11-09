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
  if (response.data.auth) {
    message = response.data.auth;
  } else if (response.data.data){
    message = response.data.data;
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
  } else if (error.message) {
    message = error.message;
  } else {
    message = error.request;
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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

  //
  // ldap auth method API endpoints
  //

  /**
  * @param {String} username
  * @param {String} password
  * @returns {Object}
  */
  async loginWithLdap(username, password) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapLogin}/${username}`,
        method: 'post',
        data: {
          password: password
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
  * @param {String} username
  * @param {[String]} policies
  * @param {String} groups
  * @returns {Promise<Oject>}
  */
  async createLdapUser(token, username, policies, groups) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapCreateUser}/${username}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          policies: policies,
          groups: groups
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
  * @param {String} username
  * @param {[String]} policies
  * @param {String} groups
  * @returns {Promise<Oject>}
  */
  async updateLdapUser(token, username, policies, groups) {
    return await this.createLdapUser(token, username, policies, groups);
  }

  /**
  * @param {String} token
  * @param {String} group
  * @param {[String]} policies
  * @returns {Promise<Oject>}
  */
  async createLdapGroup(token, group, policies) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapCreateGroup}/${group}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          policies: policies
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
  * @param {String} group
  * @param {[String]} policies
  * @returns {Promise<Oject>}
  */
  async updateLdapGroup(token, group, policies) {
    return await this.createLdapGroup(token, group, policies);
  }

  /**
  * @param {String} token
  * @param {String} group
  * @returns {Promise<Object>}
  */
  async readLdapGroup(token, group) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapReadGroup}/${group}`,
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
  * @param {String} username
  * @returns {Promise<Object>}
  */
  async readLdapUser(token, username) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapReadUser}/${username}`,
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
  * @returns {Promise<Object>}
  */
  async listLdapUsers(token) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapListUsers}`,
        method: 'list',
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
  * @returns {Promise<Object>}
  */
  async listLdapGroups(token) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapListGroups}`,
        method: 'list',
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
  * @param {String} username
  * @returns {Promise<Object>}
  */
  async deleteLdapUser(token, username) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapDeleteUser}/${username}`,
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
  * @param {String} group
  * @returns {Promise<Object>}
  */
  async deleteLdapGroup(token, group) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.ldapDeleteGroup}/${group}`,
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


  //
  // Userpass auth method API endpoints
  //

  /**
  * @param {String} username
  * @param {String} password
  * @returns {Promise<Object>}
  */
  async loginWithUserpass(username, password) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassLogin}/${username}`,
        method: 'post',
        data: {
          password: password
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
  * @param {String} username
  * @param {String} password
  * @param {[String]} policies
  * @returns {Promise<Object>}
  */
  async createUserpassUser(token, username, password, policies) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassCreateUser}/${username}`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          policies: policies,
          password: password
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
  * @param {String} username
  * @param {String} password
  * @param {[String]} policies
  * @returns {Promise<Object>}
  */
  async updateUserpassUser(token, username, password, policies) {
    return await this.createUserpassUser(token, username, password, policies);
  }

  /**
  * @param {String} token
  * @param {String} username
  * @returns {Promise<Object>}
  */
  async readUserpassUser(token, username) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassReadUser}/${username}`,
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
  * @param {String} username
  * @returns {Promise<Object>}
  */
  async deleteUserpassUser(token, username) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassDeleteUser}/${username}`,
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
  * @param {String} username
  * @param {String} password
  * @returns {Promise<Oject>}
  */
  async updateUserpassPassword(token, username, password) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassUpdatePass}/${username}/password`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          password: password
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
  * @param {String} username
  * @param {[String]} policies
  * @returns {Promise<Oject>}
  */
  async updateUserpassPolicies(token, username, policies) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassUpdatePass}/${username}/policies`,
        method: 'post',
        headers: {
          "X-Vault-Token": token
        },
        data: {
          policies: policies
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
  * @returns {Promise<Object>}
  */
  async listUserpassUsers(token) {
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${config.userpassListUsers}`,
        method: 'list',
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



  //
  // AppRole auth method API endpoints
  //

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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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


  //
  // PKI secret engine API endpoints
  //

  /**
  * @param {String: 'der', 'pem'} format
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async readCACertificate(format, mount) {
    let url = "";
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    if (format === 'pem') {
      url = `${rootPath}/${config.pkiReadCACert[0]}/pem`;
    } else {
      url = `${rootPath}/${config.pkiReadCACert[0]}`;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: url,
        method: config.pkiReadCACert[1]
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String: 'der', 'pem'} format
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async readPkiCrl(format, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    if (format === 'pem') {
      url = `${rootPath}/${config.pkiReadCrl[0]}/pem`;
    } else {
      url = config.pkiReadCrl[0];
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: url,
        method: config.pkiReadCrl[1]
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async readCAChain(mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiReadCAChain[0]}`,
        method: config.pkiReadCAChain[1]
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String<required>} serial
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readCertificate(serial, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiReadCert[0]}/${serial}`,
        method: config.pkiReadCert[1]
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }


  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listCertificates(token, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiListCerts[0]}`,
        method: config.pkiListCerts[1],
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
  * @param {String<required>} token
  * @param {String<required>} pemBundle
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async setCACertificate(token, pemBundle, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiSetCACert[0]}`,
        method: config.pkiSetCACert[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          pem_bundle: pemBundle
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
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readCrlConfig(token, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiReadCrlConf[0]}`,
        method: config.pkiReadCrlConf[1],
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
  * @param {String<required>} token
  * @param {String} expiry
  * @param {Boolean} disable
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async setCrlConfig(token, expiry, disable, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiSetCrlConf[0]}`,
        method: config.pkiSetCrlConf[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          expiry: expiry,
          disable: disable
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
  * @param {String<required} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readPkiUrls(token, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiReadUrls[0]}`,
        method: config.pkiReadUrls[1],
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
  * @param {String<required>} token
  * @param {[String]} issuingCertificates
  * @param {[String]} crlDistributionPoints
  * @param {[String]} oscpServers
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async setPkiUrls(token, issuingCertificates, crlDistributionPoints, oscpServers, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiSetUrls[0]}`,
        method: config.pkiSetUrls[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          issuing_certificates: issuingCertificates,
          crl_distribution_points: crlDistributionPoints,
          ocsp_servers: oscpServers
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
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async rotatePkiCrl(token, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiRotateCrl[0]}`,
        method: config.pkiRotateCrl[1],
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
  * @param {String<required>} sudoToken
  * @param {String<required>: 'internal', 'exported'} params.type
  * @param {String<required>} params.commonName
  * @param {String} params.altNames
  * @param {String} params.ipSans
  * @param {String} params.uriSans
  * @param {String} params.otherSans
  * @param {String} params.ttl
  * @param {String: 'der', 'pem', 'pem_bundle'} params.format
  * @param {String: 'der', 'pkcs8'} params.pkFormat
  * @param {String: 'rsa', 'ec'} params.keyType
  * @param {Integer} params.keyBits
  * @param {Boolean} params.excludeCnFromSans
  * @param {Integer} params.maxPathLength
  * @param {String} params.permittedDnsDomains
  * @param {String} params.ou
  * @param {String} params.organization
  * @param {String} params.country
  * @param {String} params.locality
  * @param {String} params.province
  * @param {String} params.streetAddress
  * @param {String} params.postalCode
  * @param {String} params.serialNumber
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async generateRootCA(sudoToken, params, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    if (params.type === 'exported') {
      url = `${rootPath}/${config.pkiGenerateRoot[0]}/exported`;
    } else {
      url = `${rootPath}/${config.pkiGenerateRoot[0]}/internal`;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: url,
        method: config.pkiGenerateRoot[1],
        headers: {
          "X-Vault-Token": sudoToken
        },
        data: {
          common_name: params.commonName,
          alt_names: params.altNames,
          ip_sans: params.ipSans,
          uri_sans: params.uriSans,
          other_sans: params.otherSans,
          ttl: params.ttl,
          format: params.format,
          private_key_format: params.pkFormat,
          key_type: params.keyType,
          key_bits: params.keyBits,
          max_path_length: params.maxPathLength,
          exclude_cn_from_sans: params.excludeCnFromSans,
          permitted_dns_domains: params.permittedDnsDomains,
          ou: params.ou,
          organization: params.organization,
          country: params.country,
          locality: params.locality,
          province: params.province,
          street_address: params.streetAddress,
          postal_code: params.postalCode,
          serial_number: params.serialNumber
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
  * @param {String<required>} sudoToken
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteRootCA(sudoToken, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiDeleteRoot[0]}`,
        method: config.pkiDeleteRoot[1],
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
  * @param {String<required>} token
  * @param {String<required>: 'internal', 'exported'} params.type
  * @param {String<required>} params.commonName
  * @param {String} params.altNames
  * @param {String} params.ipSans
  * @param {String} params.uriSans
  * @param {String} params.otherSans
  * @param {String: 'der', 'pem', 'pem_bundle'} params.format
  * @param {String: 'der', 'pkcs8'} params.pkFormat
  * @param {String: 'rsa', 'ec'} params.keyType
  * @param {Integer} params.keyBits
  * @param {Boolean} params.excludeCnFromSans
  * @param {String} params.ou
  * @param {String} params.organization
  * @param {String} params.country
  * @param {String} params.locality
  * @param {String} params.province
  * @param {String} params.streetAddress
  * @param {String} params.postalCode
  * @param {String} params.serialNumber
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async genIntermediateCA(token, params, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    if (params.type === 'exported') {
      url = `${rootPath}/${config.pkiGenIntermediate[0]}/exported`;
    } else {
      url = `${rootPath}/${config.pkiGenIntermediate[0]}/internal`;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: url,
        method: config.pkiGenIntermediate[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          common_name: params.commonName,
          alt_names: params.altNames,
          ip_sans: params.ipSans,
          uri_sans: params.uriSans,
          other_sans: params.otherSans,
          format: params.format,
          private_key_format: params.pkFormat,
          key_type: params.keyType,
          key_bits: params.keyBits,
          exclude_cn_from_sans: params.excludeCnFromSans,
          ou: params.ou,
          organization: params.organization,
          country: params.country,
          locality: params.locality,
          province: params.province,
          street_address: params.streetAddress,
          postal_code: params.postalCode,
          serial_number: params.serialNumber
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
  * @param {String<required>} sudoToken
  * @param {String<required>} params.csr
  * @param {String<required>} params.commonName
  * @param {String} params.altNames
  * @param {String} params.ipSans
  * @param {String} params.uriSans
  * @param {String} params.otherSans
  * @param {String} params.ttl
  * @param {String: 'der', 'pem', 'pem_bundle'} params.format
  * @param {Integer} params.maxPathLength
  * @param {Boolean} params.excludeCnFromSans
  * @param {Boolean} params.useCsrValues
  * @param {String} params.permittedDnsDomains
  * @param {String} params.ou
  * @param {String} params.organization
  * @param {String} params.country
  * @param {String} params.locality
  * @param {String} params.province
  * @param {String} params.streetAddress
  * @param {String} params.postalCode
  * @param {String} params.serialNumber
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async signIntermediateCA(sudoToken, params, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiSignIntermediate[0]}`,
        method: config.pkiSignIntermediate[1],
        headers: {
          "X-Vault-Token": sudoToken
        },
        data: {
          csr: params.csr,
          common_name: params.commonName,
          alt_names: params.altNames,
          ip_sans: params.ipSans,
          uri_sans: params.uriSans,
          other_sans: params.otherSans,
          format: params.format || 'pem',
          max_path_length: params.maxPathLength,
          exclude_cn_from_sans: params.excludeCnFromSans,
          use_csr_values: params.useCsrValues,
          permitted_dns_domains: params.permittedDnsDomains,
          ou: params.ou,
          organization: params.organization,
          country: params.country,
          locality: params.locality,
          province: params.province,
          street_address: params.streetAddress,
          postal_code: params.postalCode,
          serial_number: params.serialNumber
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
  * @param {String<required>} token
  * @param {String<required>} certificate
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async setIntermediateCA(token, certificate, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiSetIntermediate[0]}`,
        method: config.pkiSetIntermediate[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          certificate: certificate
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
  * @param {String<required>} token
  * @param {String<required>: 'internal', 'exported'} params.role
  * @param {String<required>} params.commonName
  * @param {String} params.altNames
  * @param {String} params.ipSans
  * @param {String} params.uriSans
  * @param {String} params.otherSans
  * @param {String} params.ttl
  * @param {String: 'der', 'pem', 'pem_bundle'} params.format
  * @param {String: 'der', 'pkcs8'} params.pkFormat
  * @param {Boolean} params.excludeCnFromSans
  * @param {String} mount
  * @returns {Promise<String>}
  */
  async genPkiCertificate(token, params, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiGenerateCertificate[0]}/${params.role}`,
        method: config.pkiGenerateCertificate[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          common_name: params.commonName,
          alt_names: params.altNames,
          ip_sans: params.ipSans,
          uri_sans: params.uriSans,
          other_sans: params.otherSans,
          ttl: params.ttl,
          format: params.format,
          private_key_format: params.pkFormat,
          exclude_cn_from_sans: params.excludeCnFromSans
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
  * @param {String<required>} token
  * @param {String<required>} serialNumber
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async revokePkiCertificate(token, serialNumber, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiRevokeCertificate[0]}`,
        method: config.pkiRevokeCertificate[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          serial_number: serialNumber
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
  * @param {String<required>} token
  * @param {String<required>} params.name
  * @param {String} params.ttl
  * @param {String} params.maxTtl
  * @param {Boolean} params.allowLocalhost
  * @param {[String]} params.allowedDomains
  * @param {Boolean} params.allowedDomainsTemplate
  * @param {Boolean} params.allowBareDomains
  * @param {Boolean} params.allowSubdomains
  * @param {Boolean} params.allowGlobDomains
  * @param {Boolean} params.allowAnyName
  * @param {Boolean} params.enforceHostnames
  * @param {String} params.allowIpSans
  * @param {String} params.allowedUriSans
  * @param {String} params.allowedOtherSans
  * @param {Boolean} params.serverFlag
  * @param {Boolean} params.clientFlag
  * @param {Boolean} params.codeSigningFlag
  * @param {Boolean} params.emailProtectionFlag
  * @param {String: 'rsa', 'ec'} params.keyType
  * @param {Integer} params.keyBits
  * @param {[String]} params.keyUsage
  * @param {[String]} params.externalKeyUsage
  * @param {String} params.extKeyUsageOids
  * @param {Boolean} params.useCsrCommonName
  * @param {Boolean} params.useCsrSans
  * @param {String} params.ou
  * @param {String} params.organization
  * @param {String} params.country
  * @param {String} params.locality
  * @param {String} params.province
  * @param {String} params.streetAddress
  * @param {String} params.postalCode
  * @param {String} params.serialNumber
  * @param {Boolean} params.generateLease
  * @param {Boolean} params.noStore
  * @param {Boolean} params.requireCn
  * @param {[String]} params.policyIdentifiers
  * @param {Boolean} params.basicConstraintsValidForNonCa
  * @param {String} params.notBeforeDuration
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async createPkiRole(token, params, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiCreateRole[0]}/${params.name}`,
        method: config.pkiCreateRole[1],
        headers: {
          "X-Vault-Token": token
        },
        data: {
          ttl: params.ttl,
          max_ttl: params.maxTtl,
          allow_localhost: params.allowLocalhost,
          allowed_domains: params.allowedDomains,
          allowed_domains_template: params.allowedDomainsTemplate,
          allow_bare_domains: params.allowBareDomains,
          allow_subdomains: params.allowSubdomains,
          allow_glob_domains: params.allowGlobDomains,
          allow_any_name: params.allowAnyName,
          enforce_hostnames: params.enforceHostnames,
          allow_ip_sans: params.allowIpSans,
          allowed_uri_sans: params.allowedUriSans,
          allowed_other_sans: params.allowedOtherSans,
          server_flag: params.serverFlag,
          client_flag: params.clientFlag,
          code_signing_flag: params.codeSigningFlag,
          email_protection_flag: params.emailProtectionFlag,
          key_type: params.keyType,
          key_bits: params.keyBits,
          key_usage: params.keyUsage,
          external_key_usage: params.externalKeyUsage,
          ext_key_usage_oids: params.extKeyUsageOids,
          use_csr_common_name: params.useCsrCommonName,
          use_csr_sans: params.useCsrSans,
          ou: params.ou,
          organization: params.organization,
          country: params.country,
          locality: params.locality,
          province: params.province,
          street_address: params.streetAddress,
          postal_code: params.postalCode,
          serial_number: params.serialNumber,
          generate_lease: params.generateLease,
          no_store: params.noStore,
          require_cn: params.requireCn,
          policy_identifiers: params.policyIdentifiers,
          basic_constraints_valid_for_non_ca: params.basicConstraintsValidForNonCa,
          not_before_duration: params.notBeforeDuration
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
  * @param {String<required>} token
  * @param {String<required>} params.name
  * @param {String} params.ttl
  * @param {String} params.maxTtl
  * @param {Boolean} params.allowLocalhost
  * @param {[String]} params.allowedDomains
  * @param {Boolean} params.allowedDomainsTemplate
  * @param {Boolean} params.allowBareDomains
  * @param {Boolean} params.allowSubdomains
  * @param {Boolean} params.allowGlobDomains
  * @param {Boolean} params.allowAnyName
  * @param {Boolean} params.enforceHostnames
  * @param {String} params.allowIpSans
  * @param {String} params.allowedUriSans
  * @param {String} params.allowedOtherSans
  * @param {Boolean} params.serverFlag
  * @param {Boolean} params.clientFlag
  * @param {Boolean} params.codeSigningFlag
  * @param {Boolean} params.emailProtectionFlag
  * @param {String: 'rsa', 'ec'} params.keyType
  * @param {Integer} params.keyBits
  * @param {[String]} params.keyUsage
  * @param {[String]} params.externalKeyUsage
  * @param {String} params.extKeyUsageOids
  * @param {Boolean} params.useCsrCommonName
  * @param {Boolean} params.useCsrSans
  * @param {String} params.ou
  * @param {String} params.organization
  * @param {String} params.country
  * @param {String} params.locality
  * @param {String} params.province
  * @param {String} params.streetAddress
  * @param {String} params.postalCode
  * @param {String} params.serialNumber
  * @param {Boolean} params.generateLease
  * @param {Boolean} params.noStore
  * @param {Boolean} params.requireCn
  * @param {[String]} params.policyIdentifiers
  * @param {Boolean} params.basicConstraintsValidForNonCa
  * @param {String} params.notBeforeDuration
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async updatePkiRole(token, params, mount) {
    return await this.createPkiRole(token, params, mount);
  }


  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readPkiRole(token, name, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiReadRole[0]}/${name}`,
        method: config.pkiReadRole[1],
        headers: {
          "X-Vault-Token": token
        },
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listPkiRoles(token, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiListRoles[0]}`,
        method: config.pkiListRoles[1],
        headers: {
          "X-Vault-Token": token
        },
      };
      this.instance(Options).then(function(response){
        resolve(parseAxiosResponse(response));
      }).catch(function(error){
        reject(parseAxiosError(error));
      });
    });
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deletePkiRole(token, name, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.pkiRootPath;
    }
    return new Promise((resolve, reject) => {
      const Options = {
        url: `${rootPath}/${config.pkiDeleteRole[0]}/${name}`,
        method: config.pkiDeleteRole[1],
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


  //
  // KV secret engine API endpoints
  //

  /**
  * @param {String} token
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
  * @param {[Integer]} versions
  * @returns {Promise<Object>}
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
  * @param {[Integer]} versions
  * @returns {Promise<Object>}
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
  * @param {[Integer]} versions
  * @returns {Promise<Object>}
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
  * @returns {Promise<Object>}
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
