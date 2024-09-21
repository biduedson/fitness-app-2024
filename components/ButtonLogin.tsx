"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const ButtonLogin = () => {
  const handleSigninClick = () => {
    signIn("facebook");
  };

  return (
    <button
      className="w-[180px] h-[40px] flex items-center justify-center gap-2 border-[1px] p-2 
                 border-white rounded-md  text-[10px] uppercase font-light"
      onClick={handleSigninClick}
    >
      <div className="relative w-[20px] h-[20px]">
        <Image
          src="/assets/img/facebookIcon.png"
          alt="facebook login"
          fill
          className="absolute object-cover"
        />
      </div>
      Login com facebook
    </button>
  );
};

export default ButtonLogin;
