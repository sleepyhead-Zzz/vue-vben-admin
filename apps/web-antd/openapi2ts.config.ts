// openapi.config.ts

const commonConfig = {
  requestImportStatement: 'import request from "#/api/request"',
};

export default [
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/SystemAPI',
    serversPath: './src/api',
    projectName: 'system',
    namespace: 'SystemAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/CommonAPI',
    serversPath: './src/api',
    projectName: 'common',
    namespace: 'CommonAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/TravelerAPI',
    serversPath: './src/api',
    projectName: 'traveler',
    namespace: 'TravelerAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/MonitorAPI',
    serversPath: './src/api',
    projectName: 'monitor',
    namespace: 'MonitorAPI',
  },
];
