"use server";

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import CardUserDashbord from "./components/CardUserDashbord";
import TableUserDashboard from "./components/TableUserDashboard";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
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
  const users = await db.user.findMany({
    include: {
      student: true,
      gymAdmin: true,
    },
  });

  if (!users) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        Voce não tem usuarios cadastradas . Consulte o administrador do sistema.
      </div>
    );
  }
  return (
    <div className="w-full h-[100vh] flex flex-col justify-between">
      <div className=" hidden w-full h-100% text-white sm:flex justify-center items-center px-4 bg-black_texture">
        <TableUserDashboard users={users} />
      </div>

      <CardUserDashbord users={users} />
      <MobileNavHomeFooter />
    </div>
  );
}

export default Dashboard;
