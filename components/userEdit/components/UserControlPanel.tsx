"use client";
import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { IoIosCloseCircleOutline, IoIosPersonAdd } from "react-icons/io";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import AlertAction from "./AlertDialogAction";
import { ActionType } from "../userEditTypes/userTypes";
import { FaHome } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ActionButton from "@/components/ActionButton";

import { useRouter } from "next/navigation";

interface UserControlPanelProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserControlPanel = ({ user, setIsOpenEdit }: UserControlPanelProps) => {
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<
    UserControlPanelProps["user"] | null
  >(user);

  const handleOpenDialog = (type: ActionType) => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  return (
    <>
      {/* Versão para dispositivos móveis */}
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" w-full flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <h4 className="text-lg font-semibold text-gray-300 uppercase mb-3 text-center">
          Controle de Usuário
        </h4>
        {loadingButton ? (
          <div className="w-full flex flex-col gap-3">
            <div className=" w-full h-[50%] flex items-center justify-center gap-2 text-[20px] animate-pulse ">
              <AiOutlineLoading3Quarters className="animate-spin" /> Alterando
              usuário...
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            {!userData?.student && (
              <ActionButton
                onClick={() => handleOpenDialog("addStudent")}
                icon={<IoIosPersonAdd className="text-3xl text-white" />}
                label="Adicionar como aluno"
                bgColor="bg-blue-500"
              />
            )}
            {userData?.student && (
              <ActionButton
                onClick={() => handleOpenDialog("deleteStudent")}
                icon={<MdPersonRemoveAlt1 className="text-3xl text-white" />}
                label="Remover como aluno"
                bgColor="bg-red-500"
              />
            )}
            {!userData?.gymAdmin && (
              <ActionButton
                onClick={() => handleOpenDialog("addGymAdmin")}
                icon={<RiAdminFill className="text-3xl text-white" />}
                label="Adicionar como Administrador"
                bgColor="bg-green-500"
              />
            )}
            {userData?.gymAdmin && (
              <ActionButton
                onClick={() => handleOpenDialog("deleteGymAdmin")}
                icon={<RiAdminFill className="text-3xl text-white" />}
                label="Remover como Administrador"
                bgColor="bg-yellow-500"
              />
            )}
          </div>
        )}

        <AlertAction
          user={userData!}
          userId={user.id}
          actionType={actionType}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={() => setIsDialogOpen(false)}
          setUserData={setUserData}
          setLoadingButton={setLoadingButton}
        />
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className=" min-w-full flex justify-around  md:w-24 h-auto bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 items-center text-gray-300 shadow-inner "
        >
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center justify-center cursor-pointer mt-6 "
            onClick={() => setIsOpenEdit(false)}
          >
            <IoIosCloseCircleOutline className="text-4xl mb-1 hover:scale-110 transition-transform" />
            <span className="text-sm">Fechar</span>
          </motion.div>

          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center justify-center cursor-pointer mt-6"
            onClick={() => router.push("/")}
          >
            <FaHome className="text-4xl mb-1 hover:scale-110 transition-transform" />
            <span className="text-sm">Início</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default UserControlPanel;
