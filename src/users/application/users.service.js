import { UserRepository } from '@/users/domain/repositories/userRepository';

/* Instancia de la clase */
const userRepository = new UserRepository();

export async function getAllUsers() {
  const users = await userRepository.getAllUsers();

  return users;
}
