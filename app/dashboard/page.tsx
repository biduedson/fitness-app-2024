"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import CardUserDashbord from "./components/CardUserDashbord";
import TableUserDashboard from "./components/TableUserDashboard";

async function Dashboard() {
  const data = await getServerSession(authOptions);
  const users = await db.user.findMany({
    include: {
      student: true,
      gymAdmin: true,
    },
  });
  if (!data?.user?.gymAdmin) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        não logado
      </div>
    );
  }
  if (!users) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        Voce não tem usuarios cadastradas . Consulte o administrador do sistema.
      </div>
    );
  }
  return (
    <>
      <div className=" hidden w-full h-[100vh] text-white sm:flex justify-center items-center px-4 bg-black_texture">
        <TableUserDashboard users={users} />
      </div>

      <CardUserDashbord users={users} />
    </>
  );
}

export default Dashboard;
