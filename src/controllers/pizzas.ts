import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
import { pizzasService } from '../services/pizzas';

export const pizzasController = {
  create: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const { desc, extraOptions, sizes, title, img } = req.body;

    pizzasService
      .create({ desc, extraOptions, sizes, title, img })
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
      .then((pizzas) => res.status(HttpStatus.OK).json({ pizzas }))
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

  updateById: (req: Request, res: Response) => {
    // #swagger.tags = ['Pizzas']
    const id = req.params.id;
    const { desc, extraOptions, sizes, title, img } = req.body;

    pizzasService
      .updateById(id, { desc, extraOptions, sizes, title, img })
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
