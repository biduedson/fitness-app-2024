// src/pages/DashboardPage.tsx
"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import CardUserDashbord from "./components/CardUserDashbord";
import TableUsers from "./components/TableUsers";
import { redirect } from "next/navigation";

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
    <section className="bg-black_texture min-h-screen p-6">
      <h2 className="text-3xl font-bold text-accent text-center mb-10">
        Dashboard de Usuários
      </h2>
      {/* Exibe a tabela em telas a partir de lg, caso contrário, exibe os cartões */}

      <TableUsers users={users} />

      <CardUserDashbord users={users} />
    </section>
  );
};

export default DashboardPage;
