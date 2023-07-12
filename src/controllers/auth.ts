import { Request, Response } from 'express';
import { authService } from '../services/auth';
import { config } from '../config/config';
import { HttpStatus } from '../utils/enums';

export const authController = {
  login: (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = authService.login({ email, password });
      res
        .cookie(config.server.cookieName, token, {
          httpOnly: true,
          domain: config.server.origin,
          secure: false,
          expires: new Date(config.server.jwtExpirationTime),
        })
        .status(HttpStatus.OK)
        .json({ message: 'Login Successful!' });
    } catch (err) {
      return;
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
