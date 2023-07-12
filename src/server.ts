import http from 'http';
import { config } from './config/config';
import { connect } from './utils/db-connection/mongoose-connection';
import { createApp } from './app';
import Logging from './utils/logging/logging';

connect()
  .then(() => createApp())
  .then((app) => {
    http
      .createServer(app)
      .listen(config.server.port, () =>
        Logging.info(`HTTP Server is running on port ${config.server.port}`),
      );
  });
