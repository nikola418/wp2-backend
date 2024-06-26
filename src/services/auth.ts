import User, { IUserModel } from '../models/users';
import { comparePasswords } from '../utils/bcrypt/hash';
import { HttpStatus } from '../utils/enums';
import { Exception } from '../utils/error/server-exception';
import ILogin from '../utils/interfaces/login';
import { IJwtPayload, generateAuthToken } from '../utils/jwt';

export const authService = {
  signIn: async (dto: ILogin) => {
    const { email, password } = dto;
    const user = await User.findOne<IUserModel>({ email });

    if (!user) {
      throw new Error('User not found!');
    }

    if (!comparePasswords(password, user.password))
      throw new Exception(HttpStatus.BAD_REQUEST);

    const payload: IJwtPayload = {
      email: user.email,
      id: user.id,
      address: user.address,
      name: user.name,
      surname: user.surname,
      paymentMethod: user.paymentMethod,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    return generateAuthToken(payload);
  },
};
