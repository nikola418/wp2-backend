import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
import authService from '../services/auth';

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  authService
    .login({ email, password })
    .then((token) => res.status(HttpStatus.OK).json({ token }))
    .catch((err) =>
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

const authController = { login };

export default authController;
