import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Verifique se o redirect URI está configurado corretamente no console do Google
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      try {
        // Inclui detalhes adicionais do usuário na sessão
        const userWithDetails = await db.user.findUnique({
          where: { id: user.id },
          include: { student: true, gymAdmin: true },
        });

        if (userWithDetails) {
          session.user = {
            ...session.user,
            id: user.id,
            student: userWithDetails.student,
            gymAdmin: userWithDetails.gymAdmin,
          };
        } else {
          console.warn("User details not found for user id:", user.id);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Ativa o modo debug para mais informações de log
  debug: true,
};

export default NextAuth(authOptions);
