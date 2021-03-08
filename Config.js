const config = {
  appName: 'hashi-vault-js',
  baseUrl: 'https://127.0.0.1:8200/v1',
  timeout: 1000,
  proxy: false,
  sysHealth: '/sys/health',
  sysSealStatus: '/sys/seal-status',
  sysHostInfo: '/sys/host-info',
  sysCapabilities: '/sys/capabilities',
  sysCapabilitiesSelf: '/sys/capabilities-self',
  sysInternalCounters: '/sys/internal/counters',
  sysCounterTypes: [ "requests", "entities", "tokens" ],
  sysMetrics: '/sys/metrics',
  sysMetricFormats: [ "prometheus" ],
  sysSeal: '/sys/seal',
  sysUnseal: '/sys/unseal',
  tokenCreate: '/auth/token/create',
  tokenCreateOrphan: '/auth/token/create-orphan',
  tokenCreateRole: '/auth/token/create',
  tokenRevoke: '/auth/token/revoke',
  tokenRevokeSelf: '/auth/token/revoke-self',
  tokenLookup:'/auth/token/lookup',
  tokenLookupSelf:'/auth/token/lookup-self',
  tokenRenew: '/auth/token/renew',
  tokenRenewSelf: '/auth/token/renew-self',
  tokenListAccessors: '/auth/token/accessors',
  tokenLookupAccessor: '/auth/token/lookup-accessor',
  tokenRenewAccessor: '/auth/token/renew-accessor',
  tokenRevokeAccessor: '/auth/token/revoke-accessor',
  appRoleRootPath: 'auth/approle',
  appRoleLogin: [ 'login', 'post'],
  appRoleCreateSecret: [ 'role', 'secret-id','post'],
  appRoleReadSecret: [ 'role', 'secret-id/lookup','post'],
  appRoleDestroySecret: [ 'role', 'secret-id/destroy','post'],
  ldapRootPath: 'auth/ldap',
  ldapLogin: [ 'login', 'post'],
  ldapCreateUser: [ 'users', 'post'],
  ldapCreateGroup: [ 'groups', 'post'],
  ldapDeleteUser: [ 'users', 'delete'],
  ldapDeleteGroup: [ 'groups', 'delete'],
  ldapReadUser: [ 'users', 'get'],
  ldapReadGroup: [ 'groups', 'get'],
  ldapListUsers: [ 'users', 'list'],
  ldapListGroups: [ 'groups', 'list'],
  userpassRootPath: 'auth/userpass',
  userpassCreateUser: [ 'users', 'post'],
  userpassReadUser: [ 'users', 'get'],
  userpassDeleteUser: [ 'users', 'delete'],
  userpassUpdatePass: [ 'users', 'post'],
  userpassUpdatePolicies: [ 'users', 'post'],
  userpassListUsers: [ 'users', 'list'],
  userpassLogin: [ 'login', 'post'],
  pkiRootPath: 'pki',
  pkiReadCACert: [ 'ca', 'get'],
  pkiReadCAChain: ['ca_chain', 'get'],
  pkiReadCert: ['cert', 'get'],
  pkiListCerts: ['certs', 'list'],
  pkiSetCACert: ['config/ca', 'post'],
  pkiReadCrlConf: ['config/crl', 'get'],
  pkiSetCrlConf: ['config/crl', 'post'],
  pkiReadUrls: ['config/urls', 'get'],
  pkiSetUrls: ['config/urls', 'post'],
  pkiReadCrl: ['crl', 'get'],
  pkiRotateCrl: ['crl/rotate', 'get'],
  pkiGenIntermediate: ['intermediate/generate', 'post'],
  pkiSignIntermediate: ['root/sign-intermediate', 'post'],
  pkiSetIntermediate: ['intermediate/set-signed', 'post'],
  pkiGenerateCertificate: ['issue', 'post'],
  pkiRevokeCertificate: ['revoke', 'post'],
  pkiDeleteRoot: ['root', 'delete'],
  pkiGenerateRoot: ['root/generate', 'post'],
  pkiCreateRole: ['roles', 'post'],
  pkiReadRole: ['roles', 'get'],
  pkiListRoles: ['roles', 'list'],
  pkiDeleteRole: ['roles', 'delete'],
  kvRootPath: 'secret',
  kvReadEngine: ['config', 'get'],
  kvCreateSecret: ['data', 'post'],
  kvUpdateSecret: ['data', 'post'],
  kvReadSecret: ['data', 'get'],
  kvDeleteLatestSecret: ['data', 'delete'],
  kvDeleteSecret: ['delete', 'post'],
  kvUndeleteSecret: ['undelete', 'post'],
  kvDestroySecret: ['destroy', 'post'],
  kvListSecrets: ['metadata', 'list'],
};

module.exports = config;
