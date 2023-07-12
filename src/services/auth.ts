import { comparePasswords } from '../utils/bcrypt/hash';
import ILogin from '../utils/interfaces/login';
import { IJwtPayload, generateAuthToken } from '../utils/jwt';
import User, { IUser } from '../models/users';

const login = async (dto: ILogin) => {
  const { email, password } = dto;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found!');
  }

  if (!comparePasswords(password, user.password))
    throw new Error('Bad request!');

  const payload: IJwtPayload = {
    email: user.email,
    __v: user.__v,
    _id: user._id.toString(),
    address: user.address,
    name: user.name,
    surname: user.surname,
    paymentMethod: user.paymentMethod,
    phoneNumber: user.phoneNumber,
  };

  return generateAuthToken(payload);
};

const authService = { login };

export default authService;
