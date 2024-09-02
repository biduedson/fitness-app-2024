"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const ExercisesHeader = () => {
  const { data } = useSession();
  const router = useRouter();
  const [headrActive, setHeaderActive] = useState(false);

  const handleSigninClick = () => {
    signIn().then(() => {
      router.replace("/");
    });
  };

  return (
    <header
      className={`${headrActive ? "h-[100px]" : "h-[124px]"} 
    fixed max-w-[1920px] top-0  w-full bg-primary-200 h-[100px] transition-all z-50`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* logo */}
        <Link href="">
          <Image src={"/assets/img/logo.png"} width={117} height={55} alt="" />
        </Link>

        {/*hide/open menu button*/}
        {data?.user.student && (
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <Link
                href="/myexercises"
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
              <p className="text-white text-sm text-center ">
                Exercícios favoritos
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Link
                href="/"
                className=" bg-accent  rounded-full flex items-center justify-center
                 w-14 h-14 text-white transition-all hover:bg-white/10 "
              >
                <FaHome className="text-primary-300 text-[40px]" />
              </Link>
              <p className="text-white text-sm text-center ">inicio</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExercisesHeader;
