import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/libs/mongodb';
import { User } from '@/models/user';
import bcryptjs from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        dni: { label: 'DNI', type: 'text', placeholder: '' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, req) {
          await connectDB();

          const userFound = await User.findOne({ dni: credentials.dni });

          if (!userFound)
            throw new Error('No se ha encontrado un usuario con ese DNI');

          const passwordMatch = await bcryptjs.compare(
            credentials.password,
            userFound.password
          );
          if (!passwordMatch) throw new Error('Contraseña incorrecta');

          delete userFound.password;

          return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) {
        delete user?.password;
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      delete token.user.password;
      session.user = token.user;
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
});

export { handler as GET, handler as POST };
