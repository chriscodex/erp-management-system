import { SearchedUser } from '@/users/domain/models/searchedUser';

export class SearchedUserRepository {
  async getSearchedUser(dni) {
    try {
      const users = await SearchedUser.find(dni);
      return users;
    } catch (error) {
      console.log(error);
    }
  }
}

// export { SearchedUserRepository };
