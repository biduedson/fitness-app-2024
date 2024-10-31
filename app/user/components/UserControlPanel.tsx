import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import React from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

interface UserControlPanelProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setIsConfirmDialogOpen: () => void;
  setIsConfirmDeletedDialogOpen: () => void;
  setIsConfirmGymAdminDialogOpen: () => void;
  setIsConfirmDialogGymAdminDeletOpen: () => void;
}
const UserControlPanel = ({
  user,
  setIsConfirmDialogOpen,
  setIsConfirmDeletedDialogOpen,
  setIsConfirmGymAdminDialogOpen,
  setIsConfirmDialogGymAdminDeletOpen,
}: UserControlPanelProps) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.6)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full h-[400px] flex flex-col items-center justify-center gap-4 bg-transparent mt-2"
    >
      <h4 className="w-full h4 font-oswald text-accent uppercase border-y-[1px] border-white text-center my-4">
        Controle de usuário
      </h4>
      <div className="w-full  flex flex-col gap-4 items-center justify-center px-4 ">
        {!user.student && (
          <div
            className="bg-accent w-full  h-[50px] flex items-center  justify-between px-4 gap-2 text-sm  uppercase rounded-lg"
            onClick={setIsConfirmDialogOpen}
          >
            <IoIosPersonAdd className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span className="text-center">Adicionar usuário como aluno.</span>
            </div>
          </div>
        )}
        {user.student && (
          <div
            className="bg-accent w-full  h-[50px] flex items-center justify-between px-4 text-sm  uppercase rounded-lg"
            onClick={setIsConfirmDeletedDialogOpen}
          >
            <MdPersonRemoveAlt1 className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span className="text-center">Remover usuário como aluno.</span>
            </div>
          </div>
        )}
        {!user.gymAdmin && (
          <div
            className="bg-accent w-full  h-[50px] flex items-center  justify-between px-4 text-sm  uppercase rounded-lg"
            onClick={setIsConfirmGymAdminDialogOpen}
          >
            <RiAdminFill className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span className="text-center">
                Adicinar usuário como Administrador.
              </span>
            </div>
          </div>
        )}
        {user.gymAdmin && (
          <div
            className="bg-accent w-full  h-[50px] flex items-center  justify-between px-4 text-sm  uppercase rounded-lg"
            onClick={setIsConfirmDialogGymAdminDeletOpen}
          >
            <RiAdminFill className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span className="text-center">
                Remover usuário como Administrador.
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserControlPanel;
