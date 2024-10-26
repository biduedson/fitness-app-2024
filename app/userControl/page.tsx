"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import CardUserDashbord from "./components/CardUserDashbord";
import { notFound, redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Prisma, User } from "@prisma/client";

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
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session?.user) {
    return router.push("/login");
  }

  if (!session?.user.gymAdmin) {
    return notFound();
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
    }
  }, [initialUser]);

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
