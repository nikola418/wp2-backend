import express from 'express';
import { authController } from '../controllers/auth';
import { Schemas, validateSchema } from '../middleware/validate-schema';

const authRouter = express.Router();

authRouter.post(
  '/sign-in',
  validateSchema(Schemas.auth.login),
  authController.signIn,
);
authRouter.post(
  '/sign-up',
  validateSchema(Schemas.user.create),
  authController.signUp,
);
authRouter.get('/sign-out', authController.signOut);

export default authRouter;
