import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
import { pizzasService } from '../services/pizzas';

export const pizzasController = {
  create: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const { desc, extras, sizes, title, img } = req.body;

    pizzasService
      .create({ desc, extras, sizes, title, img })
      .then((pizza) => res.status(HttpStatus.CREATED).json({ pizza }))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },

  readAll: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    pizzasService
      .readAll()
      .then((pizzas) => res.status(HttpStatus.OK).json(pizzas))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },

  readById: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const id = req.params.id;

    pizzasService
      .readById(id)
      .then((pizza) => res.status(HttpStatus.OK).json(pizza))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },
  readPizzasOfTheDay: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // #swagger.tags = ['Pizzas']

    try {
      const pizzas = await pizzasService.readPizzasOfTheDay();
      res.status(HttpStatus.OK).json(pizzas);
    } catch (error) {
      next(error);
    }
  },

  updateById: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const id = req.params.id;
    const { desc, extras, sizes, title, img } = req.body;

    pizzasService
      .updateById(id, { desc, extras, sizes, title, img })
      .then((pizza) => res.status(HttpStatus.OK).json(pizza))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },

  deleteById: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const id = req.params.id;

    pizzasService
      .deleteById(id)
      .then((pizza) => res.status(HttpStatus.OK).json(pizza))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },
};
