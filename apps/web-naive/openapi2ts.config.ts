// openapi.config.ts

const commonConfig = {
  requestImportStatement: 'import request from "#/api/request"',
};

export default [
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/SystemAPI',
    serversPath: './src/api/system',
  },
  {
    ...commonConfig,
    schemaPath: 'http://172.17.0.1:8080/api/v3/api-docs/CommonAPI',
    serversPath: './src/api/common',
  },
];
