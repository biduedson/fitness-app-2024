"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

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
      <div className=" flex flex-col items-center justify-center z-50 ">
        <div
          className=" relative w-[60px]  h-[60px]"
          onClick={() => {
            setOpenProfile(!openProfile);
            if (openNav) setOpenNav!(false);
          }}
        >
          <Image
            src={imageUrl}
            fill
            alt="UserImage"
            className=" object-cover shadow-md z-50 rounded-full border-[2px] cursor-pointer   bg-acc border-accent"
          />
          <motion.div
            variants={fadeIn("down", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className={
              openProfile
                ? "w-60 h-70 Xxl:w-80 bg-white absolute top-[81px] left-[-150px] xl:left-[-240px] rounded-md shadow-2xl"
                : "hidden"
            }
          >
            <div className="bg-accent w-full h-[40px] rounded-t-md px-4">
              <h4 className="text-white">Profile</h4>
            </div>
            <div className="w-full h-[80px] p-2 ">
              <div className="flex items-center w-full h-[50px] rounded-md shadow-md p-2 hover:bg-slate-100">
                <div className="flex  items-center gap-2 ">
                  <div className="relative w-[40px] h-[40px] ">
                    <Image
                      src={data?.user.image as string}
                      alt="User"
                      fill
                      className="absolute object-cover shadow-md rounded-full"
                    />
                  </div>
                  <p>{data?.user.name}</p>
                </div>
              </div>
            </div>
            <div
              className="w-full p-1 cursor-pointer"
              onClick={() => router.push("/exercises")}
            >
              <div className="flex items-center justify-between w-full h-[40px] rounded-md  p-2 hover:bg-slate-100">
                <div className="flex  items-center gap-2 ">
                  <div
                    className=" h-[30px] w-[30px] text-[20px] bg-slate-300 flex 
                  items-center justify-center rounded-full"
                  >
                    <div className="relative w-[20px] h-[20px]">
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
                className="flex items-center justify-between w-full h-[40px] rounded-md 
               p-2 hover:bg-slate-100"
              >
                <div className="flex  items-center gap-2 ">
                  <div
                    className=" h-[30px] w-[30px] text-[20px] bg-slate-300 flex 
                  items-center justify-center rounded-full"
                  >
                    <div className="relative w-[26px] h-[26px]">
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
            <div
              className="w-full p-1 cursor-pointer "
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <div
                className="flex items-center justify-between w-full h-[40px] rounded-md 
               p-2 hover:bg-slate-100"
              >
                <div className="flex  items-center gap-2">
                  <p
                    className=" h-[30px] w-[30px] text-[20px]  bg-slate-300 flex 
                  items-center justify-center rounded-full"
                  >
                    <LiaSignOutAltSolid />
                  </p>
                  <p>Sair</p>
                </div>
                <FaChevronRight className="flex justify-self-end" />
              </div>
            </div>
          </motion.div>
          <div
            className="absolute p-1 bottom-[-6px] left-8 bg-white flex items-center 
             justify-center w-[20px] h-[20px] rounded-full z-50"
          >
            <p className="bg-slate-300 rounded-full">
              <IoCaretDownOutline />
            </p>
          </div>
        </div>

        <p className="text-white text-center text-[14px]">{name}</p>
      </div>
    </>
  );
};

export default UserProfile;
