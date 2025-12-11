// openapi.config.ts

const commonConfig = {
  requestImportStatement: 'import request from "#/api/request"',
};

export default [
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/SystemAPI',
    serversPath: './src/api',
    projectName: 'system',
    namespace: 'SystemAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/CommonAPI',
    serversPath: './src/api',
    projectName: 'common',
    namespace: 'CommonAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/TravelerAPI',
    serversPath: './src/api',
    projectName: 'traveler',
    namespace: 'TravelerAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/MonitorAPI',
    serversPath: './src/api',
    projectName: 'monitor',
    namespace: 'MonitorAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/ToolAPI',
    serversPath: './src/api',
    projectName: 'tool',
    namespace: 'ToolAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/AssetAPI',
    serversPath: './src/api',
    projectName: 'asset',
    namespace: 'AssetAPI',
  },
  {
    ...commonConfig,
    schemaPath: 'http://192.168.3.44:8080/dev-api/v3/api-docs/RegulatoryAPI',
    serversPath: './src/api',
    projectName: 'regulatory',
    namespace: 'RegulatoryAPI',
  },
];
