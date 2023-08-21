import express from 'express';
import { Schemas, validateSchema } from '../middleware/validate-schema';
import passport from 'passport';
import { ordersController } from '../controllers/orders';

const ordersRouter = express.Router();

ordersRouter.post(
  '/',
  validateSchema(Schemas.order.create),
  passport.authenticate('jwt', { session: false }),
  ordersController.create,
);
ordersRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  ordersController.readAll,
);
ordersRouter.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  ordersController.updateById,
);
export default ordersRouter;
