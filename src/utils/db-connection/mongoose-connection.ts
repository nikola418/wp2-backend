import mongoose, { mongo } from 'mongoose';
import Logging from '../logging/logging';
import { config } from '../../config/config';

export async function connect() {
  try {
    mongoose.connection.on('connecting', () => {
      Logging.info(`MongoDB: connecting.`);
    });
    mongoose.connection.on('connected', () => {
      Logging.log('MongoDB: connected.');
    });
    mongoose.connection.on('disconnecting', () => {
      Logging.log('MongoDB: disconnecting.');
    });
    mongoose.connection.on('disconnected', () => {
      Logging.log('MongoDB: disconnected.');
    });

    if (
      mongoose.connection.readyState !== 1 &&
      mongoose.connection.readyState !== 2
    ) {
      const conn = await mongoose.connect(config.mongo.url, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        writeConcern: new mongo.WriteConcern('majority'),
      });
      return conn;
    }
  } catch (error) {
    Logging.error(`Error connecting to DB: ${error}`);
  }
}
