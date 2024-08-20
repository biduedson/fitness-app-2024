<<<<<<< HEAD
import { db } from "@/app/_lib/prisma"
=======
import { db } from "@/app/lib/prisma"
>>>>>>> 5994e7c826147988e9aefdb75a173131d393ae7b
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'
const handler = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
  providers:[
     GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  })
  ]
})

export { handler as GET, handler as POST }