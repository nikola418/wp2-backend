import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
import { extrasService } from '../services/extras';

export const extrasController = {
  create: (req: Request, res: Response) => {
    const { text, price } = req.body;

    extrasService
      .create({ text, price })
      .then((extra) => res.status(HttpStatus.CREATED).json(extra))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },
  deleteById: (req: Request, res: Response) => {
    const id = req.params.id;

    extrasService
      .deleteById(id)
      .then((extra) => res.status(HttpStatus.OK).json(extra))
      .catch((err) =>
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: err.message }),
      );
  },
};
