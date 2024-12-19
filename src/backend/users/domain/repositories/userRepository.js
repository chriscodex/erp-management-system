import mongoose from 'mongoose';

import { User } from '@/backend/users/domain/models/user';

export class UserRepository {
  async getAllUsers() {
    try {
      const users = await User.find();

      if (users.length === 0) {
        console.log('User Repository: No se encontraron usuarios');
        return [];
      }

      console.log('User Repository: Usuarios encontrados');
      return users;
    } catch (error) {
      console.error(
        `User Repository: Error al buscar todos los usuarios: ${error.message}`
      );
      throw new Error(`Error al buscar todos los usuarios: ${error.message}`);
    }
  }
  async getUserByData(userData) {
    try {
      if (!userData) {
        console.log('User Repository: Usuario no proporcionado');
        return null;
      }

      const filter = {};

      if (userData.id) {
        filter._id = new mongoose.Types.ObjectId(userData.id);
      }

      if (userData.dni) {
        filter.dni = userData.dni;
      }

      const userFound = await User.findOne(filter).select('-password');

      if (!userFound) {
        console.log('User Repository: Usuario no encontrado');
        return null;
      }

      console.log('User Repository: Usuario encontrado');
      return userFound;
    } catch (error) {
      console.error(
        `User Repository: Error al buscar un usuario: ${error.message}`
      );
      throw new Error(`Error al buscar un usuario: ${error.message}`);
    }
  }
  async createUser(user) {
    try {
      const newUser = new User(user);
      const savedUser = await newUser.save();

      console.log('User Repository: Usuario creado correctamente');
      return savedUser;
    } catch (error) {
      console.log(`User Repository: Error al crear usuario: ${error.message}`);
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }
  async updateUser(userId, user) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(userId) },
        user,
        {
          new: true,
        }
      ).select('-password');

      if (!updatedUser) {
        console.log(
          'User Repository: Usuario no encontrado para ser actualizado'
        );
        return null;
      }

      console.log('User Repository: Usuario actualizado correctamente');
      return updatedUser;
    } catch (error) {
      console.error(
        `User Repository: Error al actualizar usuario: ${error.message}`
      );
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }
  async deleteUser(userId) {
    try {
      const deletedUser = await User.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(userId),
      });

      if (!deletedUser) {
        console.log(
          'User Repository: Usuario no encontrado para ser eliminado'
        );
        return null;
      }

      console.log('User Repository: Usuario encontrado y eliminado');
      return deletedUser;
    } catch (error) {
      console.error(
        `User Repository: Error al eliminar usuario: ${error.message}`
      );
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}
