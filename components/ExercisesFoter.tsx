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
      <div className="container mx-auto h-full flex items-center justify-center">
        {/*hide/open menu button*/}
        {data?.user.student && (
          <div className="flex gap-4 items-center w-full justify-center">
            {/* logo */}
            <Link href="">
              <Image
                src={"/assets/img/logo.png"}
                width={150}
                height={55}
                alt=""
              />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExercisesFooter;
