import { SearchedUserRepository } from '@/backend/searchedUsers/domain/repositories/searchedUserRepository';

/* Instancia de la clase */
const searchedUserRepository = new SearchedUserRepository();

export async function getSearchedUser(dni) {
  const userFound = await searchedUserRepository.getSearchedUser(dni);
  return userFound;
}