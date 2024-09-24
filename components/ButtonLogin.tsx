"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const ButtonLogin = () => {
  const router = useRouter();
  const handleSigninClick = () => {
    router.push("/login");
  };

  return (
    <button
      className="w-[180px] h-[40px] flex items-center justify-center gap-2 border-[1px] p-2 
                 border-white rounded-md  text-[10px] uppercase font-light"
      onClick={handleSigninClick}
    >
      Login
    </button>
  );
};

export default ButtonLogin;
