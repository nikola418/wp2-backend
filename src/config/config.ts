import dotenv from 'dotenv';
import Logging from '../utils/logging/logging';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rfo8phh.mongodb.net`;
const API_SECRET = process.env.API_SECRET;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 4000;

if (!API_SECRET) {
  Logging.error('API_SECRET is undefined');
  process.exit();
}

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    apiSecret: API_SECRET,
  },
};
