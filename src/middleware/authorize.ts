import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../utils/enums';
import { IJwtPayload } from '../utils/jwt';
import { UserRole } from '../models/enums';

export default function (roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    let role = (req.user as IJwtPayload)?.role;
    role = role as UserRole;
    if (roles.includes(role)) return next();

    res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');
  };
}
