/// <reference types="node" />
export = Vault;
declare class Vault {
    constructor(params: any);
    https: any;
    cert: any;
    key: any;
    cacert: any;
    baseUrl: any;
    rootPath: any;
    timeout: any;
    proxy: any;
    namespace: any;
    agent: boolean | https.Agent;
    instance: any;
    /**
    * @returns {Promise<Object>}
    */
    healthCheck(params: any): Promise<any>;
    /**
    * @returns {Promise<Object>}
    */
    sealStatus(): Promise<any>;
    /**
    * @param {String} sudoToken
    * @returns {Promise<Object>}
    */
    sysHostInfo(sudoToken: string): Promise<any>;
    /**
    * @param {String} sudoToken
    * @param {String} token
    * @param {[String]} paths
    * @returns {Promise<Object>}
    */
    sysCapabilities(sudoToken: string, token: string, paths: [string]): Promise<any>;
    /**
    * @param {String} token
    * @param {[String]} paths
    * @returns {Promise<Object>}
    */
    sysCapabilitiesSelf(token: string, paths: [string]): Promise<any>;
    /**
    * @param {String} sudoToken
    * @param {Const} type
    * @returns {Promise<Object>}
    */
    sysInternalCounters(sudoToken: string, type: Const): Promise<any>;
    /**
    * @param {String} sudoToken
    * @param {Const} type
    * @returns {Promise<Object>}
    */
    sysMetrics(sudoToken: string, format: any): Promise<any>;
    /**
    * @param {String} sudoToken
    * @returns {Promise<Object>}
    */
    sysSeal(sudoToken: string): Promise<any>;
    /**
    * @param {String} sudoToken
    * @param {String} key
    * @param {Boolean} reset
    * @param {Boolean} migrate
    * @returns {Promise<Object>}
    */
    sysUnseal(sudoToken: string, key: string, reset: boolean, migrate: boolean): Promise<any>;
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
    createToken(vaultToken: string, params?: {
        id?: string;
        role_name?: string;
        policies?: string;
        meta?: any;
        no_narent?: boolean;
        no_default_policy?: boolean;
        renewable?: boolean;
        ttl?: string;
        type?: string;
        explicit_max_ttl?: string;
        display_name?: string;
        num_uses?: Integer;
        period?: string;
        entity_alias?: string;
    }): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} clientToken
    * @returns {Promise<Object>}
    */
    revokeToken(vaultToken: string, clientToken: string): Promise<any>;
    /**
    * @param {String} clientToken
    * @returns {Promise<Object>}
    */
    revokeSelfToken(clientToken: string): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} clientToken
    * @returns {Promise<Object>}
    */
    lookupToken(vaultToken: string, clientToken: string): Promise<any>;
    /**
    * @param {String} clientToken
    * @returns {Promise<Object>}
    */
    lookupSelfToken(clientToken: string): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} clientToken
    * @param {String} increment
    * @returns {Promise<Object>}
    */
    renewToken(vaultToken: string, clientToken: string, increment: string): Promise<any>;
    /**
    * @param {String} clientToken
    * @param {String} increment
    * @returns {Promise<Object>}
    */
    renewSelfToken(clientToken: string, increment: string): Promise<any>;
    /**
    * @param {String} sudoToken
    * @returns {Promise<Object>}
    */
    listAccessors(sudoToken: string): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} accessor
    * @returns {Promise<Object>}
    */
    lookupAccessor(vaultToken: string, accessor: string): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} accessor
    * @param {String} increment
    * @returns {Promise<Object>}
    */
    renewAccessor(vaultToken: string, accessor: string, increment: string): Promise<any>;
    /**
    * @param {String} vaultToken
    * @param {String} accessor
    * @returns {Promise<Object>}
    */
    revokeAccessor(vaultToken: string, accessor: string): Promise<any>;
    /**
    * @param {String<required>} username
    * @param {String<required>} password
    * @param {String} mount
    * @returns {Object}
    */
    loginWithLdap(username: string, password: string, mount: string): any;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {[String]<required>} policies
    * @param {String<required>} groups
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    createLdapUser(token: string, username: string, policies: any, groups: string, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {[String]<required>} policies
    * @param {String<required>} groups
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    updateLdapUser(token: string, username: string, policies: any, groups: string, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String<required>} group
    * @param {[String]<required>} policies
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    createLdapGroup(token: string, group: string, policies: any, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String<required>} group
    * @param {[String]<required>} policies
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    updateLdapGroup(token: string, group: string, policies: any, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String<required>} group
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readLdapGroup(token: string, group: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readLdapUser(token: string, username: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listLdapUsers(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listLdapGroups(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteLdapUser(token: string, username: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} group
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteLdapGroup(token: string, group: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readLdapConfig(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @param {String} params.url
    * @param {Boolean} params.case_sensitive_names
    * @param {Integer} params.request_timeout
    * @param {Boolean} params.starttls
    * @param {String} params.tls_min_version
    * @param {String} params.tls_max_version
    * @param {Boolean} params.insecure_tls
    * @param {String} params.certificate
    * @param {String} params.client_tls_cert
    * @param {String} params.client_tls_key
    * @param {String} params.binddn
    * @param {String} params.bindpass
    * @param {String} params.userdn
    * @param {String} params.userattr
    * @param {Boolean} params.discoverdn
    * @param {Boolean} params.deny_null_bind
    * @param {String} params.upndomain
    * @param {String} params.userfilter
    * @param {Boolean} params.anonymous_group_search
    * @param {String} params.groupfilter
    * @param {String} params.groupdn
    * @param {String} params.groupattr
    * @param {Boolean} params.username_as_alias
    * @param {Integer} params.token_ttl
    * @param {Integer} params.token_max_ttl
    * @param {[String]} params.token_policies
    * @param {[String]} params.token_bound_cidrs
    * @param {Integer} params.token_explicit_max_ttl
    * @param {Boolean} params.token_no_default_policy
    * @param {Integer} params.token_num_uses
    * @param {Integer} params.token_period
    * @param {String} params.token_type
    * @returns {Promise<Object>}
    */
    setLdapConfig(token: string, params: any, mount: string): Promise<any>;
    /**
    * @param {String} mount
    * @param {String} certName
    * @returns {Promise<Object>}
    */
    loginWithCert(certName: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} username
    * @param {String<required>} password
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    loginWithUserpass(username: string, password: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String<required>} password
    * @param {[String]<required>} policies
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    createUserpassUser(token: string, username: string, password: string, policies: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String<required>} password
    * @param {[String]<required>} policies
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    updateUserpassUser(token: string, username: string, password: string, policies: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readUserpassUser(token: string, username: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteUserpassUser(token: string, username: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {String<required>} password
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    updateUserpassPassword(token: string, username: string, password: string, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String<required>} username
    * @param {[String]<required>} policies
    * @param {String} mount
    * @returns {Promise<Oject>}
    */
    updateUserpassPolicies(token: string, username: string, policies: any, mount: string): Promise<Oject>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listUserpassUsers(token: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} role
     * @param {String<required>} jwt
     * @param {String} mount
     * @returns {Object}
     */
    loginWithK8s(role: string, jwt: string, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {Object<required>} params
     * @param {String} params.kubernetes_host
     * @param {String} params.kubernetes_ca_cert
     * @param {String} params.token_reviewer_jwt
     * @param {Object} [params.pem_keys]
     * @param {String} params.issuer
     * @param {Boolean} params.disable_iss_validation
     * @param {Boolean} params.disable_local_ca_jwt
     * @param {String} mount
     * @returns {Object}
     */
    updateK8sConfig(token: string, params: any, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Object}
     */
    readK8sConfig(token: string, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {String<required>} role
     * @param {Object<required>} params
     * @param {Object} [params.bound_service_account_names]
     * @param {Object} [params.bound_service_account_namespaces]
     * @param {String} params.audience
     * @param {Integer or String} params.token_ttl
     * @param {Integer or String} params.token_max_ttl
     * @param {Object} [params.token_policies]
     * @param {Object} [params.token_bound_cidrs]
     * @param {Integer or String} params.token_explicit_max_ttl
     * @param {Boolean} params.token_no_default_policy
     * @param {Integer} params.token_num_uses
     * @param {Integer or String} params.token_period
     * @param {String} params.token_type
     * @param {String} mount
     * @returns {Object}
     */
    createK8sRole(token: string, role: string, params: any, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {String<required>} role
     * @param {String} mount
     * @returns {Object}
     */
    readK8sRole(token: string, role: string, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Object}
     */
    listK8sRoles(token: string, mount: string): any;
    /**
     * @param {String<required>} token
     * @param {String<required>} role
     * @param {String} mount
     * @returns {Object}
     */
    deleteK8sRole(token: string, role: string, mount: string): any;
    /**
    * @param {String<required>} roleId
    * @param {String<required>} secretId
    * @param {String} mount
    * @returns {Object}
    */
    loginWithAppRole(roleId: string, secretId: string, mount: string): any;
    /**
    * @param {String<required>} token
    * @param {String<required>} appRole
    * @param {String} metadata
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    generateAppRoleSecretId(token: string, appRole: string, metadata: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} appRole
    * @param {String<required>} secretId
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readAppRoleSecretId(token: string, appRole: string, secretId: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} appRole
    * @param {String<required>} secretId
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    destroyAppRoleSecretId(token: string, appRole: string, secretId: string, mount: string): Promise<any>;
    /**
    * @param {String: 'der', 'pem'} format
    * @param {String} mount
    * @returns {Promise<String>}
    */
    readCACertificate(format: any, mount: string): Promise<string>;
    /**
    * @param {String: 'der', 'pem'} format
    * @param {String} mount
    * @returns {Promise<String>}
    */
    readPkiCrl(format: any, mount: string): Promise<string>;
    /**
    * @param {String} mount
    * @returns {Promise<String>}
    */
    readCAChain(mount: string): Promise<string>;
    /**
    * @param {String<required>} serial
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readCertificate(serial: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listCertificates(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} pemBundle
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    setCACertificate(token: string, pemBundle: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readCrlConfig(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} expiry
    * @param {Boolean} disable
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    setCrlConfig(token: string, expiry: string, disable: boolean, mount: string): Promise<any>;
    /**
    * @param {String<required} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readPkiUrls(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {[String]} issuingCertificates
    * @param {[String]} crlDistributionPoints
    * @param {[String]} oscpServers
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    setPkiUrls(token: string, issuingCertificates: [string], crlDistributionPoints: [string], oscpServers: [string], mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    rotatePkiCrl(token: string, mount: string): Promise<any>;
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
    generateRootCA(sudoToken: string, params: any, mount: string): Promise<string>;
    /**
    * @param {String<required>} sudoToken
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteRootCA(sudoToken: string, mount: string): Promise<any>;
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
    genIntermediateCA(token: string, params: any, mount: string): Promise<string>;
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
    signIntermediateCA(sudoToken: string, params: any, mount: string): Promise<string>;
    /**
    * @param {String<required>} token
    * @param {String<required>} certificate
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    setIntermediateCA(token: string, certificate: string, mount: string): Promise<any>;
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
    genPkiCertificate(token: string, params: any, mount: string): Promise<string>;
    /**
    * @param {String<required>} token
    * @param {String<required>} serialNumber
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    revokePkiCertificate(token: string, serialNumber: string, mount: string): Promise<any>;
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
    createPkiRole(token: string, params: any, mount: string): Promise<any>;
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
    updatePkiRole(token: string, params: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readPkiRole(token: string, name: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listPkiRoles(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deletePkiRole(token: string, name: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {Integer} params.ttl
     * @param {Integer} params.max_ttl
     * @param {String} params.password_policy
     * @param {String} params.url
     * @param {String} params.request_timeout
     * @param {Boolean} params.starttls
     * @param {Boolean} params.insecure_tls
     * @param {String} params.certificate
     * @param {String<required>} params.binddn
     * @param {String<required>} params.bindpass
     * @param {String} params.userdn
     * @param {String} params.upndomain
     * @param {String} params.last_rotation_tolerance
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    setADConfig(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {Integer} params.ttl
     * @param {Integer} params.max_ttl
     * @param {String} params.password_policy
     * @param {String} params.url
     * @param {String} params.request_timeout
     * @param {Boolean} params.starttls
     * @param {Boolean} params.insecure_tls
     * @param {String} params.certificate
     * @param {String<required>} params.binddn
     * @param {String<required>} params.bindpass
     * @param {String} params.userdn
     * @param {String} params.upndomain
     * @param {String} params.last_rotation_tolerance
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    updateADConfig(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    readADConfig(token: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    deleteADConfig(token: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    listADRoles(token: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String<required>} params.service_account_name
     * @param {String} params.ttl
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    createADRole(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String<required>} params.service_account_name
     * @param {String} params.ttl
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    updateADRole(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} roleName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    readADRole(token: string, roleName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} roleName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    deleteADRole(token: string, roleName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} roleName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    getADRoleCred(token: string, roleName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} roleName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    rotateADRoleCred(token: string, roleName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    listADLibraries(token: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} setName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    readADLibrary(token: string, setName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String[]<required>} params.service_account_names
     * @param {String} params.ttl
     * @param {String} params.max_ttl
     * @param {Boolean} params.disable_check_in_enforcement
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    createADLibrary(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String[]<required>} params.service_account_names
     * @param {String} params.ttl
     * @param {String} params.max_ttl
     * @param {Boolean} params.disable_check_in_enforcement
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    updateADLibrary(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} setName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    deleteADLibrary(token: string, setName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String} params.ttl
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    checkADCredOut(token: string, params: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} params.name
     * @param {String[]} params.service_account_names
     * @param {Boolean} forceMode
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    checkADCredIn(token: string, params: any, forceMode: boolean, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} setName
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    getADCredSatus(token: string, setName: string, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {Object<required>} data
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    updateKVEngineConfig(token: string, data: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readKVEngineConfig(token: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {Object<required>} secrets
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    createKVSecret(token: string, name: string, secrets: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {Object<required>} secrets
    * @param {Integer<required>} version
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    updateKVSecret(token: string, name: string, secrets: any, version: Integer<required>, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {Integer} version
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    readKVSecret(token: string, name: string, version: Integer, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteLatestVerKVSecret(token: string, name: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {[Integer]<required>} versions
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    deleteVersionsKVSecret(token: string, name: string, versions: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {[Integer]<required>} versions
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    undeleteVersionsKVSecret(token: string, name: string, versions: any, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String<required>} name
    * @param {[Integer]<required>} versions
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    destroyVersionsKVSecret(token: string, name: string, versions: any, mount: string): Promise<any>;
    /**
     * @param {String<required>} token
     * @param {String<required>} name
     * @param {String} mount
     * @returns {Promise<Object>}
     */
    eliminateKVSecret(token: string, name: string, mount: string): Promise<any>;
    /**
    * @param {String<required>} token
    * @param {String} folder
    * @param {String} mount
    * @returns {Promise<Object>}
    */
    listKVSecrets(token: string, folder: string, mount: string): Promise<any>;
}
import https = require("https");
//# sourceMappingURL=Vault.d.ts.map