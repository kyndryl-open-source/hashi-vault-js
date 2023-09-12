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
    * @returns {PromiseLike<Object>}
    */
    healthCheck(params: any): PromiseLike<any>;
    /**
    * @returns {PromiseLike<Object>}
    */
    sealStatus(): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    sysHostInfo(sudoToken: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @param {string} token
    * @param {string[]} paths
    * @returns {PromiseLike<Object>}
    */
    sysCapabilities(sudoToken: string, token: string, paths: string[]): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string[]} paths
    * @returns {PromiseLike<Object>}
    */
    sysCapabilitiesSelf(token: string, paths: string[]): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @param {string} type
    * @returns {PromiseLike<Object>}
    */
    sysInternalCounters(sudoToken: string, type: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @param {string} [format]
    * @returns {PromiseLike<Object>}
    */
    sysMetrics(sudoToken: string, format?: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    sysSeal(sudoToken: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @param {string} key
    * @param {boolean} reset
    * @param {boolean} migrate
    * @returns {PromiseLike<Object>}
    */
    sysUnseal(sudoToken: string, key: string, reset: boolean, migrate: boolean): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {Object} [params]
    * @param {string} [params.id]
    * @param {string} [params.role_name]
    * @param {string} [params.policies]
    * @param {Object} [params.meta]
    * @param {boolean} [params.no_narent=false]
    * @param {boolean} [params.no_default_policy=false]
    * @param {boolean} [params.renewable=true]
    * @param {string} [params.ttl]
    * @param {string} [params.type=service]
    * @param {string} [params.explicit_max_ttl]
    * @param {string} [params.display_name]
    * @param {number} [params.num_uses]
    * @param {string} [params.period]
    * @param {string} [params.entity_alias]
    * @returns {PromiseLike<Object>}
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
        num_uses?: number;
        period?: string;
        entity_alias?: string;
    }): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    revokeToken(vaultToken: string, clientToken: string): PromiseLike<any>;
    /**
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    revokeSelfToken(clientToken: string): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    lookupToken(vaultToken: string, clientToken: string): PromiseLike<any>;
    /**
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    lookupSelfToken(clientToken: string): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewToken(vaultToken: string, clientToken: string, increment: string): PromiseLike<any>;
    /**
    * @param {string} clientToken
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewSelfToken(clientToken: string, increment: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    listAccessors(sudoToken: string): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @returns {PromiseLike<Object>}
    */
    lookupAccessor(vaultToken: string, accessor: string): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewAccessor(vaultToken: string, accessor: string, increment: string): PromiseLike<any>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @returns {PromiseLike<Object>}
    */
    revokeAccessor(vaultToken: string, accessor: string): PromiseLike<any>;
    /**
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {Object}
    */
    loginWithLdap(username: string, password: string, mount?: string): any;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} groups
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} groups
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createLdapGroup(token: string, group: string, policies: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateLdapGroup(token: string, group: string, policies: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapGroup(token: string, group: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapUser(token: string, username: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listLdapUsers(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listLdapGroups(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLdapUser(token: string, username: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLdapGroup(token: string, group: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapConfig(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @param {Object} [params]
    * @param {string} params.url
    * @param {boolean} params.case_sensitive_names
    * @param {number} params.request_timeout
    * @param {boolean} params.starttls
    * @param {string} params.tls_min_version
    * @param {string} params.tls_max_version
    * @param {boolean} params.insecure_tls
    * @param {string} params.certificate
    * @param {string} params.client_tls_cert
    * @param {string} params.client_tls_key
    * @param {string} params.binddn
    * @param {string} params.bindpass
    * @param {string} params.userdn
    * @param {string} params.userattr
    * @param {boolean} params.discoverdn
    * @param {boolean} params.deny_null_bind
    * @param {string} params.upndomain
    * @param {string} params.userfilter
    * @param {boolean} params.anonymous_group_search
    * @param {string} params.groupfilter
    * @param {string} params.groupdn
    * @param {string} params.groupattr
    * @param {boolean} params.username_as_alias
    * @param {number} params.token_ttl
    * @param {number} params.token_max_ttl
    * @param {string[]} params.token_policies
    * @param {string[]} params.token_bound_cidrs
    * @param {number} params.token_explicit_max_ttl
    * @param {boolean} params.token_no_default_policy
    * @param {number} params.token_num_uses
    * @param {number} params.token_period
    * @param {string} params.token_type
    * @returns {PromiseLike<Object>}
    */
    setLdapConfig(token: string, params?: {
        url: string;
        case_sensitive_names: boolean;
        request_timeout: number;
        starttls: boolean;
        tls_min_version: string;
        tls_max_version: string;
        insecure_tls: boolean;
        certificate: string;
        client_tls_cert: string;
        client_tls_key: string;
        binddn: string;
        bindpass: string;
        userdn: string;
        userattr: string;
        discoverdn: boolean;
        deny_null_bind: boolean;
        upndomain: string;
        userfilter: string;
        anonymous_group_search: boolean;
        groupfilter: string;
        groupdn: string;
        groupattr: string;
        username_as_alias: boolean;
        token_ttl: number;
        token_max_ttl: number;
        token_policies: string[];
        token_bound_cidrs: string[];
        token_explicit_max_ttl: number;
        token_no_default_policy: boolean;
        token_num_uses: number;
        token_period: number;
        token_type: string;
    }, mount?: string): PromiseLike<any>;
    /**
    * @param {string} [mount]
    * @param {string} certName
    * @returns {PromiseLike<Object>}
    */
    loginWithCert(certName: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    loginWithUserpass(username: string, password: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readUserpassUser(token: string, username: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteUserpassUser(token: string, username: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassPassword(token: string, username: string, password: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassPolicies(token: string, username: string, policies: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listUserpassUsers(token: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} role
     * @param {string} jwt
     * @param {string} [mount]
     * @returns {Object}
     */
    loginWithK8s(role: string, jwt: string, mount?: string): any;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.kubernetes_host
     * @param {string} params.kubernetes_ca_cert
     * @param {string} params.token_reviewer_jwt
     * @param {Object} [params.pem_keys]
     * @param {string} params.issuer
     * @param {boolean} params.disable_iss_validation
     * @param {boolean} params.disable_local_ca_jwt
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateK8sConfig(token: string, params: {
        kubernetes_host: string;
        kubernetes_ca_cert: string;
        token_reviewer_jwt: string;
        pem_keys?: any;
        issuer: string;
        disable_iss_validation: boolean;
        disable_local_ca_jwt: boolean;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {Object}
     */
    readK8sConfig(token: string, mount?: string): any;
    /**
     * @param {string} token
     * @param {string} role
     * @param {Object} params
     * @param {Object} [params.bound_service_account_names]
     * @param {Object} [params.bound_service_account_namespaces]
     * @param {string} params.audience
     * @param {number | string} params.token_ttl
     * @param {number | string} params.token_max_ttl
     * @param {Object} [params.token_policies]
     * @param {Object} [params.token_bound_cidrs]
     * @param {number | string} params.token_explicit_max_ttl
     * @param {boolean} params.token_no_default_policy
     * @param {number} params.token_num_uses
     * @param {number | string} params.token_period
     * @param {string} params.token_type
     * @param {string} [mount]
     * @returns {Object}
     */
    createK8sRole(token: string, role: string, params: {
        bound_service_account_names?: any;
        bound_service_account_namespaces?: any;
        audience: string;
        token_ttl: number | string;
        token_max_ttl: number | string;
        token_policies?: any;
        token_bound_cidrs?: any;
        token_explicit_max_ttl: number | string;
        token_no_default_policy: boolean;
        token_num_uses: number;
        token_period: number | string;
        token_type: string;
    }, mount?: string): any;
    /**
     * @param {string} token
     * @param {string} role
     * @param {string} [mount]
     * @returns {Object}
     */
    readK8sRole(token: string, role: string, mount?: string): any;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {Object}
     */
    listK8sRoles(token: string, mount?: string): any;
    /**
     * @param {string} token
     * @param {string} role
     * @param {string} [mount]
     * @returns {Object}
     */
    deleteK8sRole(token: string, role: string, mount?: string): any;
    /**
    * @param {string} roleId
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {Object}
    */
    loginWithAppRole(roleId: string, secretId: string, mount?: string): any;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} [metadata]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    generateAppRoleSecretId(token: string, appRole: string, metadata?: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    destroyAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} format - certificate format either 'der' or 'pem'
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readCACertificate(format: string, mount?: string): PromiseLike<string>;
    /**
    * @param {string} format - certificate format either 'der' or 'pem'
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readPkiCrl(format: string, mount?: string): PromiseLike<string>;
    /**
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readCAChain(mount?: string): PromiseLike<string>;
    /**
    * @param {string} serial
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readCertificate(serial: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listCertificates(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} pemBundle
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setCACertificate(token: string, pemBundle: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readCrlConfig(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [expiry]
    * @param {boolean} [disable]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setCrlConfig(token: string, expiry?: string, disable?: boolean, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readPkiUrls(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string[]} [issuingCertificates]
    * @param {string[]} [crlDistributionPoints]
    * @param {string[]} [oscpServers]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setPkiUrls(token: string, issuingCertificates?: string[], crlDistributionPoints?: string[], oscpServers?: string[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    rotatePkiCrl(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} sudoToken
    * @param {Object} params
    * @param {string} params.type - root CA type either 'internal' or 'exported'
    * @param {string} params.commonName
    * @param {string} params.altNames
    * @param {string} params.ipSans
    * @param {string} params.uriSans
    * @param {string} params.otherSans
    * @param {string} params.ttl
    * @param {string} params.format - certificate format either 'der', 'pem' or 'pem_bundle'
    * @param {string} params.pkFormat - private key format either 'der' or 'pkcs8'
    * @param {string} params.keyType - key type either 'rsa' or 'ec'
    * @param {number} params.keyBits
    * @param {boolean} params.excludeCnFromSans
    * @param {number} params.maxPathLength
    * @param {string} params.permittedDnsDomains
    * @param {string} params.ou
    * @param {string} params.organization
    * @param {string} params.country
    * @param {string} params.locality
    * @param {string} params.province
    * @param {string} params.streetAddress
    * @param {string} params.postalCode
    * @param {string} params.serialNumber
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    generateRootCA(sudoToken: string, params: {
        type: string;
        commonName: string;
        altNames: string;
        ipSans: string;
        uriSans: string;
        otherSans: string;
        ttl: string;
        format: string;
        pkFormat: string;
        keyType: string;
        keyBits: number;
        excludeCnFromSans: boolean;
        maxPathLength: number;
        permittedDnsDomains: string;
        ou: string;
        organization: string;
        country: string;
        locality: string;
        province: string;
        streetAddress: string;
        postalCode: string;
        serialNumber: string;
    }, mount?: string): PromiseLike<string>;
    /**
    * @param {string} sudoToken
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteRootCA(sudoToken: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} params.type - intermediate CA type either 'internal' or 'exported'
    * @param {Object} params
    * @param {string} params.commonName
    * @param {string} [params.altNames]
    * @param {string} [params.ipSans]
    * @param {string} [params.uriSans]
    * @param {string} [params.otherSans]
    * @param {string} [params.format] - certificate format either 'der', 'pem' or 'pem_bundle'
    * @param {string} [params.pkFormat] - private key format either 'der' or 'pkcs8'
    * @param {string} [params.keyType] - key type either 'rsa' or 'ec'
    * @param {number} [params.keyBits]
    * @param {boolean} [params.excludeCnFromSans]
    * @param {string} [params.ou]
    * @param {string} [params.organization]
    * @param {string} [params.country]
    * @param {string} [params.locality]
    * @param {string} [params.province]
    * @param {string} [params.streetAddress]
    * @param {string} [params.postalCode]
    * @param {string} [params.serialNumber]
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    genIntermediateCA(token: string, params: {
        commonName: string;
        altNames?: string;
        ipSans?: string;
        uriSans?: string;
        otherSans?: string;
        format?: string;
        pkFormat?: string;
        keyType?: string;
        keyBits?: number;
        excludeCnFromSans?: boolean;
        ou?: string;
        organization?: string;
        country?: string;
        locality?: string;
        province?: string;
        streetAddress?: string;
        postalCode?: string;
        serialNumber?: string;
    }, mount?: string): PromiseLike<string>;
    /**
    * @param {string} sudoToken
    * @param {Object} params
    * @param {string} params.csr
    * @param {string} params.commonName
    * @param {string} [params.altNames]
    * @param {string} [params.ipSans]
    * @param {string} [params.uriSans]
    * @param {string} [params.otherSans]
    * @param {string} [params.ttl]
    * @param {string} [params.format] - certificate format either 'der', 'pem' or 'pem_bundle'
    * @param {number} [params.maxPathLength]
    * @param {boolean} [params.excludeCnFromSans]
    * @param {boolean} [params.useCsrValues]
    * @param {string} [params.permittedDnsDomains]
    * @param {string} [params.ou]
    * @param {string} [params.organization]
    * @param {string} [params.country]
    * @param {string} [params.locality]
    * @param {string} [params.province]
    * @param {string} [params.streetAddress]
    * @param {string} [params.postalCode]
    * @param {string} [params.serialNumber]
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    signIntermediateCA(sudoToken: string, params: {
        csr: string;
        commonName: string;
        altNames?: string;
        ipSans?: string;
        uriSans?: string;
        otherSans?: string;
        ttl?: string;
        format?: string;
        maxPathLength?: number;
        excludeCnFromSans?: boolean;
        useCsrValues?: boolean;
        permittedDnsDomains?: string;
        ou?: string;
        organization?: string;
        country?: string;
        locality?: string;
        province?: string;
        streetAddress?: string;
        postalCode?: string;
        serialNumber?: string;
    }, mount?: string): PromiseLike<string>;
    /**
    * @param {string} token
    * @param {string} certificate
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setIntermediateCA(token: string, certificate: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {Object} params
    * @param {string} params.role - intermediate CA role type either 'internal' or 'exported'
    * @param {string} params.commonName
    * @param {string} [params.altNames]
    * @param {string} [params.ipSans]
    * @param {string} [params.uriSans]
    * @param {string} [params.otherSans]
    * @param {string} [params.ttl]
    * @param {string} params.format - certificate format either 'der', 'pem' or 'pem_bundle'
    * @param {string} [params.pkFormat] - private key format either 'der' or 'pkcs8'
    * @param {boolean} [params.excludeCnFromSans]
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    genPkiCertificate(token: string, params: {
        role: string;
        commonName: string;
        altNames?: string;
        ipSans?: string;
        uriSans?: string;
        otherSans?: string;
        ttl?: string;
        format: string;
        pkFormat?: string;
        excludeCnFromSans?: boolean;
    }, mount?: string): PromiseLike<string>;
    /**
    * @param {string} token
    * @param {string} serialNumber
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    revokePkiCertificate(token: string, serialNumber: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {Object} params
    * @param {string} params.name
    * @param {string} [params.ttl]
    * @param {string} [params.maxTtl]
    * @param {boolean} [params.allowLocalhost]
    * @param {string[]} [params.allowedDomains]
    * @param {boolean} [params.allowedDomainsTemplate]
    * @param {boolean} [params.allowBareDomains]
    * @param {boolean} [params.allowSubdomains]
    * @param {boolean} [params.allowGlobDomains]
    * @param {boolean} [params.allowAnyName]
    * @param {boolean} [params.enforceHostnames]
    * @param {string} [params.allowIpSans]
    * @param {string} [params.allowedUriSans]
    * @param {string} [params.allowedOtherSans]
    * @param {boolean} [params.serverFlag]
    * @param {boolean} [params.clientFlag]
    * @param {boolean} [params.codeSigningFlag]
    * @param {boolean} [params.emailProtectionFlag]
    * @param {string} [params.keyType] - key type either 'rsa' or 'ec'
    * @param {number} [params.keyBits]
    * @param {string[]} [params.keyUsage]
    * @param {string[]} [params.externalKeyUsage]
    * @param {string} [params.extKeyUsageOids]
    * @param {boolean} [params.useCsrCommonName]
    * @param {boolean} [params.useCsrSans]
    * @param {string} [params.ou]
    * @param {string} [params.organization]
    * @param {string} [params.country]
    * @param {string} [params.locality]
    * @param {string} [params.province]
    * @param {string} [params.streetAddress]
    * @param {string} [params.postalCode]
    * @param {string} [params.serialNumber]
    * @param {boolean} [params.generateLease]
    * @param {boolean} [params.noStore]
    * @param {boolean} [params.requireCn]
    * @param {string[]} [params.policyIdentifiers]
    * @param {boolean} [params.basicConstraintsValidForNonCa]
    * @param {string} [params.notBeforeDuration]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createPkiRole(token: string, params: {
        name: string;
        ttl?: string;
        maxTtl?: string;
        allowLocalhost?: boolean;
        allowedDomains?: string[];
        allowedDomainsTemplate?: boolean;
        allowBareDomains?: boolean;
        allowSubdomains?: boolean;
        allowGlobDomains?: boolean;
        allowAnyName?: boolean;
        enforceHostnames?: boolean;
        allowIpSans?: string;
        allowedUriSans?: string;
        allowedOtherSans?: string;
        serverFlag?: boolean;
        clientFlag?: boolean;
        codeSigningFlag?: boolean;
        emailProtectionFlag?: boolean;
        keyType?: string;
        keyBits?: number;
        keyUsage?: string[];
        externalKeyUsage?: string[];
        extKeyUsageOids?: string;
        useCsrCommonName?: boolean;
        useCsrSans?: boolean;
        ou?: string;
        organization?: string;
        country?: string;
        locality?: string;
        province?: string;
        streetAddress?: string;
        postalCode?: string;
        serialNumber?: string;
        generateLease?: boolean;
        noStore?: boolean;
        requireCn?: boolean;
        policyIdentifiers?: string[];
        basicConstraintsValidForNonCa?: boolean;
        notBeforeDuration?: string;
    }, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {Object} params
    * @param {string} params.name
    * @param {string} [params.ttl]
    * @param {string} [params.maxTtl]
    * @param {boolean} [params.allowLocalhost]
    * @param {string[]} [params.allowedDomains]
    * @param {boolean} [params.allowedDomainsTemplate]
    * @param {boolean} [params.allowBareDomains]
    * @param {boolean} [params.allowSubdomains]
    * @param {boolean} [params.allowGlobDomains]
    * @param {boolean} [params.allowAnyName]
    * @param {boolean} [params.enforceHostnames]
    * @param {string} [params.allowIpSans]
    * @param {string} [params.allowedUriSans]
    * @param {string} [params.allowedOtherSans]
    * @param {boolean} [params.serverFlag]
    * @param {boolean} [params.clientFlag]
    * @param {boolean} [params.codeSigningFlag]
    * @param {boolean} [params.emailProtectionFlag]
    * @param {string} [params.keyType] - The type of key to generate. Can be either "rsa" or "ec".
    * @param {number} [params.keyBits]
    * @param {string[]} [params.keyUsage]
    * @param {string[]} [params.externalKeyUsage]
    * @param {string} [params.extKeyUsageOids]
    * @param {boolean} [params.useCsrCommonName]
    * @param {boolean} [params.useCsrSans]
    * @param {string} [params.ou]
    * @param {string} [params.organization]
    * @param {string} [params.country]
    * @param {string} [params.locality]
    * @param {string} [params.province]
    * @param {string} [params.streetAddress]
    * @param {string} [params.postalCode]
    * @param {string} [params.serialNumber]
    * @param {boolean} [params.generateLease]
    * @param {boolean} [params.noStore]
    * @param {boolean} [params.requireCn]
    * @param {string[]} [params.policyIdentifiers]
    * @param {boolean} [params.basicConstraintsValidForNonCa]
    * @param {string} [params.notBeforeDuration]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updatePkiRole(token: string, params: {
        name: string;
        ttl?: string;
        maxTtl?: string;
        allowLocalhost?: boolean;
        allowedDomains?: string[];
        allowedDomainsTemplate?: boolean;
        allowBareDomains?: boolean;
        allowSubdomains?: boolean;
        allowGlobDomains?: boolean;
        allowAnyName?: boolean;
        enforceHostnames?: boolean;
        allowIpSans?: string;
        allowedUriSans?: string;
        allowedOtherSans?: string;
        serverFlag?: boolean;
        clientFlag?: boolean;
        codeSigningFlag?: boolean;
        emailProtectionFlag?: boolean;
        keyType?: string;
        keyBits?: number;
        keyUsage?: string[];
        externalKeyUsage?: string[];
        extKeyUsageOids?: string;
        useCsrCommonName?: boolean;
        useCsrSans?: boolean;
        ou?: string;
        organization?: string;
        country?: string;
        locality?: string;
        province?: string;
        streetAddress?: string;
        postalCode?: string;
        serialNumber?: string;
        generateLease?: boolean;
        noStore?: boolean;
        requireCn?: boolean;
        policyIdentifiers?: string[];
        basicConstraintsValidForNonCa?: boolean;
        notBeforeDuration?: string;
    }, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readPkiRole(token: string, name: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listPkiRoles(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deletePkiRole(token: string, name: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {number} [params.ttl]
     * @param {number} [params.max_ttl]
     * @param {string} [params.password_policy]
     * @param {string} [params.url]
     * @param {string} [params.request_timeout]
     * @param {boolean} [params.starttls]
     * @param {boolean} [params.insecure_tls]
     * @param {string} [params.certificate]
     * @param {string} params.binddn
     * @param {string} params.bindpass
     * @param {string} [params.userdn]
     * @param {string} [params.upndomain]
     * @param {string} [params.last_rotation_tolerance]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    setADConfig(token: string, params: {
        ttl?: number;
        max_ttl?: number;
        password_policy?: string;
        url?: string;
        request_timeout?: string;
        starttls?: boolean;
        insecure_tls?: boolean;
        certificate?: string;
        binddn: string;
        bindpass: string;
        userdn?: string;
        upndomain?: string;
        last_rotation_tolerance?: string;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {number} [params.ttl]
     * @param {number} [params.max_ttl]
     * @param {string} [params.password_policy]
     * @param {string} [params.url]
     * @param {string} [params.request_timeout]
     * @param {boolean} [params.starttls]
     * @param {boolean} [params.insecure_tls]
     * @param {string} [params.certificate]
     * @param {string} params.binddn
     * @param {string} params.bindpass
     * @param {string} [params.userdn]
     * @param {string} [params.upndomain]
     * @param {string} [params.last_rotation_tolerance]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateADConfig(token: string, params: {
        ttl?: number;
        max_ttl?: number;
        password_policy?: string;
        url?: string;
        request_timeout?: string;
        starttls?: boolean;
        insecure_tls?: boolean;
        certificate?: string;
        binddn: string;
        bindpass: string;
        userdn?: string;
        upndomain?: string;
        last_rotation_tolerance?: string;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADConfig(token: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADConfig(token: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    listADRoles(token: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string} params.service_account_name
     * @param {string} [params.ttl]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    createADRole(token: string, params: {
        name: string;
        service_account_name: string;
        ttl?: string;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string} params.service_account_name
     * @param {string} [params.ttl]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateADRole(token: string, params: {
        name: string;
        service_account_name: string;
        ttl?: string;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADRole(token: string, roleName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADRole(token: string, roleName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    getADRoleCred(token: string, roleName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    rotateADRoleCred(token: string, roleName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    listADLibraries(token: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADLibrary(token: string, setName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string[]} params.service_account_names
     * @param {string} [params.ttl]
     * @param {string} [params.max_ttl]
     * @param {boolean} [params.disable_check_in_enforcement]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    createADLibrary(token: string, params: {
        name: string;
        service_account_names: string[];
        ttl?: string;
        max_ttl?: string;
        disable_check_in_enforcement?: boolean;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string[]} params.service_account_names
     * @param {string} [params.ttl]
     * @param {string} [params.max_ttl]
     * @param {boolean} [params.disable_check_in_enforcement]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateADLibrary(token: string, params: {
        name: string;
        service_account_names: string[];
        ttl?: string;
        max_ttl?: string;
        disable_check_in_enforcement?: boolean;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADLibrary(token: string, setName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string} [params.ttl]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    checkADCredOut(token: string, params: {
        name: string;
        ttl?: string;
    }, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} params
     * @param {string} params.name
     * @param {string[]} [params.service_account_names]
     * @param {boolean} [forceMode]
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    checkADCredIn(token: string, params: {
        name: string;
        service_account_names?: string[];
    }, forceMode?: boolean, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    getADCredSatus(token: string, setName: string, mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {Object} data
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateKVEngineConfig(token: string, data: any, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVEngineConfig(token: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {Object} secrets
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createKVSecret(token: string, name: string, secrets: any, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {Object} secrets
    * @param {number} version
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateKVSecret(token: string, name: string, secrets: any, version: number, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number} [version]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVSecret(token: string, name: string, version?: number, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLatestVerKVSecret(token: string, name: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    undeleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    destroyVersionsKVSecret(token: string, name: string, versions: number[], mount?: string): PromiseLike<any>;
    /**
     * @param {string} token
     * @param {string} name
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    eliminateKVSecret(token: string, name: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [folder]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listKVSecrets(token: string, folder?: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} [path]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVSecretMeta(token: string, path?: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} path
    * @param {string} metadata
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createKVSecretMeta(token: string, path: string, metadata: string, mount?: string): PromiseLike<any>;
    /**
    * @param {string} token
    * @param {string} path
    * @param {string} metadata
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateKVSecretMeta(token: string, path: string, metadata: string, mount?: string): PromiseLike<any>;
}
import https = require("https");
//# sourceMappingURL=Vault.d.ts.map