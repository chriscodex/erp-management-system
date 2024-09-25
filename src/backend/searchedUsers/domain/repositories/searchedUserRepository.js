import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUserFromDatabase(dni) {
    try {
      const searchedUser = await SearchedUser.findOne({ dni: dni });

      if (!searchedUser) {
        console.log('SearchedUser no encontrado en la base de datos');
        return null;
      }
      console.log('SearchedUser encontrado en la base de datos');
      return searchedUser;
    } catch (error) {
      throw new Error(
        `Error al buscar un searchedUser en la base de datos: ${error.message}`
      );
    }
  }
  async createSearchedUser(dni, apellidos, nombres) {
    try {
      const searchedUser = new SearchedUser({ dni, apellidos, nombres });
      await searchedUser.save();
      console.log('SearchedUser creado en la base de datos');
      return searchedUser;
    } catch (error) {
      throw new Error(
        `Error al crear el searchedUser en la base de datos: ${error.message}`
      );
    }
  }
}
