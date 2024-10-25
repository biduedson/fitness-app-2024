"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redireciona para a home se o usuário já estiver logado

  const handleSignInGoogle = async () => {
    await signIn("google", {
      callbackUrl: "https://fitness-app-2024.vercel.app",
    });
  };
  const handleSignInFacebook = async () => {
    await signIn("facebook", {
      callbackUrl: "https://fitness-app-2024.vercel.app",
    });
  };
  const handleSignInInstagran = async () => {
    await signIn("instagram", {
      callbackUrl: "https://fitness-app-2024.vercel.app",
    });
  };
  return (
    <motion.section
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="relative flex items-center justify-end w-full xl:pr-[200px]  h-[100vh] bg-login lg:bg-hero z-20"
      id="login"
    >
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="  absolute flex flex-col items-center gap-4 bottom-32 w-full lg:w-[650px] h-auto px-8 z-40 "
      >
        <p className="text-white font-semibold text-[18px]">
          Entre para acessar seu perfil de exercícios
        </p>
        <button
          className=" flex items-center w-full sm:w-[400px]  justify-center gap-8 px-12
         text-white bg-transparent  border-white border-[1px] h-[60px] rounded-[40px]"
        >
          <Image
            src="/assets/img/google.png"
            alt="google icon"
            width={40}
            height={40}
          />
          <span
            className="w-[200px] text-[18px] font-semibold"
            onClick={handleSignInGoogle}
          >
            Continue com google
          </span>
        </button>
        <button
          className="w-full sm:w-[400px]  h-[60px] rounded-[40px] flex items-center  justify-center gap-8 
         text-white border-white border-[1px]"
          onClick={handleSignInFacebook}
        >
          <Image
            src="/assets/img/fabebookIcon.png"
            alt="google icon"
            width={45}
            height={45}
          />
          <span className="w-[200px] text-[18px] font-semibold">
            Continue com facebook
          </span>
        </button>

        <button
          className="w-full sm:w-[400px]  h-[60px] rounded-[40px] flex items-center  justify-center gap-8 
         text-white border-white border-[1px]"
          onClick={handleSignInInstagran}
        >
          <Image
            src="/assets/img/instagramIcon.png"
            alt="google icon"
            width={35}
            height={35}
          />
          <span className="w-[200px] text-[18px] font-semibold">
            Continue com instagram
          </span>
        </button>
      </motion.div>
      <motion.h1
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="absolute flex flex-col top-40 lg:top-20 h1 text-center  lg:text-left mb-2 z-40 lg:w-[650px] lg:text-[90px]"
      >
        <span className="text-accent text-center ">Entre agora </span>{" "}
        <span className="text-center">desafie-se e evolua constantemente.</span>
      </motion.h1>
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full h-full lg:hidden "
      >
        <Image
          src="/assets/img/muscle.png"
          alt="hero"
          fill
          className="absolute left-40  object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30 cursor-pointer"></div>
      </motion.div>
    </motion.section>
  );
};

export default page;
