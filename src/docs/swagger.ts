import swaggerAutogen from 'swagger-autogen';

const options = {
  openapi: null,
  language: 'en-US',
  autoHeaders: true,
  autoBody: true,
  autoQuery: true,
};

const doc = {
  info: {
    title: 'My Web Programming 2 Project',
    description:
      'This is REST API for of a MEAN stack project for the final year subject of Web Programming 2',
  },
  host: 'localhost:4000',
  basePath: '/',
  consumes: 'application/json',
  produces: 'application/json',
  schemes: ['http'],
};

const outputFile = './src/docs/swagger-docs.json';
const endpoints = ['./src/app.ts'];
swaggerAutogen(options)(outputFile, endpoints, doc);
