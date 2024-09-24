import { UsersService } from '@/backend/users/application/users.service';
import { connectDB } from '@/db/mongodb';

const userService = new UsersService();

export async function createUserController(user) {
  try {
    await connectDB();

    /* Responses { payload, status} */
    const createdUser = await userService.createUser(user);

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Internal Server Error - createUserController');
  }
}

export async function getAllUsersController() {
  try {
    await connectDB();
    const users = await userService.getAllUsers();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Internal Server Error - getAllUsersController');
  }
}
