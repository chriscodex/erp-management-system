import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/db/mongodb';
import { User } from '@/backend/users/domain/models/user';
import bcryptjs from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        dni: { label: 'DNI', type: 'text', placeholder: '' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, req) {
        // eslint-disable-line
        await connectDB();

        const userFound = await User.findOne({
          dni: credentials?.dni,
          estado: 'activo',
        });

        if (!userFound)
          throw new Error('No se ha encontrado un usuario con ese DNI');

        const passwordMatch = await bcryptjs?.compare(
          credentials?.password,
          userFound?.password
        );
        if (!passwordMatch) throw new Error('Contraseña incorrecta');

        delete userFound?.password;

        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      // eslint-disable-line
      if (user) {
        delete user?.password;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Conectar a la base de datos
      await connectDB();
      // Verificar si el usuario sigue existiendo en la base de datos
      const userExists = await User.findOne({
        dni: token?.user?.dni,
        estado: 'activo',
      });
      if (!userExists) {
        throw new Error('Usuario invalidado.');
      }

      // Verificar si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      if (token.exp && token.exp < currentTime) {
        throw new Error('Token expirado, inicie sesión nuevamente.');
      }

      delete token?.user?.password;
      session.user = token?.user;
      if (!session?.user) {
        throw new Error('No se ha encontrado un usuario');
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24, // Refrescar cada 24 horas
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
