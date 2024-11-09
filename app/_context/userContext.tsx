"use client";

import { Prisma } from "@prisma/client";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

interface IUsers {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

interface IUserContextType {
  dataUsers: IUsers["users"] | null;
  setDataUsers: React.Dispatch<React.SetStateAction<IUsers["users"] | null>>;
}

export const UsersContext = createContext<IUserContextType | undefined>(
  undefined
);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [dataUsers, setDataUsers] = useState<IUsers["users"] | null>(null);

  useEffect(() => {
    const fethUser = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const usersData = await response.json();
        setDataUsers(usersData);
      } catch (error) {
        console.error("Falha ao obter os dados:", error);
      }
    };
    fethUser();
  }, []);

  return (
    <UsersContext.Provider value={{ dataUsers, setDataUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
