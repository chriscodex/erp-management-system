import bcryptjs from 'bcryptjs';
import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { createUserSchema } from '@/backend/users/application/validations/createUserSchema';
import { updateUserSchema } from '@/backend/users/application/validations/updateUserSchema';

export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();

      if (!users) {
        console.log('User Service: No se encontraron usuarios');
        return {
          status: 404,
          payload: 'No se encontraron usuarios',
        };
      }

      console.log('User Service: Usuarios encontrados');
      return {
        status: 200,
        payload: users,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al buscar todos los usuarios: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getUserByData(userData) {
    try {
      const userFound = await this.userRepository.getUserByData(userData);

      if (!userFound) {
        console.log('User Service: El usuario no existe');
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

      console.log('User Service: El usuario existe');
      return {
        status: 200,
        payload: userFound,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al buscar un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async createUser(user) {
    try {
      // Validar los datos del usuario enviado con el schema
      const userValidated = createUserSchema.safeParse(user);

      if (!userValidated.success) {
        console.log(
          'User Service: Error de validación de schema de usuario al crear'
        );
        return {
          status: 400,
          payload: userValidated.error.issues,
        };
      }

      // Validar si el usuario ya existe
      const userFound = await this.userRepository.getUserByData(user);
      if (userFound) {
        console.log('User Service: El usuario ya existe');
        return {
          status: 409,
          payload: 'El usuario ya existe',
        };
      }

      // Encriptar la contraseña
      const { password } = user;
      const passwordHash = await bcryptjs.hash(password, 12);

      // Crear el objeto de usuario
      const userObject = {
        ...user,
        password: passwordHash,
        estado: 'activo',
      };

      // Crear el usuario
      const userCreated = await this.userRepository.createUser(userObject);

      const userCreatedObject = userCreated.toObject();
      delete userCreatedObject.password;

      console.log('User Service: Usuario creado exitosamente');
      return {
        status: 201,
        payload: userCreatedObject,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al crear un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateUser(dni, user) {
    try {
      // Validar los datos del usuario enviado con el schema
      const userValidated = updateUserSchema.safeParse(user);

      if (!userValidated.success) {
        console.log(
          'User Service: Error de validación de schema de usuario al actualizar'
        );
        return {
          status: 400,
          payload: userValidated.error.issues,
        };
      }

      if (user.password) {
        const { password } = user;
        const passwordHash = await bcryptjs.hash(password, 12);
        user.password = passwordHash;
      }

      const userUpdated = await this.userRepository.updateUser(dni, user);

      if (!userUpdated) {
        console.log('User Service: El usuario no existe');
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

      console.log('User Service: Usuario actualizado exitosamente');
      return {
        status: 200,
        payload: userUpdated,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al actualizar un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteUser(dni) {
    try {
      const userDeleted = await this.userRepository.deleteUser(dni);

      if (!userDeleted) {
        console.log('User Service: El usuario no existe');
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

      console.log('User Service: Usuario eliminado exitosamente');
      return {
        status: 204,
        payload: userDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
