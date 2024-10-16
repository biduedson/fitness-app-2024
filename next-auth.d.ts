/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session {
        user: {
            id?: string;
             student?: {
        id: string;
        userId: string;
        studentSince: Date;
        paymentStatus: string | null;
        paymentDueDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
      gymAdmin?: {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      } | null;
        } & DefaultSession['user'];
    }
    interface User extends DefaultUser {
    id: string;
    student?: {
      id: string;
      userId: string;
      studentSince: Date;
      paymentStatus: string | null;
      paymentDueDate: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
     gymAdmin?: {
       id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
      } | null;
  }
}