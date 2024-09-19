import bcryptjs from 'bcryptjs';

import { User } from '@/users/domain/models/user';

export class UserRepository {
  async createUser(user) {
    try {
      const { password } = user;
      const passwordHash = await bcryptjs.hash(password, 12);

      const newUser = new User({
        ...user,
        password: passwordHash,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}
