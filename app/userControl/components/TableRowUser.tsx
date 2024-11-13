"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { useState, useEffect } from "react";
import { UsersContext } from "@/app/_context/userContext";
import { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";

interface ITableRowUser {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  openEditUser: () => void;
}

const TableRowUser = ({ user, openEditUser }: ITableRowUser) => {
  const { dataUsers } = useContext(UsersContext) ?? {};

  const updatedUser =
    dataUsers?.find((updated) => updated.id === user.id) || user;
  const getColorUserType = (
    user: Prisma.UserGetPayload<{
      include: { student: true; gymAdmin: true };
    }>
  ) => {
    if (user.gymAdmin) return "bg-purple-600";
    return user.student ? "bg-blue-500" : "bg-red-600";
  };
  const getUserType = (
    user: Prisma.UserGetPayload<{
      include: { student: true; gymAdmin: true };
    }>
  ) => {
    if (user.gymAdmin) return "Administrador";
    return user.student ? "Aluno" : "Não Aluno";
  };

  return (
    <>
      <TableRow key={user.id} className="hover:bg-gray-800 transition-colors ">
        <TableCell className="p-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name} profile`}
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                N/A
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="p-4">{user.name || "Nome do Usuário"}</TableCell>
        <TableCell className="p-4">
          {user.email || "email@exemplo.com"}
        </TableCell>
        <TableCell className={`p-4 ${getColorUserType(user)}  `}>
          {getUserType(user)}
        </TableCell>
        <TableCell className="p-4 flex  justify-center">
          <button
            onClick={openEditUser}
            className=" flex  items-center  justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaRegEdit className="text-[18px]" />
            Editar
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowUser;
