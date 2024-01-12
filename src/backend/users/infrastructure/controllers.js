import { UsersService } from '@/backend/users/application/users.service';
import { connectDB } from '@/db/mongodb';

const userService = new UsersService();

export async function getAllUsersController() {
  try {
    await connectDB();
    const users = await userService.getAllUsers();
    return users;
  } catch (error) {
    console.error('Controller: Error fetching users:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllUsersController'
    );
  }
}

export async function getUserByDataController(userData) {
  try {
    await connectDB();
    const user = await userService.getUserByData(userData);
    return user;
  } catch (error) {
    console.error('Controller: Error buscando un usuario:', error);
    throw new Error('Controller: Internal Server Error - getUserController');
  }
}

export async function createUserController(user) {
  try {
    await connectDB();

    /* Responses { payload, status} */
    const createdUser = await userService.createUser(user);

    return createdUser;
  } catch (error) {
    console.error('Controller: Error creando el usuario:', error);
    throw new Error('Controller: Internal Server Error - createUserController');
  }
}

export async function updateUserController(dni, user) {
  try {
    await connectDB();
    const updatedUser = await userService.updateUser(dni, user);
    return updatedUser;
  } catch (error) {
    console.error('Controller: Error actualizando el usuario:', error);
    throw new Error('Controller: Internal Server Error - updateUserController');
  }
}

export async function deleteUserController(dni) {
  try {
    await connectDB();
    const deletedUser = await userService.deleteUser(dni);
    return deletedUser;
  } catch (error) {
    console.error('Controller: Error eliminando el usuario:', error);
    throw new Error('Controller: Internal Server Error - deleteUserController');
  }
}
