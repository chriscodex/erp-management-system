import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUser(dni) {
    try {
      const users = await SearchedUser.find({ dni: dni });
      return users;
    } catch (error) {
      throw new Error(`Error al buscar el usuario: ${error.message}`);
    }
  }
}
