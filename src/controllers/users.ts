import { Request, Response } from 'express';
import usersService from '../services/users';
import { IUser } from '../models/users';
import { HttpStatus } from '../library/enums';
import Logging from '../library/logging';

const create = (req: Request, res: Response) => {
  // #swagger.tags = ['Users']
  const dto: IUser = req.body;

  usersService
    .create(dto)
    .then((user) => res.status(HttpStatus.CREATED).json({ user }))
    .catch((error) => {
      Logging.error(error);
      console.log(Object.keys(error));
      if (error.code === 11000)
        return res.status(HttpStatus.BAD_REQUEST).json({ error });
    });
};

const readAll = (req: Request, res: Response) => {
  // #swagger.tags = ['Users']

  usersService
    .readAll()
    .then((users) => res.status(HttpStatus.OK).json({ users }))
    .catch((error) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error }),
    );
};
// const readAuthor = (req: Request, res: Response, next: NextFunction) => {
//   // #swagger.tags = ['Authors']
//   const authorId = req.params.authorId;

//   return Author.findById(authorId)
//     .then((author) =>
//       author
//         ? res.status(200).json({ author })
//         : res.status(404).json({ message: 'Not Found' }),
//     )
//     .catch((error) => res.status(500).json({ error }));
// };

// const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
//   // #swagger.tags = ['Authors']
//   const authorId = req.params.authorId;

//   return Author.findById(authorId)
//     .then((author) => {
//       if (author) {
//         author.set(req.body);
//         return author
//           .save()
//           .then((author) => res.status(201).json({ author }))
//           .catch((error) => res.status(500).json({ message: 'Not Found' }));
//       } else {
//         res.status(404).json({ message: 'Not Found' });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
//   // #swagger.tags = ['Authors']
//   const authorId = req.params.authorId;

//   return Author.findByIdAndDelete(authorId)
//     .then((author) =>
//       author
//         ? res.status(201).json({ message: 'deleted' })
//         : res.status(404).json({ message: 'Not Found' }),
//     )
//     .catch((error) => res.status(500).json({ error }));
// };

export default {
  create,
  //   readById,
  readAll,
  //   updateById,
  //   deleteById,
};
