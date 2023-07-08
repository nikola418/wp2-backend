import express from 'express';
import { Schemas, validateSchema } from '../middleware/validate-schema';
import pizzasController from '../controllers/pizza';

const pizzasRouter = express.Router();

pizzasRouter.post(
  '/',
  validateSchema(Schemas.pizza.create),
  pizzasController.create,
);

pizzasRouter.get('/', pizzasController.readAll);

export default pizzasRouter;
