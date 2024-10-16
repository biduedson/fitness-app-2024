"use client";
import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface ICardUserDashbordProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}
const CardUserDashbord = ({ users }: ICardUserDashbordProps) => {
  const { data } = useSession();
  return (
    <motion.div
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full h-[100vh]  bg-black_texture sm:hidden overflow-y-hidden"
    >
      <motion.h2
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 flex flex-col   w-full sm:w-[380px] sm:text-[40px]
             text-center mb-8 text-accent le leading-[1.1]  border-white border-y-[1px] "
      >
        <span className="text-[50px] sm:text-[70px] mb-2">Usuarios</span>
      </motion.h2>
      <div className="w-full h-full grid grid-cols-2  gap-4 p-8 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        {users.map((user) => {
          return (
            <div className=" w-full h-[314px] flex flex-col justify-between border-accent border-[1px] rounded-lg  bg-white">
              <div className=" relative bg-accent bg- w-full h-[120px]">
                <div className="absolute top-[50px] w-full flex flex-col items-center justify-center ">
                  <div className="relative w-[120px] h-[120px]   ">
                    <Image
                      src={user.image!}
                      alt="user image"
                      fill
                      className="absolute object-cover rounded-full border-white border-[4px]"
                    />
                  </div>
                  <div className="flex flex-col gap2">
                    <p className="text-accent text-center capitalize font-extrabold">
                      {user.name}
                    </p>
                    <p className=" text-slate-500 text-[13px] font-extrabold">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" w-full flex items-center justify-center h-[30px] bg-accent rounded-b-lg">
                <p className=" text-white capitalize font-extrabold text-center">
                  {data?.user.student ? "Aluno" : "Não aluno"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CardUserDashbord;
