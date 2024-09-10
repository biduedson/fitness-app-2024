"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import UserProfile from "./UserProfile";

const ExercisesHeader = ({ title }: { title: string }) => {
  const { data } = useSession();
  const router = useRouter();
  const [headrActive, setHeaderActive] = useState(false);

  const handleSigninClick = () => {
    signOut().then(() => {
      router.replace("/");
    });
  };
  const handleHomeClick = () => {
    router.replace("/");
  };

  return (
    <header
      className={`${headrActive ? "h-[100px]" : "h-[124px]"} 
    max-w-[1920px] top-0  w-full bg-primary-200 h-[100px] transition-all z-50 px-4`}
    >
      <div className="container mx-auto h-full flex items-center justify-between ">
        <div className="flex flex-col items-center" onClick={handleHomeClick}>
          <div
            className=" bg-accent  rounded-full flex flex-col items-center justify-center
                 w-14 h-14 text-white transition-all hover:bg-white/10 cursor-pointer "
          >
            <FaHome className="text-primary-300 text-[30px]" />
            <p className="text-primary-300 text-[12px] font-semibold text-center ">
              inicio
            </p>
          </div>
        </div>
        <motion.h4
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h5 text-center mb-2 p-6 text-white"
        >
          {title}
        </motion.h4>
        {/*hide/open menu button*/}
        {data?.user.student && (
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              {data?.user && (
                <UserProfile imageUrl={data.user.image as string} />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExercisesHeader;
