"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import CardUserDashbord from "./components/CardUserDashbord";

import { redirect } from "next/navigation";

async function Dashboard() {
  const data = await getServerSession(authOptions);
  if (!data?.user) {
    redirect("/login");
  }
  if (!data?.user?.gymAdmin) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        Não Autorizado
      </div>
    );
  }
  const dataUsers = await db.user.findMany({
    include: {
      student: true,
      gymAdmin: true,
    },
  });

  if (!dataUsers) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        Voce não tem usuarios cadastradas . Consulte o administrador do sistema.
      </div>
    );
  }
  return <CardUserDashbord users={dataUsers} />;
}

export default Dashboard;
