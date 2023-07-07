import express from 'express';
import controller from '../controllers/users';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const usersRouter = express.Router();

usersRouter.post('/', validateSchema(Schemas.user.create), controller.create);
// usersRouter.get('/:id', controller.readById);
usersRouter.get('/', controller.readAll);
// usersRouter.patch(
//   '/:id',
//   validateSchema(Schemas.user.update),
//   controller.updateById,
// );
// usersRouter.delete('/:id', controller.deleteById);

export default usersRouter;
