import User, { IUser } from '../models/users';
import { hashPassword } from '../library/hash';

const selectQuery = {
  password: false,
};

const create = async (dto: IUser) => {
  // #swagger.tags = ['Users']
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

  return await user.save();
};

const readAll = async () => {
  return await User.find({}).select(selectQuery);
};

const readById = async (_id: string) => {
  return await User.findById(_id).select(selectQuery);
};

const updateById = (_id: string, dto: IUser) => {
  return User.findByIdAndUpdate(_id, dto, { new: true }).select(selectQuery);
};

const deleteById = async (_id: string) => {
  return await User.findByIdAndDelete(_id).select(selectQuery);
};

const usersService = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};

export default usersService;
