import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import usersRouter from './routes/users';
import booksRouter from './routes/books';
import authorsRouter from './routes/authors';

import swaggerUI from 'swagger-ui-express';
import swaggerFile from './docs/swagger-docs.json';
import { HttpStatus } from './library/enums';

const router = express();
/**  Connect to Mongo */
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => {
    Logging.info(`Connected to Cluster0`);
    StartSeerver();
  })
  .catch((err) => {
    Logging.error('Unable to connect:');
    Logging.error(err);
  });

/** Only start the server if Mongo Connects */
const StartSeerver = () => {
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    );

    res.on('finish', () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`,
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of the API */
  router.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method == 'OPTION') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET',
      );
    }

    next();
  });

  /** Routes */
  router.use('/authors', authorsRouter);
  router.use('/books/', booksRouter);
  router.use('/users/', usersRouter);
  router.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerFile, {}));

  /** HealthCheck */
  router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

  /** Error handling */
  router.use((req, res) => {
    const error = new Error('Not Found');
    Logging.error(error);

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: error.message, status: HttpStatus.NOT_FOUND });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`),
    );
};
