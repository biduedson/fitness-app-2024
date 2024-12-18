"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaUserGroup } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import { MdElectricBike } from "react-icons/md";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuItem from "./components/menuItem";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { data } = useSession();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]  ">
          <Image
            src={data?.user.image!}
            fill
            alt="UserImage"
            className="object-cover shadow-md z-50 rounded-full border-[2px] cursor-pointer bg-acc border-accent"
          />
          <div className="absolute p-1 bottom-[-6px] left-6 lg:left-8 bg-white flex items-center justify-center w-[15px] h-[15px] lg:w-[20px] lg:h-[20px] rounded-full z-50">
            <p className="bg-slate-300 rounded-full">
              <IoCaretDownOutline />
            </p>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        className="flex flex-col items-center  justify-center bg-transparent h-fit"
        side="right"
      >
        <motion.div
          variants={fadeIn("down", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full   bg-white absolute top-0 rounded-md shadow-2xl"
        >
          <SheetHeader className="bg-accent w-full flex items-center justify-center h-[60px] rounded-t-md px-4">
            <SheetTitle className="text-white">Profile</SheetTitle>
          </SheetHeader>

          <div className="w-full h-[220px] lg:h-[140px] p-2 flex flex-col items-center shadow-md shadow-slate-300">
            <Image
              src={data?.user.image as string}
              alt="User"
              width={120}
              height={120}
              className="object-cover shadow-md rounded-full lg:h-[80px] lg:w-[80px]"
            />
            <p>{data?.user.name}</p>
            <p className="text-accent font-semibold">{data?.user.email}</p>
          </div>

          <div className="flex flex-col w-full h-full gap-2 py-8 lg:py-4">
            <MenuItem
              label="Todos os exercícios"
              iconSrc="/assets/dunbels.png"
              onclick={() => router.push("/exercisesguide")}
            />
            <MenuItem
              label="Exercícios favoritos"
              iconSrc="/assets/img/favoriteExercise.png"
              onclick={() => router.push("/favoriteExerciseGuide")}
            />
            <MenuItem
              label="Guia de exercícios aeróbicos"
              iconComponent={<MdElectricBike className="text-2xl xl:text-xl" />}
              onclick={() => router.push("/aerobicExercises")}
            />

            <MenuItem
              label="Guia de dieta e treino"
              iconComponent={<GiMuscleUp className="text-2xl xl:text-xl" />}
              onclick={() => router.push("/MuscleGainGuidePage")}
            />
            {data?.user.gymAdmin && (
              <MenuItem
                label="Controle de usuários"
                iconComponent={<FaUserGroup />}
                onclick={() => router.push("/userControl")}
              />
            )}
            <MenuItem
              label="Sair"
              iconComponent={<LiaSignOutAltSolid />}
              logout={() => signOut()}
            />
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default UserProfile;
