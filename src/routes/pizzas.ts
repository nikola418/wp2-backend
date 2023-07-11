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
pizzasRouter.get('/:id', pizzasController.readById);
pizzasRouter.patch('/:id', pizzasController.updateById);
pizzasRouter.delete('/:id', pizzasController.deleteById);

export default pizzasRouter;
