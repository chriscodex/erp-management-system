import { User } from '@/backend/users/domain/models/user';

export class UserRepository {
  async getAllUsers() {
    try {
      const users = await User.find();

      if (users.length === 0) {
        console.log('No se encontraron usuarios');
        return null;
      }

      console.log('Usuarios encontrados');
      return users;
    } catch (error) {
      throw new Error(`Error al buscar todos los usuario: ${error.message}`);
    }
  }
  async getUser(dni) {
    try {
      const users = await User.findOne({ dni }).select('-password');

      if (!users) {
        console.log('Usuario no encontrado');
        return null;
      }

      console.log('Usuario encontrado');
      return users;
    } catch (error) {
      throw new Error(`Error al buscar un usuario: ${error.message}`);
    }
  }
  async createUser(user) {
    try {
      const newUser = new User(user);
      const savedUser = await newUser.save();

      console.log('Usuario creado exitosamente');
      return savedUser;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }
  async updateUser(dni, user) {
    try {
      const updatedUser = await User.findOneAndUpdate({ dni }, user, {
        new: true,
      }).select('-password');

      if (!updatedUser) {
        console.log('Usuario no encontrado para ser actualizado');
        return null;
      }

      console.log('Usuario actualizado exitosamente');
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }
  async deleteUser(dni) {
    try {
      const deletedUser = await User.findOneAndDelete({ dni });

      if (!deletedUser) {
        console.log('Usuario no encontrado para ser eliminado');
        return null;
      }

      console.log('Usuario encontrado y eliminado');
      return deletedUser;
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}
