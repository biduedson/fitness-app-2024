"use client";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  const handleSignIn = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: "https://fitness-app-2024.vercel.app",
    });
  };

  return (
    <motion.section
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="relative w-full h-screen bg-gradient-to-b from-blue-600 to-purple-600 flex justify-center items-center px-4"
    >
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col items-center gap-6 w-full max-w-md bg-white backdrop-blur-md rounded-xl p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Bem-vindo ao Fitness App
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8">
          Entre para acessar seu perfil de exercícios e evoluir sua jornada
          fitness!
        </p>
        <button
          className="w-full flex items-center justify-center gap-4 py-3  shadow-lg shadow-slate-600 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
          onClick={() => handleSignIn("google")}
        >
          <Image
            src="/assets/img/google.png"
            alt="Google icon"
            width={30}
            height={30}
          />
          <span className="font-semibold">Continue com Google</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-3  shadow-lg shadow-slate-600 text-white bg-blue-700 rounded-full hover:bg-blue-800 transition duration-300"
          onClick={() => handleSignIn("facebook")}
        >
          <Image
            src="/assets/img/fabebookIcon.png"
            alt="Facebook icon"
            width={30}
            height={30}
          />
          <span className="font-semibold">Continue com Facebook</span>
        </button>
        <button
          className="w-full flex items-center justify-center gap-4 py-3 shadow-lg shadow-slate-600 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:bg-gradient-to-l transition duration-300"
          onClick={() => handleSignIn("instagram")}
        >
          <Image
            src="/assets/img/instagramIcon.png"
            alt="Instagram icon"
            width={30}
            height={30}
          />
          <span className="font-semibold">Continue com Instagram</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a href="/signup" className="text-blue-500 hover:text-blue-700">
              Crie uma agora
            </a>
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default LoginPage;
