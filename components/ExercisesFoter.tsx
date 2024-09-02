"use client";

import Link from "next/link";
import MyExercisesDesktopNav from "../app/myexercises/componets/MyExercisesDesktopNav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

interface MyExercisesfooterProps {
  linkName: string;
  url: string;
}
const ExercisesFooter = ({ url, linkName }: MyExercisesfooterProps) => {
  const { data } = useSession();
  const router = useRouter();
  const [headrActive, setHeaderActive] = useState(false);

  const handleSigninClick = () => {
    router.replace("/");
  };

  return (
    <header
      className={`${headrActive ? "h-[100px]" : "h-[124px]"} 
    fixed max-w-[1920px] bottom-0  w-full bg-primary-200 h-[100px] transition-all z-50`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {/*hide/open menu button*/}
        {data?.user.student && (
          <div className="flex gap-4 items-center w-full justify-between">
            <div className="flex flex-col items-center ">
              <Link
                href={url}
                className=" bg-accent  rounded-full flex items-center justify-center
                 w-14 h-14 text-white transition-all hover:bg-white/10 "
              >
                <Image
                  src="/assets/dunbels.png"
                  alt="dunbels"
                  width={40}
                  height={40}
                />
              </Link>
              <p className="text-white text-sm text-center ">{linkName}</p>
            </div>
            <div
              className="flex flex-col items-center"
              onClick={handleSigninClick}
            >
              <div
                className=" bg-accent  rounded-full flex items-center justify-center
                 w-14 h-14 text-white transition-all hover:bg-white/10 "
              >
                <FaHome className="text-primary-300 text-[40px]" />
              </div>
              <p className="text-white text-sm text-center ">inicio</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExercisesFooter;
