import { zod } from 'zod';

import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { createUserSchema } from '@/backend/users/validations/createUserSchema';

const userRepository = new UserRepository();

export async function createUser(newUser) {
  try {
    const userValidated = createUserSchema.safeParse(newUser);
  } catch (error) {
    
  }
}
