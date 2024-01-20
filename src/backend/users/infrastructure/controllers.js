import { UsersService } from '@/backend/users/application/users.service';
import { connectDB } from '@/db/mongodb';

const userService = new UsersService();

export async function getUsersController() {
  try {
    await connectDB();
    const users = await userService.getAllUsers();
    return users;
  } catch (error) {
    console.error(
      'Users Controller: Error interno al obtener todos los usuarios:',
      error.message
    );
    throw new Error(
      'Users Controller: Error interno al obtener todos los usuarios'
    );
  }
}

export async function getUserByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { dni } = params;

    await connectDB();

    const user = await userService.getUserByData({ dni });
    return user;
  } catch (error) {
    console.error(
      'Users Controller: Error interno al obtener el usuario:',
      error.message
    );
    throw new Error('Users Controller: Error interno al obtener el usuario');
  }
}

export async function createUserController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdUser = await userService.createUser(body);

    return createdUser;
  } catch (error) {
    console.error(
      'Users Controller: Error interno al crear el usuario:',
      error.message
    );
    throw new Error('Users Controller: Error interno al crear el usuario');
  }
}

export async function updateUserController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { dni } = params;
    const body = await request.json();

    await connectDB();

    const updatedUser = await userService.updateUser(dni, body);
    return updatedUser;
  } catch (error) {
    console.error(
      'Users Controller: Error interno al actualizar el usuario:',
      error.message
    );
    throw new Error('Users Controller: Error interno al actualizar el usuario');
  }
}

export async function deleteUserController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { dni } = params;

    await connectDB();

    const deletedUser = await userService.deleteUser(dni);
    return deletedUser;
  } catch (error) {
    console.error(
      'Users Controller: Error interno eliminando el usuario:',
      error.message
    );
    throw new Error('Users Controller: Error interno eliminando el usuario');
  }
}
