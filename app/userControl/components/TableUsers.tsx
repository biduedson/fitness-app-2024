// src/pages/components/TableUsers.tsx
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchUser from "./SearchUser";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

import { FaRegEdit } from "react-icons/fa";

interface ITableUsersProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const TableUsers = ({ users }: ITableUsersProps) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
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

  const totalUsers = users.length;
  const totalInTraining = users.filter((user) => user.student).length; // Total de alunos
  const totalAdmins = users.filter((user) => user.gymAdmin).length; // Total de administradores

  const getUserType = (
    user: Prisma.UserGetPayload<{ include: { student: true; gymAdmin: true } }>
  ) => {
    if (user.gymAdmin) return "Administrador";
    return user.student ? "Aluno" : "Não Aluno";
  };
  const getColorUserType = (
    user: Prisma.UserGetPayload<{ include: { student: true; gymAdmin: true } }>
  ) => {
    if (user.gymAdmin) return "bg-purple-600";
    return user.student ? "bg-yellow-600" : "bg-blue-600";
  };
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
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="bg-blue-600 p-4 rounded-lg shadow-lg flex flex-col items-center text-white">
            <p>Usuários:</p>
            <span className="font-bold text-xl">{totalUsers}</span>
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
              <TableRow
                key={user.id}
                className="hover:bg-gray-800 transition-colors"
              >
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
                <TableCell className="p-4">
                  {user.name || "Nome do Usuário"}
                </TableCell>
                <TableCell className="p-4">
                  {user.email || "email@exemplo.com"}
                </TableCell>
                <TableCell className={`p-4 ${getColorUserType(user)}  `}>
                  {getUserType(user)}
                </TableCell>
                <TableCell className="p-4 flex  justify-center">
                  <button
                    onClick={() => handleUserRouterClick(user.id)}
                    className=" flex  items-center  justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <FaRegEdit className="text-[18px]" />
                    Editar
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default TableUsers;
