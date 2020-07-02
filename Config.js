const config = {
  appName: 'chatops-knight',
  baseUrl: 'https://127.0.0.1:8200/v1',
  rootPath: 'secrets',
  timeout: 1000,
  proxy: false,
  createPath: 'data',
  updatePath: 'data',
  readPath: 'data',
  lvDeletePath: 'data',
  deletePath: 'delete',
  undeletePath: 'undelete',
  destroyPath: 'destroy',
  enginePath: 'config',
  listPath: 'metadata',
  appRoleLogin: '/auth/approle/login',
  appRolePath: '/auth/approle/role'
};

module.exports = config;
