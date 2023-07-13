import User, { IUser } from '../models/users';
import { hashPassword } from '../utils/bcrypt/hash';

const selectQuery = {
  password: false,
};

export const usersService = {
  create: async (dto: IUser) => {
    const {
      email,
      password,
      address,
      name,
      paymentMethod,
      phoneNumber,
      surname,
    } = dto;

    const user = new User({
      email,
      password: hashPassword(password),
      name,
      surname,
      address,
      phoneNumber,
      paymentMethod,
    });

    return user.save();
  },

  readAll: async () => {
    return await User.find({}).select(selectQuery);
  },

  readById: async (_id: string) => {
    return await User.findById(_id).select(selectQuery);
  },

  updateById: (_id: string, dto: Partial<IUser>) => {
    return User.findByIdAndUpdate(
      _id,
      { ...dto, password: dto.password && hashPassword(dto.password) },
      { new: true },
    ).select(selectQuery);
  },

  deleteById: async (_id: string) => {
    return await User.findByIdAndDelete(_id).select(selectQuery);
  },
};
