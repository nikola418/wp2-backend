import { NextFunction, Request, Response } from 'express';
import usersService from '../services/users';
import { HttpStatus } from '../utils/enums';
import Logging from '../utils/logging/logging';
import { IUser, IUserModel } from '../models/users';

const create = (req: Request, res: Response, next: NextFunction) => {
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

  usersService
    .create({
      email,
      password,
      address,
      name,
      paymentMethod,
      phoneNumber,
      surname,
    })
    .then((user) => res.status(HttpStatus.CREATED).json(user))
    .catch((error) => {
      Logging.error(error);
      if (error.code === 11000)
        return res.status(HttpStatus.BAD_REQUEST).json({ error });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    });
};

const readAll = (req: Request, res: Response) => {
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
};

const readById = (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  const id = req.params.id;

  usersService
    .readById(id)
    .then((user) => res.status(HttpStatus.OK).json(user))
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
};

const updateById = (req: Request, res: Response) => {
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
};

const deleteById = (req: Request, res: Response) => {
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
};

const usersController = {
  create,
  readById,
  readAll,
  updateById,
  deleteById,
};

export default usersController;
