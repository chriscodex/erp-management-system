import { zod } from 'zod';

import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { createUserSchema } from '@/backend/users/application/validations/createUserSchema';

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
  async createUser(user) {
    try {
      const userValidated = createUserSchema.safeParse(user);
      // ...
    } catch (error) {}
  }
}
