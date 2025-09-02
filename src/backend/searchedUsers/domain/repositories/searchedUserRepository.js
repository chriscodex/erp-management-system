import { SearchedUser } from '@/backend/searchedUsers/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUserFromDatabaseByDni(dni) {
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
        `Error al buscar un searchedUser en la base de datos: ${error.message}`,
      );
    }
  }
  async getSearchedUserFromDatabaseByRuc(ruc) {
    try {
      const searchedUser = await SearchedUser.findOne({ ruc: ruc });

      if (!searchedUser) {
        console.log('SearchedUser no encontrado en la base de datos');
        return null;
      }
      console.log('SearchedUser encontrado en la base de datos');
      return searchedUser;
    } catch (error) {
      throw new Error(
        `Error al buscar un searchedUser en la base de datos: ${error.message}`,
      );
    }
  }
  async createSearchedUserByDni(dni, apellidos, nombres) {
    try {
      const searchedUser = new SearchedUser({ dni, apellidos, nombres });
      await searchedUser.save();
      console.log('SearchedUser creado en la base de datos');
      return searchedUser;
    } catch (error) {
      throw new Error(
        `Error al crear el searchedUser en la base de datos: ${error.message}`,
      );
    }
  }
  async createSearchedUserByRuc(ruc, razonSocial) {
    try {
      const searchedUser = new SearchedUser({ ruc, razonSocial });
      await searchedUser.save();
      console.log('SearchedUser creado en la base de datos');
      return searchedUser;
    } catch (error) {
      throw new Error(
        `Error al crear el searchedUser en la base de datos: ${error.message}`,
      );
    }
  }
}
