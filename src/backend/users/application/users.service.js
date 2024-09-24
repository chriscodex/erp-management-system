import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { createUserSchema } from '@/backend/users/application/validations/createUserSchema';

export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      if (users.length === 0) {
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
  async createUser(user) {
    try {
      // Validar los tipos de datos del usuario enviado
      const userValidated = createUserSchema.safeParse(user);

      if (!userValidated.success) {
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
      const userCreated = await this.userRepository.createUser(user);

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
}
