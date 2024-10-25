import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";


import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'
import { GymAdmin, Student } from "@prisma/client";

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
     InstagramProvider({
    clientId: process.env.INSTAGRAM_CLIENT_ID as string,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string ,
    
  })
    ],
    
     session: {
    strategy: "jwt",
  },

   callbacks: {
    
    async jwt({ token, user }) {

      const userWithStudent = await db.user.findUnique({
        where: { id: user.id },
        include: {
          student: true, // Incluir o relacionamento student
          gymAdmin:true,
        },
      });
      // Adiciona dados ao token JWT
      if (userWithStudent) {
        token.id = userWithStudent.id;
        token.student = userWithStudent.student || null;
        token.gymAdmin = userWithStudent.gymAdmin || null;
      }
      return token;
    },
    async session({ session, token }) {
      // Adiciona dados da sessão com base no JWT
      session.user = {
        ...session.user,
        id: token.id as string ,
        student: token.student as Student,
        gymAdmin: token.gymAdmin as GymAdmin,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}