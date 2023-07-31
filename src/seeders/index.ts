import { connect } from '../utils/db-connection/mongoose-connection';
import { config } from '../config/config';
import Logging from '../utils/logging/logging';
import { exit } from 'process';
import User, { IUser } from '../models/users';
import { hashPassword } from '../utils/bcrypt/hash';
import { UserRole } from '../models/enums';

const seed = async () => {
  try {
    const conn = await connect();
    const adminEmail = config.seed.adminEmail;
    const adminPass = config.seed.adminPass;
    if (adminEmail && adminPass) {
      const user = new User({
        email: adminEmail,
        password: hashPassword(adminPass),
        role: UserRole.Admin,
      });
      await user.save();
      Logging.info('Successfully seeded the database!');
    } else throw new Error('Admin credentials undefined');
  } catch (error) {
    Logging.error(error);
  }
};

seed().then(() => exit());
