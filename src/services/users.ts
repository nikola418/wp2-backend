import User, { IUser } from '../models/users';
import { hashPassword } from '../library/hash';

const create = (dto: IUser) => {
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
};

const readAll = async () => {
  return await User.find({});
};

const readById = async (_id: string) => {
  return await User.findById(_id);
};

const updateById = () => {
  return;
};

const deleteById = () => {
  return;
};

export default {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};
