import swaggerAutogen from 'swagger-autogen';

const outputFile = './src/docs/swagger-docs.json';
const endpoints = ['./src/server.ts'];
swaggerAutogen(outputFile, endpoints);
