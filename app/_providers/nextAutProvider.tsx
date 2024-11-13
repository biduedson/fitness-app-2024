"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  session: Session; // new change
};

const AuthProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      {" "}
      // session passed
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
