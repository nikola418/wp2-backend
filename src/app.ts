import express, { Express } from 'express';
import Logging from './utils/logging/logging';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './docs/swagger-docs.json';
import { HttpStatus } from './utils/enums';
import usersRouter from './routes/users';
import pizzasRouter from './routes/pizzas';
import extrasRouter from './routes/extras';
import authRouter from './routes/auth';
import { errorsMiddleware } from './middleware/error';
import cors from 'cors';
import { config } from './config/config';
import cookieParser from 'cookie-parser';
import initJwtStrategy from './middleware/jwt';
import passport from 'passport';

const app: Express = express();
/**  Connect to Mongo */
/** Only start the server if Mongo Connects */
export const createApp = () => {
  initJwtStrategy();
  //* LOGGING
  app.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
    );
    res.on('finish', () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`,
      );
    });
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: config.server.origin,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
      methods: ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'],
      allowedHeaders: [
        'Accept',
        'Content-Type',
        'Content-Length',
        'Origin',
        'X-Powered-By',
        'X-Requested-With',
        'Authorization',
        // 'Access-Control-Allow-Origin',
        // 'Access-Control-Allow-Headers',
        // 'Access-Control-Allow-Methods',
        // 'Access-Control-Allow-Credentials',
      ],
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use(passport.initialize());

  /** Rules of the API */
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET',
      );
    }
    next();
  });

  /** Routes */
  app.use('/users', usersRouter);
  app.use('/pizzas', pizzasRouter);
  app.use('/extras', extrasRouter);
  app.use('/auth', authRouter);
  app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerFile, {}));

  /** HealthCheck */
  app.get('/ping', (req, res) =>
    res.status(HttpStatus.OK).json({ message: 'pong' }),
  );

  /** Error handling */
  app.use((req, res) => {
    const error = new Error('Not Found');
    Logging.error(error);

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: error.message, status: HttpStatus.NOT_FOUND });
  });

  //* Handle errors
  app.use(errorsMiddleware);

  return app;
};
