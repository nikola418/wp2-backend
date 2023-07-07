import express from 'express';
import controller from '../controllers/authors';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const router = express.Router();

router.post(
  '/',
  validateSchema(Schemas.author.create),
  controller.createAuthor,
);
router.get('/:authorId', controller.readAuthor);
router.get('/', controller.readAll);
router.patch(
  '/:authorId',
  validateSchema(Schemas.author.update),
  controller.updateAuthor,
);
router.delete('/:authorId', controller.deleteAuthor);

export default router;
