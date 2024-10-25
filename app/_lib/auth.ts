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
    
   
  
    callbacks: {
  async session({ session, token }) {
    // Adiciona os dados do token à sessão
    session.user.id = token.id as string; // Armazena o ID do usuário na sessão
    session.user.student = token.student as Student || null; // Armazena os dados do student na sessão
    session.user.gymAdmin = token.gymAdmin as GymAdmin || null; // Armazena os dados do gymAdmin na sessão
    return session;
  },
  async jwt({ token, user }) {
    // Se o usuário estiver presente, adiciona os dados ao token
    if (user) {
      token.id = user.id as string; // Armazena o ID do usuário no token
      token.student = user.student || null; // Armazena os dados do student no token
      token.gymAdmin = user.gymAdmin || null; // Armazena os dados do gymAdmin no token
    }
    return token;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
}