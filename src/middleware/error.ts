import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils/enums';
import { ValidationError } from 'joi';
import Logging from '../utils/logging/logging';
import { Exception } from '../utils/error/server-exception';
//handle Mongo errors
const handleDuplicateKeyError = (err: Error, res: Response) => {
  res
    .status(HttpStatus.CONFLICT)
    .send({ message: err.message, code: (err as any).code });
};

//handle Joi errors
const handleValidationError = (err: ValidationError, res: Response) => {
  const errors = Object.values(err.details).map((el) => el.message);
  const fields = Object.values(err.details).map((el) => el.path);
  if (errors.length > 1) {
    const formattedErrors = errors.join('');
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ messages: formattedErrors, fields: fields });
  } else {
    res
      .status(HttpStatus.BAD_REQUEST)
      .send({ messages: errors, fields: fields });
  }
};

const handleException = (err: Exception, res: Response) => {
  console.log(err);
  res.status(err.status).json({ status: err.status, message: err.message });
};

//error controller function
export const errorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Logging.error(err);
    if (err.name === 'ValidationError') {
      handleValidationError(err as ValidationError, res);
    }
    if ((err as any).code === 11000) {
      handleDuplicateKeyError(err, res);
    }
    if (err instanceof Exception) {
      handleException(err as Exception, res);
    }
  } catch (err) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'An unknown error occured.', error: err });
  }
};
