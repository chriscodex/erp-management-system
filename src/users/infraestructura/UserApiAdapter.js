// infrastructure/adapters/UserApiAdapter.js
import { UserService } from '@/users/application/users.service';
import { UserRepository } from '@/users/domain/repositories/userRepository';

export class UserApiAdapter {
  constructor(userRepository) { // Acepta un repositorio como argumento
    this.userRepository = userRepository || new UserRepository(); // Usa el proporcionado o el real
    this.userService = new UserService(this.userRepository);
  }

  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  async createUser(user) {
    return this.userService.createUser(user);
  }
}
