import { User } from '@/backend/users/domain/models/user';

export class UserRepository {
  async getAllUsers() {
    try {
      const users = await User.find();

      if (users.length === 0) {
        console.log('Repository: No se encontraron usuarios');
        return null;
      }

      console.log('Repository: Usuarios encontrados');
      return users;
    } catch (error) {
      console.error(
        `Repository: Error al buscar todos los usuario: ${error.message}`
      );
      throw new Error(`Error al buscar todos los usuario: ${error.message}`);
    }
  }
  async getUser(dni) {
    try {
      const user = await User.findOne({ dni }).select('-password');

      if (!user) {
        console.log('Repository: Usuario no encontrado');
        return null;
      }

      console.log('Repository: Usuario encontrado');
      return user;
    } catch (error) {
      console.error(`Repository: Error al buscar un usuario: ${error.message}`);
      throw new Error(`Error al buscar un usuario: ${error.message}`);
    }
  }
  async createUser(user) {
    try {
      const newUser = new User(user);
      const savedUser = await newUser.save();

      console.log('Repository: Usuario creado exitosamente');
      return savedUser;
    } catch (error) {
      console.log(`Repository: Error al crear usuario: ${error.message}`);
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }
  async updateUser(dni, user) {
    try {
      const updatedUser = await User.findOneAndUpdate({ dni }, user, {
        new: true,
      }).select('-password');

      if (!updatedUser) {
        console.log('Repository: Usuario no encontrado para ser actualizado');
        return null;
      }

      console.log('Repository: Usuario actualizado exitosamente');
      return updatedUser;
    } catch (error) {
      console.error(
        `Repository: Error al actualizar usuario: ${error.message}`
      );
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }
  async deleteUser(dni) {
    try {
      const deletedUser = await User.findOneAndDelete({ dni });

      if (!deletedUser) {
        console.log('Repository: Usuario no encontrado para ser eliminado');
        return null;
      }

      console.log('Repository: Usuario encontrado y eliminado');
      return deletedUser;
    } catch (error) {
      console.error(`Repository: Error al eliminar usuario: ${error.message}`);
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}
