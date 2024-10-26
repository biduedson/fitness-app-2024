"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CardUserDashbord from "./components/CardUserDashbord";
import { notFound, redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Prisma, User } from "@prisma/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoBlocked } from "react-icons/go";

interface IUsers {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const fetcher = (url: string): Promise<IUsers> =>
  fetch(url).then((res) => res.json());

const page = () => {
  const { data: session, status } = useSession();

  if (!session?.user.gymAdmin) {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className="animate-pulse text-[20px]">
          <GoBlocked />
        </span>
        <span>Não autorizado</span>
      </div>
    );
  }

  const { data: initialUser, error } = useSWR<IUsers>(() => {
    if (status === "authenticated" && session?.user.gymAdmin) {
      return `/api/user`;
    }
    return null;
  }, fetcher);

  const [usersData, setUsersData] = useState<IUsers | null>(initialUser!);

  useEffect(() => {
    if (initialUser) {
      setUsersData(initialUser);
      console.log(initialUser);
    }
  }, [initialUser]);
  if (!usersData) {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className=" animate-spin text-[20px]">
          <AiOutlineLoading3Quarters />
        </span>
        <span className=" animate-pulse">Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className="text-[20px]">Erro: {error}</span>
      </div>
    );
  }
  if (usersData?.users?.length === 0) {
    return (
      <div className=" w-full h-[100vh] text-white flex justify-center items-center ">
        Voce não tem usuarios cadastradas . Consulte o administrador do sistema.
      </div>
    );
  }
  return <CardUserDashbord users={usersData?.users!} />;
};

export default page;
