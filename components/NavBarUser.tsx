"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCaretDownOutline } from "react-icons/io5";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { LogOutIcon } from "lucide-react";

const NavbarUser = () => {
  const { data } = useSession();
  const router = useRouter();
  const [isOpenLogout, setIsOpenLogout] = useState<boolean>(false);

  return (
    <nav className="hidden lg:flex bg-primary-200 text-white shadow-md w-full py-4 px-8  items-center justify-between">
      {/* Logo ou Título da Navbar */}
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image src={"/assets/img/logo.png"} width={117} height={55} alt="" />
      </div>

      {/* Links do Menu (Visíveis em telas maiores) */}
      <div className="hidden lg:flex space-x-8 items-center">
        <button
          onClick={() => router.push("/exerciseGuidePage")}
          className="hover:text-gray-300 transition"
        >
          Todos os Exercícios
        </button>

        <button
          onClick={() => router.push("/favoriteExerciseGuide")}
          className="hover:text-gray-300 transition"
        >
          Exercícios Favoritos
        </button>
        <button
          onClick={() => router.push("/aerobicExercises")}
          className="hover:text-gray-300 transition"
        >
          Guia de exercícios aeróbicos
        </button>

        <button
          onClick={async () => router.push("/MuscleGainGuidePage")}
          className="hover:text-gray-300 transition"
        >
          Guia de dieta e treino
        </button>
        {data?.user.gymAdmin && (
          <button
            onClick={() => router.push("/userControl")}
            className="hover:text-gray-300 transition"
          >
            Controle de Usuários
          </button>
        )}
        <button
          onClick={async () => router.push("/")}
          className="hover:text-gray-300 transition"
        >
          Início
        </button>
      </div>

      {/* Perfil do Usuário */}
      <div className=" relative flex items-center space-x-3">
        <Image
          src={data?.user.image || "/default-avatar.png"}
          width={40}
          height={40}
          alt="User Image"
          className=" object-cover shadow-md rounded-full border-[2px] border-white bg-accent"
        />
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className={
            isOpenLogout
              ? "w-full h-ful text-white bg-trasnparent absolute p-1 bottom-[-28px] left-4 rounded-md flex cursor-pointer items-center justify-center border-white border-[1px]"
              : "hidden"
          }
          onClick={() => signOut()}
        >
          <LogOutIcon className="mr-4" />
          <span>Logout</span>
        </motion.div>
        <div
          className="absolute p-1 bottom-[-2px] left-4 bg-white flex items-center justify-center w-[10px] h-[10px]
         rounded-full z-50 cursor-pointer"
          onClick={() => setIsOpenLogout(!isOpenLogout)}
        >
          <p className="bg-slate-300 rounded-full">
            <IoCaretDownOutline />
          </p>
        </div>
        <p className="hidden lg:block">{data?.user.name}</p>
      </div>
    </nav>
  );
};

export default NavbarUser;
