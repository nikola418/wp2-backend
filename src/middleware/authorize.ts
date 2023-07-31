import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/enums';
import { IJwtPayload } from '../utils/jwt';
import { UserRole } from '../models/enums';

export default function (roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req.user as IJwtPayload)?.role;

    if (role && roles.includes(role.value)) return next();

    res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
  };
}
