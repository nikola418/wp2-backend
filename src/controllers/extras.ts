import { Request, Response } from 'express';
import { HttpStatus } from '../library/enums';
import extrasService from '../services/extra';

const create = (req: Request, res: Response) => {
  const { text, price } = req.body;

  extrasService
    .create({ text, price })
    .then((extra) => res.status(HttpStatus.CREATED).json(extra))
    .catch((err) =>
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

const extrasController = { create };

export default extrasController;
