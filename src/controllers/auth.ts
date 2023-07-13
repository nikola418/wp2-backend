import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth';
import { config } from '../config/config';
import { HttpStatus } from '../utils/enums';

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const token = await authService.login({ email, password });
      res
        .cookie(config.server.cookieName, token, {
          httpOnly: true,
          secure: false,
        })
        .status(HttpStatus.OK)
        .json({ message: 'Login Successful!' });
    } catch (err) {
      next(err);
    }
  },

  logout: (req: Request, res: Response) => {
    if (req.cookies[config.server.cookieName]) {
      res
        .clearCookie(config.server.cookieName)
        .status(HttpStatus.OK)
        .json({ message: 'Logout Successful!' });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid Token!' });
    }
  },
};
