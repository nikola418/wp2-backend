import express from 'express';
import usersController from '../controllers/users';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const usersRouter = express.Router();

usersRouter.post(
  '/',
  validateSchema(Schemas.user.create),
  usersController.create,
);
// usersRouter.get('/:id', controller.readById);
usersRouter.get('/', usersController.readAll);
// usersRouter.patch(
//   '/:id',
//   validateSchema(Schemas.user.update),
//   controller.updateById,
// );
// usersRouter.delete('/:id', controller.deleteById);

export default usersRouter;
