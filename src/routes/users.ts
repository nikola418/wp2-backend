import express from 'express';
import usersController from '../controllers/users';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const usersRouter = express.Router();

usersRouter.post(
  '/',
  validateSchema(Schemas.user.create),
  usersController.create,
);
usersRouter.get('/:id', usersController.readById);
usersRouter.get('/', usersController.readAll);
usersRouter.patch(
  '/:id',
  validateSchema(Schemas.user.update),
  usersController.updateById,
);
usersRouter.delete('/:id', usersController.deleteById);

export default usersRouter;
