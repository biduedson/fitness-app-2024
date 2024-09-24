"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const Login = () => {
  const router = useRouter();
  const handleSignInGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };
  const handleSignInFacebook = async () => {
    await signIn("facebook", { callbackUrl: "/" });
  };
  return (
    <section
      className="relative flex items-center justify-between w-full h-[100vh]  "
      id="login"
    >
      <motion.h1
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="absolute flex flex-col top-40 lg:top-20 h1 text-center  lg:text-left mb-2 z-50"
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
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full h-full hidden lg:flex flex-col"
      >
        <Image
          src="/assets/img/hero/bg.png"
          alt="hero"
          fill
          className="absolute left-40  object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30 cursor-pointer"></div>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="  absolute flex flex-col items-center gap-4 bottom-32 w-full h-auto px-8 "
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
            width={30}
            height={30}
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
            width={35}
            height={35}
          />
          <span className="w-[200px] text-[18px] font-semibold">
            Continue com facebook
          </span>
        </button>
      </motion.div>
    </section>
  );
};

export default Login;
