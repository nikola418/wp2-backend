import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth';
import { config } from '../config/config';
import { HttpStatus } from '../utils/enums';
import { usersService } from '../services/users';
import { IJwtPayload } from '../utils/jwt';

export const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Users']
    const {
      email,
      password,
      address,
      name,
      paymentMethod,
      phoneNumber,
      surname,
    } = req.body;

    try {
      const user = await usersService.create({
        email,
        password,
        address,
        name,
        paymentMethod,
        phoneNumber,
        surname,
      });
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  },
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Auth']
    const { email, password } = req.body;
    try {
      const token = await authService.signIn({ email, password });
      res
        .cookie(config.server.cookieName, token, {
          secure: false,
        })
        .status(HttpStatus.OK)
        .json({ message: 'Login Successful!' });
    } catch (err) {
      next(err);
    }
  },

  signOut: (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    if (req.cookies[config.server.cookieName]) {
      res
        .clearCookie(config.server.cookieName)
        .status(HttpStatus.OK)
        .json({ message: 'Logout Successful!' });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid Token!' });
    }
  },
  me: async (req: Request, res: Response, next: NextFunction) => {
    const authUser: IJwtPayload = req.user as IJwtPayload;
    try {
      const user = await usersService.readById(authUser.id);
      if (req.cookies[config.server.cookieName]) {
        return res.status(HttpStatus.OK).json(user);
      }
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    } catch (error) {
      next(error);
    }
  },
};
