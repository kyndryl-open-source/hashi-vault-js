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
const assert = require('assert');

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
  let helpMessage = "";
  // Fix the stack
  // passing parseAxiosError as the second param will leave this function out of the trace
  Error.captureStackTrace(error, parseAxiosError);
  // Verify if it's a Vault error
  // https://www.vaultproject.io/api-docs#error-response
  if (error.response && error.response.status) {
    error.isVaultError = true;
    switch(error.response.status){
        case 400:
          helpMessage = "Invalid request, missing or invalid data.";
          break;
        case 403:
          helpMessage = "Forbidden, your authentication details are either incorrect, you don't have access to this feature, or - if CORS is enabled - you made a cross-origin request from an origin that is not allowed to make such requests.";
          break;
        case 404:
          helpMessage = "Invalid path. This can both mean that the path truly doesn't exist or that you don't have permission to view a specific path. We use 404 in some cases to avoid state leakage.";
          break;
        case 429:
          helpMessage = "Default return code for health status of standby nodes. This will likely change in the future.";
          break;
        case 473:
          helpMessage = "Default return code for health status of performance standby nodes.";
          break;
        case 500:
          helpMessage = "Internal server error. An internal error has occurred, try again later. If the error persists, report a bug.";
          break;
        case 502:
          helpMessage = "A request to Vault required Vault making a request to a third party; the third party responded with an error of some kind.";
          break;
        case 503:
          helpMessage = "Vault is down for maintenance or is currently sealed. Unseal it or Try again later.";
          break;
        default:
          helpMessage = "Unkown error code or helper is not implemented yet.";
    }
    error.vaultHelpMessage = helpMessage;
  }
  return error;
}

// main class constructor
class Vault {
  constructor(params) {
    this.https = params.https || false;
    this.cert = params.cert;
    this.key = params.key;
    this.cacert = params.cacert;
    this.baseUrl = params.baseUrl || config.baseUrl;
    this.rootPath = params.rootPath;
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
    const Options = {
      url: config.sysHealth,
      method: 'get'
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @returns {Promise<Object>}
  */
  async sealStatus(){
    const Options = {
      url: config.sysSealStatus,
      method: 'get'
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise<Object>}
  */
  async sysHostInfo(sudoToken){
    const Options = {
      url: config.sysHostInfo,
      method: 'get',
      headers: {
        "X-Vault-Token": sudoToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @param {String} token
  * @param {[String]} paths
  * @returns {Promise<Object>}
  */
  async sysCapabilities(sudoToken, token, paths){
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} token
  * @param {[String]} paths
  * @returns {Promise<Object>}
  */
  async sysCapabilitiesSelf(token, paths){
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @param {Const} type
  * @returns {Promise<Object>}
  */
  async sysInternalCounters(sudoToken, type) {
    let message = {};
    if (config.sysCounterTypes.includes(type)) {
      const Options = {
        url: `${config.sysInternalCounters}/${type}`,
        method: 'get',
        headers: {
          "X-Vault-Token": sudoToken
        }
      };

      try {
        const response = await this.instance(Options);
        return parseAxiosResponse(response);
      } catch(err) {
        throw parseAxiosError(err);
      }

    } else {
      message['status']= 400;
      message['statusText'] = 'Bad request: Counter type error';
      reject(new Error(message));
    }
  }

  /**
  * @param {String} sudoToken
  * @param {Const} type
  * @returns {Promise<Object>}
  */
  async sysMetrics(sudoToken, format){
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise<Object>}
  */
  async sysSeal(sudoToken){
    const Options = {
      url: config.sysSeal,
      method: 'put',
      headers: {
        "X-Vault-Token": sudoToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @param {String} key
  * @param {Boolean} reset
  * @param {Boolean} migrate
  * @returns {Promise<Object>}
  */
  async sysUnseal(sudoToken, key, reset, migrate){
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }


  //
  // Token auth method API endpoints
  // The token method is built-in and automatically available at /auth/token.
  //

  /**
  * @param {String} vaultToken
  * @param {Object} [params]
  * @param {String} [params.id]
  * @param {String} [params.role_name]
  * @param {String} [params.policies]
  * @param {Object} [params.meta]
  * @param {Boolean} [params.no_narent=false]
  * @param {Boolean} [params.no_default_policy=false]
  * @param {Boolean} [params.renewable=true]
  * @param {String} [params.ttl]
  * @param {String} [params.type=service]
  * @param {String} [params.explicit_max_ttl]
  * @param {String} [params.display_name]
  * @param {Integer} [params.num_uses]
  * @param {String} [params.period]
  * @param {String} [params.entity_alias]
  * @returns {Promise<Object>}
  */

  async createToken(vaultToken, params) {
    assert(vaultToken, 'createToken: required parameter missing: vaultToken');

    // Defaults - most are probably already defaults from Vault itself
    params = {
      no_parent: false,
      no_default_policy: false,
      renewable: true,
      type: 'service',
      // display_name: '',

      ...params
    };

    const { id, role_name, policies, meta, no_parent,
      no_default_policy, renewable, ttl, type, explicit_max_ttl, display_name,
      num_uses, period, entity_alias } = params;

    const url = role_name ? `${config.tokenCreate}/${role_name}` : config.tokenCreate;

    const Options = {
      url,
      method: 'post',
      headers: {
        "X-Vault-Token": vaultToken
      },
      data: {
        id, policies, meta, no_parent,
        no_default_policy, renewable, ttl, type, explicit_max_ttl, display_name,
        num_uses, period, entity_alias
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @returns {Promise<Object>}
  */
  async revokeToken(vaultToken, clientToken) {
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} clientToken
  * @returns {Promise<Object>}
  */
  async revokeSelfToken(clientToken) {
    const Options = {
      url: config.tokenRevokeSelf,
      method: 'post',
      headers: {
        "X-Vault-Token": clientToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @returns {Promise<Object>}
  */
  async lookupToken(vaultToken, clientToken) {
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} clientToken
  * @returns {Promise<Object>}
  */
  async lookupSelfToken(clientToken) {
    const Options = {
      url: config.tokenLookupSelf,
      method: 'get',
      headers: {
        "X-Vault-Token": clientToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} clientToken
  * @param {String} increment
  * @returns {Promise<Object>}
  */
  async renewToken(vaultToken, clientToken, increment) {
    const Options = {
      url: config.tokenRenew,
      method: 'post',
      headers: {
        "X-Vault-Token": vaultToken
      },
      data: {
        token: clientToken,
        increment: increment
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} clientToken
  * @param {String} increment
  * @returns {Promise<Object>}
  */
  async renewSelfToken(clientToken, increment) {
    const Options = {
      url: config.tokenRenewSelf,
      method: 'post',
      headers: {
        "X-Vault-Token": clientToken
      },
      data: {
        increment: increment
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} sudoToken
  * @returns {Promise<Object>}
  */
  async listAccessors(sudoToken) {
    const Options = {
      url: config.tokenListAccessors,
      method: 'list',
      headers: {
        "X-Vault-Token": sudoToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @returns {Promise<Object>}
  */
  async lookupAccessor(vaultToken, accessor) {
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @param {String} increment
  * @returns {Promise<Object>}
  */
  async renewAccessor(vaultToken, accessor, increment) {
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String} vaultToken
  * @param {String} accessor
  * @returns {Promise<Object>}
  */
  async revokeAccessor(vaultToken, accessor) {
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  //
  // ldap auth method API endpoints
  //

  /**
  * @param {String<required>} username
  * @param {String<required>} password
  * @param {String} mount
  * @returns {Object}
  */
  async loginWithLdap(username, password, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapLogin[0]}/${username}`,
      method: config.ldapLogin[1],
      data: {
        password: password
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {[String]<required>} policies
  * @param {String<required>} groups
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async createLdapUser(token, username, policies, groups, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapCreateUser[0]}/${username}`,
      method: config.ldapCreateUser[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        policies: policies,
        groups: groups
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {[String]<required>} policies
  * @param {String<required>} groups
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async updateLdapUser(token, username, policies, groups, mount) {
    return await this.createLdapUser(token, username, policies, groups, mount);
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} group
  * @param {[String]<required>} policies
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async createLdapGroup(token, group, policies, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapCreateGroup[0]}/${group}`,
      method: config.ldapCreateGroup[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        policies: policies
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} group
  * @param {[String]<required>} policies
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async updateLdapGroup(token, group, policies, mount) {
    return await this.createLdapGroup(token, group, policies, mount);
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} group
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readLdapGroup(token, group, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapReadGroup[0]}/${group}`,
      method: config.ldapReadGroup[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readLdapUser(token, username, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapReadUser[0]}/${username}`,
      method: config.ldapReadUser[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listLdapUsers(token, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapListUsers[0]}`,
      method: config.ldapListUsers[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listLdapGroups(token, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapListGroups[0]}`,
      method: config.ldapListGroups[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteLdapUser(token, username, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapDeleteUser[0]}/${username}`,
      method: config.ldapDeleteUser[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} group
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteLdapGroup(token, group, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.ldapRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.ldapDeleteGroup[0]}/${group}`,
      method: config.ldapDeleteGroup[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }


  //
  // Userpass auth method API endpoints
  //

  /**
  * @param {String<required>} username
  * @param {String<required>} password
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async loginWithUserpass(username, password, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassLogin[0]}/${username}`,
      method: config.userpassLogin[1],
      data: {
        password: password
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String<required>} password
  * @param {[String]<required>} policies
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async createUserpassUser(token, username, password, policies, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassCreateUser[0]}/${username}`,
      method: config.userpassCreateUser[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        policies: policies,
        password: password
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String<required>} password
  * @param {[String]<required>} policies
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async updateUserpassUser(token, username, password, policies, mount) {
    return await this.createUserpassUser(token, username, password, policies, mount);
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readUserpassUser(token, username, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassReadUser[0]}/${username}`,
      method: config.userpassReadUser[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteUserpassUser(token, username, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassDeleteUser[0]}/${username}`,
      method: config.userpassDeleteUser[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {String<required>} password
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async updateUserpassPassword(token, username, password, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassUpdatePass[0]}/${username}/password`,
      method: config.userpassUpdatePass[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        password: password
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} username
  * @param {[String]<required>} policies
  * @param {String} mount
  * @returns {Promise<Oject>}
  */
  async updateUserpassPolicies(token, username, policies, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassUpdatePolicies[0]}/${username}/policies`,
      method: config.userpassUpdatePolicies[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        policies: policies
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listUserpassUsers(token, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.userpassRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.userpassListUsers[0]}`,
      method: config.userpassListUsers[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }



  //
  // AppRole auth method API endpoints
  //

  /**
  * @param {String<required>} roleId
  * @param {String<required>} secretId
  * @param {String} mount
  * @returns {Object}
  */
  async loginWithAppRole(roleId, secretId, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.appRoleRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.appRoleLogin[0]}`,
      method: config.appRoleLogin[1],
      data: {
        role_id: roleId,
        secret_id: secretId
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} appRole
  * @param {String} metadata
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async generateAppRoleSecretId(token, appRole, metadata, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.appRoleRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.appRoleCreateSecret[0]}/${appRole}/${config.appRoleCreateSecret[1]}`,
      method: config.appRoleCreateSecret[2],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        metadata: metadata
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} appRole
  * @param {String<required>} secretId
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readAppRoleSecretId(token, appRole, secretId, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.appRoleRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.appRoleReadSecret[0]}/${appRole}/${config.appRoleReadSecret[1]}`,
      method: config.appRoleReadSecret[2],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        secret_id: secretId
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} appRole
  * @param {String<required>} secretId
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async destroyAppRoleSecretId(token, appRole, secretId, mount) {
    let rootPath= "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.appRoleRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.appRoleDestroySecret[0]}/${appRole}/${config.appRoleDestroySecret[1]}`,
      method: config.appRoleDestroySecret[2],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        secret_id: secretId
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: url,
      method: config.pkiReadCACert[1]
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: url,
      method: config.pkiReadCrl[1]
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiReadCAChain[0]}`,
      method: config.pkiReadCAChain[1]
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiReadCert[0]}/${serial}`,
      method: config.pkiReadCert[1]
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiListCerts[0]}`,
      method: config.pkiListCerts[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiReadCrlConf[0]}`,
      method: config.pkiReadCrlConf[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiReadUrls[0]}`,
      method: config.pkiReadUrls[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiRotateCrl[0]}`,
      method: config.pkiRotateCrl[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiDeleteRoot[0]}`,
      method: config.pkiDeleteRoot[1],
      headers: {
        "X-Vault-Token": sudoToken
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiReadRole[0]}/${name}`,
      method: config.pkiReadRole[1],
      headers: {
        "X-Vault-Token": token
      },
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiListRoles[0]}`,
      method: config.pkiListRoles[1],
      headers: {
        "X-Vault-Token": token
      },
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
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
    const Options = {
      url: `${rootPath}/${config.pkiDeleteRole[0]}/${name}`,
      method: config.pkiDeleteRole[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }


  //
  // KV secret engine API endpoints
  //

  /**
  * @param {String<required>} token
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readKVEngineConfig(token, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvReadEngine[0]}`,
      method: config.kvReadEngine[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {Object<required>} secrets
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async createKVSecret(token, name, secrets, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvCreateSecret[0]}/${name}`,
      method: config.kvCreateSecret[1],
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

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {Object<required>} secrets
  * @param {Integer<required>} version
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async updateKVSecret(token, name, secrets, version, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvUpdateSecret[0]}/${name}`,
      method: config.kvUpdateSecret[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        options: {
          cas: version
        },
        data: secrets
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      console.log(err.response);
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {Integer} version
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async readKVSecret(token, name, version, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const suffix = version ? `?version=${version}` : "";
    const Options = {
      url: `${rootPath}/${config.kvReadSecret[0]}/${name}${suffix}`,
      method: config.kvReadSecret[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteLatestVerKVSecret(token, name, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvDeleteLatestSecret[0]}/${name}`,
      method: config.kvDeleteLatestSecret[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {[Integer]<required>} versions
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async deleteVersionsKVSecret(token, name, versions, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvDeleteSecret[0]}/${name}`,
      method: config.kvDeleteSecret[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        versions: versions
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {[Integer]<required>} versions
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async undeleteVersionsKVSecret(token, name, versions, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvUndeleteSecret[0]}/${name}`,
      method: config.kvUndeleteSecret[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        versions: versions
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String<required>} name
  * @param {[Integer]<required>} versions
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async destroyVersionsKVSecret(token, name, versions, mount) {
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    const Options = {
      url: `${rootPath}/${config.kvDestroySecret[0]}/${name}`,
      method: config.kvDestroySecret[1],
      headers: {
        "X-Vault-Token": token
      },
      data: {
        versions: versions
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  /**
  * @param {String<required>} token
  * @param {String} folder
  * @param {String} mount
  * @returns {Promise<Object>}
  */
  async listKVSecrets(token, folder, mount) {
    let url = "";
    let rootPath = "";
    if (mount) {
      rootPath = mount;
    } else if (this.rootPath) {
      rootPath = this.rootPath;
    } else {
      rootPath = config.kvRootPath;
    }
    if (folder) {
      url = `${rootPath}/${config.kvListSecrets[0]}/${folder}`;
    } else {
      url = `${rootPath}/${config.kvListSecrets[0]}`;
    }
    const Options = {
      url: url,
      method: config.kvListSecrets[1],
      headers: {
        "X-Vault-Token": token
      }
    };

    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

}

module.exports = Vault;
