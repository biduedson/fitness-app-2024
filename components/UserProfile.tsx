"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaChevronRight } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const UserProfile = ({
  imageUrl,
  name,
  openNav,
  setOpenNav,
}: {
  imageUrl: string;
  name?: string;
  openNav?: boolean;
  setOpenNav?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className=" relative w-[60px]  h-[60px]">
            <Image
              src={imageUrl}
              fill
              alt="UserImage"
              className=" object-cover shadow-md z-50 rounded-full border-[2px] cursor-pointer   bg-acc border-accent"
            />
            <div
              className="absolute p-1 bottom-[-6px] left-8 bg-white flex items-center 
             justify-center w-[20px] h-[20px] rounded-full z-50"
            >
              <p className="bg-slate-300 rounded-full">
                <IoCaretDownOutline />
              </p>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent className=" flex flex-col items-center justify-center">
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className={
              "w-full h-70 Xxl:w-80 bg-white absolute top-0 rounded-md shadow-2xl"
            }
          >
            <SheetHeader className="bg-accent w-full flex items-center justify-center h-[60px] rounded-t-md px-4  ">
              <SheetTitle className=" text-white">Profile</SheetTitle>
            </SheetHeader>
            <div className="w-full h-[220px] p-2 ">
              <div className="flex items-center  justify-center w-full h-full rounded-md shadow-md p-2 hover:bg-slate-100">
                <div className="flex flex-col  items-center gap-2 ">
                  <div className="relative w-[120px] h-[120px] ">
                    <Image
                      src={data?.user.image as string}
                      alt="User"
                      fill
                      className="absolute object-cover shadow-md rounded-full"
                    />
                  </div>
                  <p>{data?.user.name}</p>
                  <p className="text-accent font-semibold">
                    {data?.user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-ful h-full gap-2 py-8">
              <div
                className="w-full p-1 cursor-pointer"
                onClick={() => router.push("/exercises")}
              >
                <div className="flex items-center justify-between w-full h-[60px] rounded-md  p-2  hover:bg-slate-100">
                  <div className="flex  items-center gap-2 ">
                    <div
                      className="h-[50px] w-[50px] text-[20px] bg-slate-300 flex 
                  items-center justify-center rounded-full"
                    >
                      <div className="relative w-[28px] h-[28px]">
                        <Image
                          src="/assets/dunbels.png"
                          alt="myFavoriteIcon"
                          fill
                          className="absolute object-cover  "
                        />
                      </div>
                    </div>
                    <p>Todos os exercícios</p>
                  </div>
                  <FaChevronRight className="flex justify-self-end" />
                </div>
              </div>
              <div
                className="w-full p-1 cursor-pointer"
                onClick={() => router.push("/myexercises")}
              >
                <div
                  className="flex items-center justify-between w-full h-[60px] rounded-md 
               p-2  hover:bg-slate-100"
                >
                  <div className="flex  items-center gap-2 ">
                    <div
                      className=" h-[50px] w-[50px] text-[20px] bg-slate-300 flex 
                  items-center justify-center rounded-full"
                    >
                      <div className="relative w-[28px] h-[28px]">
                        <Image
                          src="/assets/img/favoriteExercise.png"
                          alt="myFavoriteIcon"
                          fill
                          className="absolute object-cover  "
                        />
                      </div>
                    </div>
                    <p>Exercícios favoritos</p>
                  </div>
                  <FaChevronRight className="flex justify-self-end" />
                </div>
              </div>

              {data?.user.gymAdmin && (
                <div
                  className="w-full p-1 cursor-pointer "
                  onClick={() => router.push("/userControl")}
                >
                  <div
                    className="flex items-center justify-between w-full h-[60px] rounded-md 
               p-2 hover:bg-slate-100"
                  >
                    <div className="flex  items-center gap-2">
                      <p
                        className=" h-[50px] w-[50px] text-[28px]  bg-slate-300 flex 
                  items-center justify-center rounded-full"
                      >
                        <FaUserGroup />
                      </p>
                      <p>Controle de usuarios</p>
                    </div>
                    <FaChevronRight className="flex justify-self-end" />
                  </div>
                </div>
              )}
              <div
                className="w-full p-1 cursor-pointer "
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <div
                  className="flex items-center justify-between w-full h-[60px] rounded-md 
               p-2 hover:bg-slate-100"
                >
                  <div className="flex  items-center gap-2">
                    <p
                      className=" h-[50px] w-[50px] text-[28px]  bg-slate-300 flex 
                  items-center justify-center rounded-full"
                    >
                      <LiaSignOutAltSolid />
                    </p>
                    <p>Sair</p>
                  </div>
                  <FaChevronRight className="flex justify-self-end" />
                </div>
              </div>
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserProfile;
