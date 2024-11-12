// src/pages/components/TableUsers.tsx
"use client";

import React, { useContext, useEffect } from "react";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchUser from "./SearchUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { UsersContext } from "@/app/_context/userContext";
import LoadingScreen from "@/components/LoadingScreen";
import UserEdite from "@/components/userEdit/UserEdit";
import TableRowUser from "./TableRowUser";

interface ITableUsersProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}
type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    student: true;
    gymAdmin: true;
  };
}> | null;

const TableUsers = ({ users }: ITableUsersProps) => {
  const { dataUsers, setDataUsers } = useContext(UsersContext) ?? {};
  const [userData, setUserData] = useState<UserWithRelations>(null);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [totalUser, seTotalUser] = useState<number>(0);
  const [totalInTraining, seTtotalInTraining] = useState<number>(0);
  const [totalAdmins, seTtotalAdmins] = useState<number>(0);

  const [filteredUsers, setFilteredUsers] = useState(dataUsers);
  const router = useRouter();

  const handleUserRouterClick = (userId: string) => {
    router.push(`/user/${userId}`);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name?.toLowerCase().includes(value.toLowerCase()) ||
          user.email?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const openEditClick = (user: any) => {
    setUserData(user);
    setIsOpenEdit(true);
  };

  useEffect(() => {
    if (dataUsers) {
      setFilteredUsers(dataUsers);
      seTotalUser(dataUsers.length);
      seTtotalInTraining(() => dataUsers.filter((user) => user.student).length);
      seTtotalAdmins(() => dataUsers.filter((user) => user.gymAdmin).length);
    }
  }, [dataUsers]);

  if (!filteredUsers) {
    return <LoadingScreen message="Carregando Usuarios..." />;
  }
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="hidden lg:block"
    >
      <div className="w-full flex flex-col items-center h-full overflow-y-auto scrollbar-hide">
        <SearchUser handleInputChange={handleInputChange} />

        {/* Seção de Totais em Card */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
          <div className="bg-blue-600 p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
            <p>Usuários:</p>
            <span className="font-bold text-xl">{totalUser}</span>
          </div>
          <div className="bg-green-600 p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
            <p>Usuários Encontrados:</p>
            <span className="font-bold text-xl">{filteredUsers.length}</span>
          </div>
          <div className="bg-yellow-600 p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
            <p>Alunos da Academia:</p>
            <span className="font-bold text-xl">{totalInTraining}</span>
          </div>
          <div className="bg-purple-600 p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
            <p>Administradores:</p>
            <span className="font-bold text-xl">{totalAdmins}</span>
          </div>
        </div>

        <Table className="w-full max-w-5xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg">
          <TableHeader className="bg-gray-800">
            <TableRow>
              <TableHead className="p-4 text-left">Imagem</TableHead>
              <TableHead className="p-4 text-left">Usuário</TableHead>
              <TableHead className="p-4 text-left">Email</TableHead>
              <TableHead className="p-4 text-left">Tipo de Usuário</TableHead>
              <TableHead className="p-4 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRowUser
                user={user}
                key={user.id}
                openEditUser={() => openEditClick(user)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {userData && (
        <UserEdite
          user={userData}
          setUser={setUserData}
          isOpenEdit={isOpenEdit}
          setIsOpenEdit={setIsOpenEdit}
        />
      )}
    </motion.div>
  );
};

export default TableUsers;
