import express from 'express';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const ordersRouter = express.Router();

ordersRouter.post('/', validateSchema(Schemas.order.create));
export default ordersRouter;
