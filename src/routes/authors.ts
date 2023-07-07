import express from 'express';
import controller from '../controllers/authors';
import { Schemas, ValidateSchema } from '../middleware/validate-schema';

const router = express.Router();

router.post(
  '/',
  ValidateSchema(Schemas.author.create),
  controller.createAuthor,
);
router.get('/:authorId', controller.readAuthor);
router.get('/', controller.readAll);
router.patch(
  '/:authorId',
  ValidateSchema(Schemas.author.update),
  controller.updateAuthor,
);
router.delete('/:authorId', controller.deleteAuthor);

export default router;
