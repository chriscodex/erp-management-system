import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUserFromDatabase(dni) {
    try {
      const users = await SearchedUser.find({ dni: dni });
      console.log('Usuario encontrado en la base de datos');
      return users;
    } catch (error) {
      throw new Error(
        `Error al buscar el usuario en la base de datos: ${error.message}`
      );
    }
  }
}
