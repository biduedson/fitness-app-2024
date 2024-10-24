"use client";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface ICardUserDashbordProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const CardUserDashbord = ({ users }: ICardUserDashbordProps) => {
  const router = useRouter();
  const handleUserRouterClick = (id: string) => {
    router.push(`/user/${id}`);
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
    <div className="w-full h-[100vh] flex flex-col justify-between">
      <div className=" hidden w-full h-[100%] text-white sm:flex justify-center items-center px-4 bg-black_texture">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className=" relative font-medium w-[80px] h-[100px]  p-2">
                    <div className="relative w-[80px] h-[100px]  rounded-lg">
                      <Image
                        src={user.image!}
                        alt="user image"
                        fill
                        className="absolute object-cover p-2"
                        sizes="(width: 80px)"
                        priority
                      />
                    </div>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
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
             text-center mb-8 text-accent le leading-[1.1]  border-white border-b-[1px] "
        >
          <span className="text-[50px] sm:text-[70px] mb-2">Controle</span>
          <span className="text-[30px] sm:text-[40px] mb-2">de usuários</span>
        </motion.h2>
        <div className="w-full h-full grid grid-cols-2  gap-4 p-8 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {users.map((user) => {
            return (
              <div
                className=" w-full h-[314px] flex flex-col justify-between border-accent border-[1px] rounded-lg  bg-white cursor-pointer"
                onClick={() => handleUserRouterClick(user.id)}
                key={user.id}
              >
                <div className=" relative bg-accent bg- w-full h-[120px]">
                  <div className="absolute top-[50px] w-full flex flex-col items-center justify-center ">
                    <div className="relative w-[120px] h-[120px]   ">
                      <Image
                        src={user.image!}
                        alt="user image"
                        fill
                        className="absolute object-cover rounded-full border-white border-[4px]"
                        priority
                        sizes="(width: 120px) "
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
                    {user.student ? "Aluno" : "Não aluno"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      <MobileNavHomeFooter />
    </div>
  );
};

export default CardUserDashbord;
