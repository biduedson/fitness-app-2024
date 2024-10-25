import { db } from "@/app/_lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";


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
     InstagramProvider({
    clientId: process.env.INSTAGRAM_CLIENT_ID as string,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string ,
    
  })
    ],
    session: {
    strategy: "jwt", // Usar JWT para ambientes serverless
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Certifique-se de ter um segredo definido
  },
    // Configuração de cookies
   
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Somente cookies seguros em produção
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

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
        student: userWithStudent?.student || null, // Incluindo o campo student na sessão
        gymAdmin: userWithStudent?.gymAdmin || null
      };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}