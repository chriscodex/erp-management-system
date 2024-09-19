import { UserRepository } from '@/users/domain/repositories/userRepository';

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
