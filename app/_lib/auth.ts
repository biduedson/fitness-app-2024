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
    strategy: "database",
  },

   callbacks: {
    async session({ session, user }) {
      if (!user){
         return session;
        } // Retorna a sessão sem modificação se `user` estiver ausente.
      const userWithDetails = await db.user.findUnique({
        where: { id: user.id },
        include: { student: true, gymAdmin: true },
      });

     if (userWithDetails) {
        session.user = {
          ...session.user,
          id: userWithDetails.id as string ,
          student: userWithDetails.student || null,
          gymAdmin: userWithDetails.gymAdmin || null,
        };
      } else {
        console.warn("User details not found for user id:", user.id);
      }
console.log("Session User:", session.user); // Debugging linha
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}