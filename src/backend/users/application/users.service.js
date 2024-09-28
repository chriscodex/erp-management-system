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
        return {
          status: 404,
          payload: 'No se encontraron usuarios',
        };
      }

      return {
        status: 200,
        payload: users,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getUser(dni) {
    try {
      const userFound = await this.userRepository.getUser(dni);

      if (!userFound) {
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

      return {
        status: 200,
        payload: userFound,
      };
    } catch (error) {
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
        console.log('Error de validación de schema de usuario al crear');
        return {
          status: 400,
          payload: userValidated.error.issues,
        };
      }

      // Validar si el usuario ya existe
      const userFound = await this.userRepository.getUser(user.dni);
      if (userFound) {
        return {
          status: 409,
          payload: 'El usuario ya existe',
        };
      }

      // Crear el usuario
      const userCreated = await this.userRepository.createUser({
        ...user,
        estado: true,
      });

      const userCreatedObject = userCreated.toObject();
      delete userCreatedObject.password;

      return {
        status: 201,
        payload: userCreatedObject,
      };
    } catch (error) {
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
        console.log('Error de validación de schema de usuario al actualizar');
        return {
          status: 400,
          payload: userValidated.error.issues,
        };
      }

      const userUpdated = await this.userRepository.updateUser(dni, user);

      if (!userUpdated) {
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

      return {
        status: 200,
        payload: userUpdated,
      };
    } catch (error) {
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
        return {
          status: 404,
          payload: 'El usuario no existe',
        };
      }

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
