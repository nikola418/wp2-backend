import express from 'express';
import { authController } from '../controllers/auth';
import { Schemas, validateSchema } from '../middleware/validate-schema';
import passport from 'passport';

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
authRouter.get(
  '/sign-out',
  passport.authenticate('jwt', { session: false }),
  authController.signOut,
);
authRouter.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authController.me,
);
export default authRouter;
