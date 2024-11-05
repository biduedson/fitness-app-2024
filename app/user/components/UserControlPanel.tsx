import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import AlertAction from "./AlertDialogAction";
import { ActionType } from "../types/userTypes";
import { TbArrowBack } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UserControlPanelProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setUserData: React.Dispatch<
    React.SetStateAction<UserControlPanelProps["user"] | null>
  >;
}

const UserControlPanel = ({ user, setUserData }: UserControlPanelProps) => {
  const [actionType, setActionType] = useState<ActionType>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router = useRouter();

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
        className="md:hidden w-full flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-4"
      >
        <h4 className="text-lg font-semibold text-gray-300 uppercase mb-3 text-center">
          Controle de Usuário
        </h4>
        <div className="w-full flex flex-col gap-3">
          {!user.student && (
            <ActionButton
              onClick={() => handleOpenDialog("addStudent")}
              icon={<IoIosPersonAdd className="text-3xl text-white" />}
              label="Adicionar como aluno"
              bgColor="bg-blue-500"
            />
          )}
          {user.student && (
            <ActionButton
              onClick={() => handleOpenDialog("deleteStudent")}
              icon={<MdPersonRemoveAlt1 className="text-3xl text-white" />}
              label="Remover como aluno"
              bgColor="bg-red-500"
            />
          )}
          {!user.gymAdmin && (
            <ActionButton
              onClick={() => handleOpenDialog("addGymAdmin")}
              icon={<RiAdminFill className="text-3xl text-white" />}
              label="Adicionar como Administrador"
              bgColor="bg-green-500"
            />
          )}
          {user.gymAdmin && (
            <ActionButton
              onClick={() => handleOpenDialog("deleteGymAdmin")}
              icon={<RiAdminFill className="text-3xl text-white" />}
              label="Remover como Administrador"
              bgColor="bg-yellow-500"
            />
          )}
        </div>
        <AlertAction
          user={user}
          userId={user.id}
          actionType={actionType}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={() => setIsDialogOpen(false)}
          setUserData={setUserData}
        />
      </motion.div>

      {/* Versão para desktop */}
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="hidden md:flex w-full max-w-lg flex-col items-center bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <h4 className="text-2xl font-bold text-gray-300 uppercase mb-6 text-center border-b border-gray-500 pb-3">
          Controle de Usuário
        </h4>
        <div className="w-full flex flex-col gap-4 items-center ">
          {!user.student && (
            <ActionButton
              onClick={() => handleOpenDialog("addStudent")}
              icon={<IoIosPersonAdd className="text-4xl text-white " />}
              label="Liberar acesso aos exercícios"
              bgColor="bg-blue-500"
            />
          )}
          {user.student && (
            <ActionButton
              onClick={() => handleOpenDialog("deleteStudent")}
              icon={<MdPersonRemoveAlt1 className="text-4xl text-white" />}
              label="bloquear acesso aos exercícios"
              bgColor="bg-red-500"
            />
          )}
          {!user.gymAdmin && (
            <ActionButton
              onClick={() => handleOpenDialog("addGymAdmin")}
              icon={<RiAdminFill className="text-4xl text-white" />}
              label="cadastrar Administrador"
              bgColor="bg-green-500"
            />
          )}
          {user.gymAdmin && (
            <ActionButton
              onClick={() => handleOpenDialog("deleteGymAdmin")}
              icon={<RiAdminFill className="text-4xl text-white" />}
              label="bloquear Administrador"
              bgColor="bg-yellow-500"
            />
          )}
        </div>
        <AlertAction
          user={user}
          userId={user.id}
          actionType={actionType}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={() => setIsDialogOpen(false)}
          setUserData={setUserData}
        />
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="hidden min-w-full md:flex justify-around  md:w-24 h-auto bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 items-center text-gray-300 shadow-inner "
        >
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col items-center justify-center cursor-pointer mt-6 "
            onClick={() => router.back()}
          >
            <TbArrowBack className="text-4xl mb-1 hover:scale-110 transition-transform" />
            <span className="text-sm">Voltar</span>
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

const ActionButton = ({
  onClick,
  icon,
  label,
  bgColor,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`${bgColor} w-full flex items-center  justify-between px-4 py-3 gap-2 text-sm uppercase rounded-lg cursor-pointer transition-transform transform hover:scale-105`}
      onClick={onClick}
    >
      {icon}
      <span className="text-white w-full text-center">{label}</span>
    </div>
  );
};

export default UserControlPanel;
