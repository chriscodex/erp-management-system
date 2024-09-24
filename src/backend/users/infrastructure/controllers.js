import { createUser } from '@/backend/users/application/users.service';
import { connectDB } from '@/db/mongodb';

export async function createUserController(user) {
  try {
    await connectDB();

    /* Responses { payload, status} */
    const createdUser = await createUser(user);

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Internal Server Error - createUserController');
  }
}
