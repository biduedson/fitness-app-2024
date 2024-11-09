// src/pages/DashboardPage.tsx
"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import CardUserDashbord from "./components/CardUserDashbord";
import TableUsers from "./components/TableUsers";
import { redirect } from "next/navigation";
import UserProfile from "@/components/profile/UserProfile";
import NavbarUser from "@/components/NavBarUser";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }
  if (!session?.user.gymAdmin) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Não Autorizado
      </div>
    );
  }

  const users = await db.user.findMany({
    include: {
      student: true,
      gymAdmin: true,
    },
  });

  return (
    <>
      <section className=" relative bg-primary-300 min-h-screen p-6 lg:p-0  ">
        <NavbarUser />
        <div className="lg:hidden absolute top-4 left-4 z-50">
          {" "}
          <UserProfile />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-accent text-center mb-10 lg:mb-2">
          Dashboard de Usuários
        </h2>
        {/* Exibe a tabela em telas a partir de lg, caso contrário, exibe os cartões */}

        <TableUsers users={users} />

        <CardUserDashbord />
      </section>
    </>
  );
};

export default DashboardPage;
