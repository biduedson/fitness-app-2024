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
      const userWithDetails = await db.user.findUnique({
        where: { id: user.id },
        include: { student: true, gymAdmin: true },
      });

      session.user = {
        ...session.user,
        id: user.id,
        student: userWithDetails?.student || null,
        gymAdmin: userWithDetails?.gymAdmin || null,
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}