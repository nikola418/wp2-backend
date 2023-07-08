import { Request, Response } from 'express';
import { HttpStatus } from '../library/enums';
import pizzasService from '../services/pizza';

const create = (req: Request, res: Response) => {
  // #swagger.tags = ['Pizzas']
  const dto = req.body;
  return pizzasService
    .create(dto)
    .then((pizza) => res.status(HttpStatus.CREATED).json({ pizza }))
    .catch((err) =>
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

const readAll = (req: Request, res: Response) => {
  // #swagger.tags = ['Pizzas']
  return pizzasService
    .readAll()
    .then((pizzas) => res.status(HttpStatus.OK).json({ pizzas }))
    .catch((err) =>
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

const pizzasController = {
  create,
  readAll,
};

export default pizzasController;
