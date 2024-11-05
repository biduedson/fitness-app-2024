// src/components/CardUserDashboard.tsx
"use client";

import { Prisma } from "@prisma/client";
import React from "react";
import CardUserItem from "./CardUserItem";
import SearchUser from "./SearchUser";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

interface ICardUserDashboardProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const CardUserDashboard = ({ users }: ICardUserDashboardProps) => {
  const [filteredUsers, setFilteredUsers] = React.useState(users);

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
          {filteredUsers.map((user) => (
            <CardUserItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CardUserDashboard;
