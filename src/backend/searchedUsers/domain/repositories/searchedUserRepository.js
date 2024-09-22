import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUserFromDatabase(dni) {
    try {
      const users = await SearchedUser.findOne({ dni: dni });

      if (!users) {
        console.log('Usuario no encontrado en la base de datos');
        return null;
      }
      console.log('Usuario encontrado en la base de datos');
      return users;
    } catch (error) {
      throw new Error(
        `Error al buscar el usuario en la base de datos: ${error.message}`
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
