import bcryptjs from 'bcryptjs';
import { UserRepository } from '@/backend/users/domain/repositories/userRepository';
import { createUserSchema } from '@/backend/users/application/validations/createUserSchema';
import { updateUserSchema } from '@/backend/users/application/validations/updateUserSchema';

export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();

      if (users?.length === 0) {
        
        console.log('User Service: No se encontraron usuarios');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('User Service: Usuarios encontrados');
      return {
        status: 200,
        payload: users,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al buscar todos los usuarios: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getUserByData(userData) {
    try {
      const userFound = await this.userRepository.getUserByData(userData);

      if (!userFound) {
        console.log('User Service: El usuario no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('User Service: El usuario existe');
      return {
        status: 200,
        payload: userFound,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al buscar un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getAllMecanicos() {
    try {
      const mecanicos = await this.userRepository.getAllMecanicos();

      if (mecanicos?.length === 0) {
        
        console.log('User Service: No se encontraron mecanicos');
        return {
          status: 200,
          payload: [],
        };
      }

      console.log('User Service: Mecanicos encontrados');
      return {
        status: 200,
        payload: mecanicos,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al buscar todos los mecanicos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async getUsersBySucursal(sucursalId) {
      try {
        const usersFound = await this.userRepository.getUsersBySucursal(sucursalId);
  
        if (!usersFound) {
          console.log('User Service: Los usuarios no existen');
          return {
            status: 200,
            payload: null,
          };
        }
  
        console.log('User Service: Los usuarios existen');
        return {
          status: 200,
          payload: usersFound,
        };
      } catch (error) {
        console.error(
          `User Service: Error interno al buscar los usuarios: ${error.message}`
        );
        return {
          status: 500,
          payload: error.message,
        };
      }
    }
  async createUser(user) {
    try {

      // Validar los datos del usuario enviado con el schema
      const userValidated = createUserSchema.safeParse(user);

      if (!userValidated.success) {
        const formattedErrors = userValidated.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        console.log("Pedido Service: Error de validación", formattedErrors);

        return {
          status: 400,
          payload: formattedErrors,
        };
      }

      // Validar si el usuario ya existe
      const userFound = await this.userRepository.getUserByData(user);
      if (userFound) {
        console.log('User Service: El usuario ya existe');
        return {
          status: 409,
          payload: 'El usuario ya existe',
        };
      }

      // Encriptar la contraseña
      const { password } = user;
      const passwordHash = await bcryptjs.hash(password, 12);

      // Crear el objeto de usuario
      const userObject = {
        ...user,
        password: passwordHash,
        estado: 'activo',
      };

      // Crear el usuario
      const userCreated = await this.userRepository.createUser(userObject);

      const userCreatedObject = userCreated.toObject();
      delete userCreatedObject.password;

      console.log('User Service: Usuario creado correctamente');
      return {
        status: 201,
        payload: userCreatedObject,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al crear un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async updateUser(userId, userData) {
    try {
      // Validar los datos del usuario enviado con el schema
      const userValidated = updateUserSchema.safeParse(userData);

      if (!userValidated.success) {
        console.log(
          'User Service: Error de validación de schema de usuario al actualizar'
        );
        return {
          status: 400,
          payload: userValidated.error.issues,
        };
      }

      // Validar si una usuario con el mismo DNI existe
      if (userData.dni) {
        const userFound = await this.userRepository.getUserByData(userData);
        if (userFound && userFound?._id !== userId) {
          console.log('User Service: Un usuario con el mismo dni ya existe');
          return {
            status: 409,
            payload: 'Un usuario con el mismo dni ya existe',
          };
        }
      }

      if (userData.password) {
        const { password } = userData;
        const passwordHash = await bcryptjs.hash(password, 12);
        userData.password = passwordHash;
      }

      const userUpdated = await this.userRepository.updateUser(
        userId,
        userData
      );

      if (!userUpdated) {
        console.log('User Service: El usuario no existe');
        return {
          status: 200,
          payload: userUpdated,
        };
      }

      console.log('User Service: Usuario actualizado correctamente');
      return {
        status: 200,
        payload: userUpdated,
      };
    } catch (error) {
      console.error(
        `User Service: Error interno al actualizar un usuario: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
  async deleteUser(userId) {
    try {
      const userDeleted = await this.userRepository.deleteUser(userId);

      if (!userDeleted) {
        console.log('User Service: El usuario no existe');
        return {
          status: 200,
          payload: null,
        };
      }

      console.log('User Service: Usuario eliminado correctamente');
      return {
        status: 204,
        payload: userDeleted,
      };
    } catch (error) {
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}
