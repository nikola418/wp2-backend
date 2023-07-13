import { NextFunction, Request, Response } from 'express';
import { usersService } from '../services/users';
import { HttpStatus } from '../utils/enums';

export const usersController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
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

  readAll: (req: Request, res: Response) => {
    // #swagger.tags = ['Users']

    usersService
      .readAll()
      .then((users) => res.status(HttpStatus.OK).json(users))
      .catch((err) =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
      );
  },

  readById: (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    const id = req.params.id;

    usersService
      .readById(id)
      .then((user) => {
        res.status(HttpStatus.OK).json(user);
      })
      .catch((err) =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
      );
  },

  updateById: (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    const id = req.params.id;
    const {
      email,
      password,
      address,
      name,
      paymentMethod,
      phoneNumber,
      surname,
    } = req.body;

    usersService
      .updateById(id, {
        email,
        password,
        address,
        name,
        paymentMethod,
        phoneNumber,
        surname,
      })
      .then((user) => res.status(HttpStatus.ACCEPTED).json(user))
      .catch((err) =>
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
      );
  },

  deleteById: (req: Request, res: Response) => {
    // #swagger.tags = ['Users']
    const id = req.params.id;

    usersService
      .deleteById(id)
      .then((user) => res.status(201).json(user))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },
};
