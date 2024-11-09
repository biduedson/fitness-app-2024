// src/components/CardUserDashboard.tsx
"use client";

import { Prisma } from "@prisma/client";
import React, { useContext } from "react";
import CardUserItem from "./CardUserItem";
import SearchUser from "./SearchUser";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import UserEdite from "@/components/userEdit/UserEdit";
import { useState, useEffect } from "react";
import { UsersContext } from "@/app/_context/userContext";
import LoadingScreen from "@/components/LoadingScreen";

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    student: true;
    gymAdmin: true;
  };
}> | null;

const CardUserDashboard = () => {
  const { dataUsers, setDataUsers } = useContext(UsersContext) ?? {};

  const [filteredUsers, setFilteredUsers] = useState(dataUsers);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserWithRelations>(null);

  const openEditClick = (user: any) => {
    setUserData(user);
    setIsOpenEdit(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilteredUsers(
      dataUsers!.filter(
        (user) =>
          user.name?.toLowerCase().includes(value.toLowerCase()) ||
          user.email?.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (dataUsers) {
      setFilteredUsers(dataUsers);
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
      className="lg:hidden"
    >
      <SearchUser handleInputChange={handleInputChange} />
      <div className="flex flex-col items-center max-h-[80vh] overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
          {filteredUsers.map((user, index) => (
            <CardUserItem
              key={user.id}
              user={user}
              openEditUser={() => openEditClick(user)}
            />
          ))}
        </div>
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

export default CardUserDashboard;
