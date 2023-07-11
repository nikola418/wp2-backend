import express from 'express';
import { Schemas, validateSchema } from '../middleware/validate-schema';
import extrasController from '../controllers/extras';

const extrasRouter = express.Router();

extrasRouter.post(
  '/',
  validateSchema(Schemas.extra.create),
  extrasController.create,
);

extrasRouter.delete('/:id', extrasController.deleteById);

export default extrasRouter;
