"use client";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import Image from "next/image";

import UserProfile from "@/components/UserProfile";
import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchUser from "./SearchUser";
import TableUsers from "./TableUsers";
import CardUserList from "./CardUserList";

export interface ICardUserDashbordProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const CardUserDashbord = ({ users }: ICardUserDashbordProps) => {
  const { data } = useSession();
  const [filteredUsers, setFilteredUsers] =
    useState<ICardUserDashbordProps["users"]>(users);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filterUsers = users.filter(
      (user) => user.name?.includes(value) || user.email?.includes(value)
    );
    setFilteredUsers(filterUsers);
  };
  useEffect(() => {
    if (!window.mutationObserverListeners) {
      window.mutationObserverListeners = []; // Inicializa se estiver undefined
      const observer = new MutationObserver((mutations) => {
        console.log("Mudanças detectadas no DOM:", mutations);
      });

      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      window.mutationObserverListeners.push(observer);
    }

    return () => {
      window.mutationObserverListeners?.forEach((observer) =>
        observer.disconnect()
      );
    };
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex flex-col justify-between bg-black_texture">
      {data?.user && (
        <div className=" absolute top-2 left-2">
          <UserProfile imageUrl={data?.user.image!} />
        </div>
      )}
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" relative w-full  h-[200px] sm:h-[300px]  py-4  lg:hidden rounded-b-xl clip-custom-bottom"
      >
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="banner"
          fill
          className="absolute object-cover "
          priority
        />
      </motion.div>

      <div className=" hidden w-full h-[100%] text-white sm:flex flex-col justify-center items-center px-4 bg-black_texture">
        <SearchUser handleInputChange={handleInputChange} />
        <TableUsers users={filteredUsers} />
      </div>
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full h-[100vh]  bg-black_texture sm:hidden overflow-y-hidden "
      >
        <motion.h2
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 flex flex-col   w-full sm:w-[380px] sm:text-[40px]
             text-center  text-accent le leading-[1.1]  border-white border-b-[1px] "
        >
          <span className="text-[40px] sm:text-[60px] mb-2">Controle</span>
          <span className="text-[20px] sm:text-[30px] mb-2">de usuários</span>
        </motion.h2>
        <SearchUser handleInputChange={handleInputChange} />
        <CardUserList users={filteredUsers} />
      </motion.div>
      <MobileNavHomeFooter />
    </div>
  );
};

export default CardUserDashbord;
