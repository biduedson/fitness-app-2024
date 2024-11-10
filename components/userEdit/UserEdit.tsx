"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import React from "react";
import UserControlPanel from "./components/UserControlPanel";
import UserControllerPageHeader from "./components/UserControllerPageHeader";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { TbArrowBack } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface IUserEditeProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }> | null;

  setUser: React.Dispatch<React.SetStateAction<IUserEditeProps["user"]>>;

  isOpenEdit: boolean;
  setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserEdite = ({ user, isOpenEdit, setIsOpenEdit }: IUserEditeProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
      <AlertDialogContent className=" w-full h-screen  flex flex-col items-center  justify-center min-h-screen bg-transparent text-white sm:px-6 lg:px-8 z-50">
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
        <div className="w-full h-1/2  flex flex-col items-center  justify-center">
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            className=" w-full top-4  flex flex-col  items-center justify-center   px-4"
          >
            <div className="flex  w-full gap-2 items-center justify-center bg-white rounded-t-lg opacity-90 p-2">
              <div className="relative w-20 h-20 overflow-hidden rounded-full shadow-lg">
                <Image
                  src={user?.image!}
                  alt="User Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-90 rounded-full"
                />
              </div>
              <div>
                <h1 className=" text-3xl font-semibold text-center text-red-500">
                  {user?.name || "Nome do Usuário"}
                </h1>
                <p className="text-sm  mt-1 text-center text-primary-300">
                  {user?.email || "email@exemplo.com"}
                </p>
              </div>
            </div>
          </motion.div>
          <div className="flex flex-col items-center w-full  px-4">
            <UserControlPanel user={user!} setIsOpenEdit={setIsOpenEdit} />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserEdite;

const ErrorScreen = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white">
    <span className="text-lg">{message}</span>
  </div>
);
