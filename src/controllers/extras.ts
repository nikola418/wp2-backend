import { Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
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

const deleteById = (req: Request, res: Response) => {
  const id = req.params.id;

  extrasService
    .deleteById(id)
    .then((extra) => res.status(HttpStatus.OK).json(extra))
    .catch((err) =>
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message }),
    );
};

const extrasController = { create, deleteById };

export default extrasController;
