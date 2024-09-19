export class UserService {
  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  async getAllUsers() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
