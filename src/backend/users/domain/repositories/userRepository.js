import bcryptjs from 'bcryptjs';

import { User } from '@/backend/users/domain/models/user';

export class UserRepository {
  async getAllUsers() {
    try {
      const users = await User.find();
      console.log('Usuarios encontrado');
      return users;
    } catch (error) {
      throw new Error(`Error al buscar todos los usuario: ${error.message}`);
    }
  }
  async getUser(dni) {
    try {
      const users = await User.findOne({ dni });
      console.log('Usuario encontrado');
      return users;
    } catch (error) {
      throw new Error(`Error al buscar un usuario: ${error.message}`);
    }
  }
  async createUser(user) {
    try {
      const { password } = user;
      const passwordHash = await bcryptjs.hash(password, 12);

      const newUser = new User({
        ...user,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      console.log('Usuario creado exitosamente');
      return savedUser;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }
}
