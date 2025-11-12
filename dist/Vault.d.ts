/**
* @constructor
* @param {boolean} [params.https=false]
* @param {string} [params.cert]
* @param {string} [params.key]
* @param {string} [params.cacert]
* @param {string} [params.baseUrl]
* @param {string} [params.rootPath]
* @param {number} [params.timeout=1000]
* @param {boolean} [params.proxy=false]
* @param {string} [params.namespace]
*/
export default class Vault {
    constructor(params: any);
    /** @type {boolean} */
    https: boolean;
    /** @type {string} */
    cert: string;
    /** @type {string} */
    key: string;
    /** @type {string} */
    cacert: string;
    /** @type {string} */
    baseUrl: string;
    /** @type {string} */
    rootPath: string;
    /** @type {number} */
    timeout: number;
    /** @type {Object} */
    proxy: Object;
    /** @type {string} */
    namespace: string;
    /** @type {Object | boolean} */
    agent: Object | boolean;
    /** @type {Object} */
    instance: Object;
    /**
    * @param {Object} [params]
    * @returns {PromiseLike<Object>}
    */
    healthCheck(params?: Object | undefined): PromiseLike<Object>;
    /**
    * @returns {PromiseLike<Object>}
    */
    sealStatus(): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    sysHostInfo(sudoToken: string): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @param {string} token
    * @param {string[]} paths
    * @returns {PromiseLike<Object>}
    */
    sysCapabilities(sudoToken: string, token: string, paths: string[]): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string[]} paths
    * @returns {PromiseLike<Object>}
    */
    sysCapabilitiesSelf(token: string, paths: string[]): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @param {string} type
    * @returns {PromiseLike<Object>}
    */
    sysInternalCounters(sudoToken: string, type: string): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @param {string} [format]
    * @returns {PromiseLike<Object>}
    */
    sysMetrics(sudoToken: string, format?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    sysSeal(sudoToken: string): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @param {string} key
    * @param {boolean} reset
    * @param {boolean} migrate
    * @returns {PromiseLike<Object>}
    */
    sysUnseal(sudoToken: string, key: string, reset: boolean, migrate: boolean): PromiseLike<Object>;
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
        id?: string | undefined;
        role_name?: string | undefined;
        policies?: string | undefined;
        meta?: Object | undefined;
        no_narent?: boolean | undefined;
        no_default_policy?: boolean | undefined;
        renewable?: boolean | undefined;
        ttl?: string | undefined;
        type?: string | undefined;
        explicit_max_ttl?: string | undefined;
        display_name?: string | undefined;
        num_uses?: number | undefined;
        period?: string | undefined;
        entity_alias?: string | undefined;
    } | undefined): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    revokeToken(vaultToken: string, clientToken: string): PromiseLike<Object>;
    /**
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    revokeSelfToken(clientToken: string): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    lookupToken(vaultToken: string, clientToken: string): PromiseLike<Object>;
    /**
    * @param {string} clientToken
    * @returns {PromiseLike<Object>}
    */
    lookupSelfToken(clientToken: string): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} clientToken
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewToken(vaultToken: string, clientToken: string, increment: string): PromiseLike<Object>;
    /**
    * @param {string} clientToken
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewSelfToken(clientToken: string, increment: string): PromiseLike<Object>;
    /**
    * @param {string} sudoToken
    * @returns {PromiseLike<Object>}
    */
    listAccessors(sudoToken: string): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @returns {PromiseLike<Object>}
    */
    lookupAccessor(vaultToken: string, accessor: string): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @param {string} increment
    * @returns {PromiseLike<Object>}
    */
    renewAccessor(vaultToken: string, accessor: string, increment: string): PromiseLike<Object>;
    /**
    * @param {string} vaultToken
    * @param {string} accessor
    * @returns {PromiseLike<Object>}
    */
    revokeAccessor(vaultToken: string, accessor: string): PromiseLike<Object>;
    /**
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {Object}
    */
    loginWithLdap(username: string, password: string, mount?: string | undefined): Object;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} groups
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} groups
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateLdapUser(token: string, username: string, policies: string[], groups: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createLdapGroup(token: string, group: string, policies: string[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateLdapGroup(token: string, group: string, policies: string[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapGroup(token: string, group: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapUser(token: string, username: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listLdapUsers(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listLdapGroups(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLdapUser(token: string, username: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} group
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLdapGroup(token: string, group: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readLdapConfig(token: string, mount?: string | undefined): PromiseLike<Object>;
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
    } | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} [mount]
    * @param {string} certName
    * @returns {PromiseLike<Object>}
    */
    loginWithCert(certName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    loginWithUserpass(username: string, password: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassUser(token: string, username: string, password: string, policies: string[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readUserpassUser(token: string, username: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteUserpassUser(token: string, username: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string} password
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassPassword(token: string, username: string, password: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} username
    * @param {string[]} policies
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateUserpassPolicies(token: string, username: string, policies: string[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listUserpassUsers(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} role
     * @param {string} jwt
     * @param {string} [mount]
     * @returns {Object}
     */
    loginWithK8s(role: string, jwt: string, mount?: string | undefined): Object;
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
        pem_keys?: Object | undefined;
        issuer: string;
        disable_iss_validation: boolean;
        disable_local_ca_jwt: boolean;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {Object}
     */
    readK8sConfig(token: string, mount?: string | undefined): Object;
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
        bound_service_account_names?: Object | undefined;
        bound_service_account_namespaces?: Object | undefined;
        audience: string;
        token_ttl: number | string;
        token_max_ttl: number | string;
        token_policies?: Object | undefined;
        token_bound_cidrs?: Object | undefined;
        token_explicit_max_ttl: number | string;
        token_no_default_policy: boolean;
        token_num_uses: number;
        token_period: number | string;
        token_type: string;
    }, mount?: string | undefined): Object;
    /**
     * @param {string} token
     * @param {string} role
     * @param {string} [mount]
     * @returns {Object}
     */
    readK8sRole(token: string, role: string, mount?: string | undefined): Object;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {Object}
     */
    listK8sRoles(token: string, mount?: string | undefined): Object;
    /**
     * @param {string} token
     * @param {string} role
     * @param {string} [mount]
     * @returns {Object}
     */
    deleteK8sRole(token: string, role: string, mount?: string | undefined): Object;
    /**
    * @param {string} roleId
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {Object}
    */
    loginWithAppRole(roleId: string, secretId: string, mount?: string | undefined): Object;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} [metadata]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    generateAppRoleSecretId(token: string, appRole: string, metadata?: string | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} appRole
    * @param {string} secretId
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    destroyAppRoleSecretId(token: string, appRole: string, secretId: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} format - certificate format either 'der' or 'pem'
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readCACertificate(format: string, mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} format - certificate format either 'der' or 'pem'
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readPkiCrl(format: string, mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} [mount]
    * @returns {PromiseLike<string>}
    */
    readCAChain(mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} serial
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readCertificate(serial: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listCertificates(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} pemBundle
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setCACertificate(token: string, pemBundle: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readCrlConfig(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [expiry]
    * @param {boolean} [disable]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setCrlConfig(token: string, expiry?: string | undefined, disable?: boolean | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readPkiUrls(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string[]} [issuingCertificates]
    * @param {string[]} [crlDistributionPoints]
    * @param {string[]} [oscpServers]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setPkiUrls(token: string, issuingCertificates?: string[] | undefined, crlDistributionPoints?: string[] | undefined, oscpServers?: string[] | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    rotatePkiCrl(token: string, mount?: string | undefined): PromiseLike<Object>;
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
    }, mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} sudoToken
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteRootCA(sudoToken: string, mount?: string | undefined): PromiseLike<Object>;
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
        altNames?: string | undefined;
        ipSans?: string | undefined;
        uriSans?: string | undefined;
        otherSans?: string | undefined;
        format?: string | undefined;
        pkFormat?: string | undefined;
        keyType?: string | undefined;
        keyBits?: number | undefined;
        excludeCnFromSans?: boolean | undefined;
        ou?: string | undefined;
        organization?: string | undefined;
        country?: string | undefined;
        locality?: string | undefined;
        province?: string | undefined;
        streetAddress?: string | undefined;
        postalCode?: string | undefined;
        serialNumber?: string | undefined;
    }, mount?: string | undefined): PromiseLike<string>;
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
        altNames?: string | undefined;
        ipSans?: string | undefined;
        uriSans?: string | undefined;
        otherSans?: string | undefined;
        ttl?: string | undefined;
        format?: string | undefined;
        maxPathLength?: number | undefined;
        excludeCnFromSans?: boolean | undefined;
        useCsrValues?: boolean | undefined;
        permittedDnsDomains?: string | undefined;
        ou?: string | undefined;
        organization?: string | undefined;
        country?: string | undefined;
        locality?: string | undefined;
        province?: string | undefined;
        streetAddress?: string | undefined;
        postalCode?: string | undefined;
        serialNumber?: string | undefined;
    }, mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} token
    * @param {string} certificate
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    setIntermediateCA(token: string, certificate: string, mount?: string | undefined): PromiseLike<Object>;
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
        altNames?: string | undefined;
        ipSans?: string | undefined;
        uriSans?: string | undefined;
        otherSans?: string | undefined;
        ttl?: string | undefined;
        format: string;
        pkFormat?: string | undefined;
        excludeCnFromSans?: boolean | undefined;
    }, mount?: string | undefined): PromiseLike<string>;
    /**
    * @param {string} token
    * @param {string} serialNumber
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    revokePkiCertificate(token: string, serialNumber: string, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
        maxTtl?: string | undefined;
        allowLocalhost?: boolean | undefined;
        allowedDomains?: string[] | undefined;
        allowedDomainsTemplate?: boolean | undefined;
        allowBareDomains?: boolean | undefined;
        allowSubdomains?: boolean | undefined;
        allowGlobDomains?: boolean | undefined;
        allowAnyName?: boolean | undefined;
        enforceHostnames?: boolean | undefined;
        allowIpSans?: string | undefined;
        allowedUriSans?: string | undefined;
        allowedOtherSans?: string | undefined;
        serverFlag?: boolean | undefined;
        clientFlag?: boolean | undefined;
        codeSigningFlag?: boolean | undefined;
        emailProtectionFlag?: boolean | undefined;
        keyType?: string | undefined;
        keyBits?: number | undefined;
        keyUsage?: string[] | undefined;
        externalKeyUsage?: string[] | undefined;
        extKeyUsageOids?: string | undefined;
        useCsrCommonName?: boolean | undefined;
        useCsrSans?: boolean | undefined;
        ou?: string | undefined;
        organization?: string | undefined;
        country?: string | undefined;
        locality?: string | undefined;
        province?: string | undefined;
        streetAddress?: string | undefined;
        postalCode?: string | undefined;
        serialNumber?: string | undefined;
        generateLease?: boolean | undefined;
        noStore?: boolean | undefined;
        requireCn?: boolean | undefined;
        policyIdentifiers?: string[] | undefined;
        basicConstraintsValidForNonCa?: boolean | undefined;
        notBeforeDuration?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
        maxTtl?: string | undefined;
        allowLocalhost?: boolean | undefined;
        allowedDomains?: string[] | undefined;
        allowedDomainsTemplate?: boolean | undefined;
        allowBareDomains?: boolean | undefined;
        allowSubdomains?: boolean | undefined;
        allowGlobDomains?: boolean | undefined;
        allowAnyName?: boolean | undefined;
        enforceHostnames?: boolean | undefined;
        allowIpSans?: string | undefined;
        allowedUriSans?: string | undefined;
        allowedOtherSans?: string | undefined;
        serverFlag?: boolean | undefined;
        clientFlag?: boolean | undefined;
        codeSigningFlag?: boolean | undefined;
        emailProtectionFlag?: boolean | undefined;
        keyType?: string | undefined;
        keyBits?: number | undefined;
        keyUsage?: string[] | undefined;
        externalKeyUsage?: string[] | undefined;
        extKeyUsageOids?: string | undefined;
        useCsrCommonName?: boolean | undefined;
        useCsrSans?: boolean | undefined;
        ou?: string | undefined;
        organization?: string | undefined;
        country?: string | undefined;
        locality?: string | undefined;
        province?: string | undefined;
        streetAddress?: string | undefined;
        postalCode?: string | undefined;
        serialNumber?: string | undefined;
        generateLease?: boolean | undefined;
        noStore?: boolean | undefined;
        requireCn?: boolean | undefined;
        policyIdentifiers?: string[] | undefined;
        basicConstraintsValidForNonCa?: boolean | undefined;
        notBeforeDuration?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readPkiRole(token: string, name: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listPkiRoles(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deletePkiRole(token: string, name: string, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: number | undefined;
        max_ttl?: number | undefined;
        password_policy?: string | undefined;
        url?: string | undefined;
        request_timeout?: string | undefined;
        starttls?: boolean | undefined;
        insecure_tls?: boolean | undefined;
        certificate?: string | undefined;
        binddn: string;
        bindpass: string;
        userdn?: string | undefined;
        upndomain?: string | undefined;
        last_rotation_tolerance?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: number | undefined;
        max_ttl?: number | undefined;
        password_policy?: string | undefined;
        url?: string | undefined;
        request_timeout?: string | undefined;
        starttls?: boolean | undefined;
        insecure_tls?: boolean | undefined;
        certificate?: string | undefined;
        binddn: string;
        bindpass: string;
        userdn?: string | undefined;
        upndomain?: string | undefined;
        last_rotation_tolerance?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADConfig(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADConfig(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    listADRoles(token: string, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADRole(token: string, roleName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADRole(token: string, roleName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    getADRoleCred(token: string, roleName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} roleName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    rotateADRoleCred(token: string, roleName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    listADLibraries(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    readADLibrary(token: string, setName: string, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
        max_ttl?: string | undefined;
        disable_check_in_enforcement?: boolean | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
        max_ttl?: string | undefined;
        disable_check_in_enforcement?: boolean | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    deleteADLibrary(token: string, setName: string, mount?: string | undefined): PromiseLike<Object>;
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
        ttl?: string | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
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
        service_account_names?: string[] | undefined;
    }, forceMode?: boolean | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} setName
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    getADCredSatus(token: string, setName: string, mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {Object} data
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    updateKVEngineConfig(token: string, data: Object, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVEngineConfig(token: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {Object} secrets
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createKVSecret(token: string, name: string, secrets: Object, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {Object} secrets
    * @param {number} version
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateKVSecret(token: string, name: string, secrets: Object, version: number, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number} [version]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVSecret(token: string, name: string, version?: number | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteLatestVerKVSecret(token: string, name: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    deleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    undeleteVersionsKVSecret(token: string, name: string, versions: number[], mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {number[]} versions
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    destroyVersionsKVSecret(token: string, name: string, versions: number[], mount?: string | undefined): PromiseLike<Object>;
    /**
     * @param {string} token
     * @param {string} name
     * @param {string} [mount]
     * @returns {PromiseLike<Object>}
     */
    eliminateKVSecret(token: string, name: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [folder]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    listKVSecrets(token: string, folder?: string | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} [path]
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readKVSecretMeta(token: string, path?: string | undefined, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} path
    * @param {string} metadata
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createKVSecretMeta(token: string, path: string, metadata: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} path
    * @param {string} metadata
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    updateKVSecretMeta(token: string, path: string, metadata: string, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {Object} params
    * @param {boolean} params.generate
    * @param {boolean} [params.exported] - whether the key is exportable as QR code
    * @param {number} [params.key_size=20]
    * @param {string} [params.key_url]
    * @param {string} [params.key]
    * @param {string} [params.issuer] - key issuing entity
    * @param {string} [params.account_name]
    * @param {number} [params.period=30] - length of time for the counter on the code calculation
    * @param {string} [params.algorithm=sha1] - code generator algorithm, either "SHA1", "SHA256", or "SHA512"
    * @param {number} [params.digits] - number of code digits, either 6 or 8
    * @param {number} [params.skew=1] - number of delay periods valid for code validation, either 0 or 1
    * @param {number} [params.gr_size=200] - pixel size of the QR code image
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    createTOTPKey(token: string, name: string, params: {
        generate: boolean;
        exported?: boolean | undefined;
        key_size?: number | undefined;
        key_url?: string | undefined;
        key?: string | undefined;
        issuer?: string | undefined;
        account_name?: string | undefined;
        period?: number | undefined;
        algorithm?: string | undefined;
        digits?: number | undefined;
        skew?: number | undefined;
        gr_size?: number | undefined;
    }, mount?: string | undefined): PromiseLike<Object>;
    /**
    * @param {string} token
    * @param {string} name
    * @param {string} [mount]
    * @returns {PromiseLike<Object>}
    */
    readTOTPKey(token: string, name: string, mount?: string | undefined): PromiseLike<Object>;
}
//# sourceMappingURL=Vault.d.ts.map