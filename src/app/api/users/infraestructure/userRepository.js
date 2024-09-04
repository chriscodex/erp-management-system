import bcryptjs from 'bcryptjs';

import { User } from '@/models/user';

const userRepository = {
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
  },
};

export { userRepository };
