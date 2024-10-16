import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";

import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    ],
    
    callbacks: {
    async session({ session, user }) {
      // Fazendo a consulta para buscar o relacionamento `student`
      const userWithStudent = await db.user.findUnique({
        where: { id: user.id },
        include: {
          student: true, // Incluir o relacionamento student
          gymAdmin:true,
        },
      });

      // Adiciona os dados de `student` na sessão do usuário
      session.user = {
        ...session.user,
        id: user.id,
        student: userWithStudent?.student, // Incluindo o campo student na sessão
        gymAdmin: userWithStudent?.gymAdmin || null
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}