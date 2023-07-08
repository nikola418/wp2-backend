import express from 'express';
import controller from '../controllers/books';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const router = express.Router();

router.post('/', validateSchema(Schemas.book.create), controller.createBook);
router.get('/:bookId', controller.readBook);
router.get('/', controller.readAll);
router.patch(
  '/:bookId',
  validateSchema(Schemas.book.update),
  controller.updateBook,
);
router.delete('/:bookId', controller.deleteBook);

export default router;
