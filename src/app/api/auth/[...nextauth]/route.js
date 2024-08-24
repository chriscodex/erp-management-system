import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from '@/libs/mongodb'
import User from '@/models/user'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        dni: { label: "DNI", type: "text", placeholder: "" },
        contraseña: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials, req) {
        const client = await connectDB()
        const user = {
          dni: credentials.dni,
          apellidos: "Perez",
          nombres: "Juan",
          celular: "1234567890",
          password: credentials.contrasenya
        }
        return user
      }
    })
  ]
})

export { handler as GET, handler as POST }