import express from 'express';
import { authController } from '../controllers/auth';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validateSchema(Schemas.auth.login),
  authController.login,
);

authRouter.get('/logout', authController.logout);

export default authRouter;