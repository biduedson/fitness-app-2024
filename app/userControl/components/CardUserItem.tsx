// src/components/CardUserItem.tsx
"use client";

import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { UsersContext } from "@/app/_context/userContext";
import { useContext } from "react";

interface ICardProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  openEditUser: () => void;
}

const CardUserItem = ({ user, openEditUser }: ICardProps) => {
  const { dataUsers } = useContext(UsersContext) ?? {};

  const router = useRouter();
  const updatedUser =
    dataUsers?.find((updated) => updated.id === user.id) || user;

  const handleUserRouterClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
      onClick={openEditUser}
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={updatedUser.image!}
          alt="User Image"
          fill
          className="rounded-full object-cover border-4 border-accent"
        />
      </div>
      <h3 className="text-xl font-bold text-accent">{updatedUser.name}</h3>
      <p className="text-gray-600 text-sm">{updatedUser.email}</p>
      <div
        className={`mt-4 px-4 py-1 rounded-full text-white font-semibold ${
          updatedUser.student ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {updatedUser.student ? "Aluno" : "Não aluno"}
      </div>
    </div>
  );
};

export default CardUserItem;
