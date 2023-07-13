import express from 'express';
import { Schemas, validateSchema } from '../middleware/validate-schema';
import { pizzasController } from '../controllers/pizzas';
import authorize from '../middleware/authorize';
import { UserRole } from '../models/enums';
import passport from 'passport';

const pizzasRouter = express.Router();

pizzasRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorize([UserRole.Admin]),
  validateSchema(Schemas.pizza.create),
  pizzasController.create,
);
pizzasRouter.get('/', pizzasController.readAll);
pizzasRouter.get('/:id', pizzasController.readById);
pizzasRouter.patch('/:id', pizzasController.updateById);
pizzasRouter.delete('/:id', pizzasController.deleteById);

export default pizzasRouter;
