"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import UserAvatar from "./UserAvatar";

const ExercisesHeader = () => {
  const { data } = useSession();
  const router = useRouter();
  const [headrActive, setHeaderActive] = useState(false);

  const handleSigninClick = () => {
    signOut().then(() => {
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
              {data?.user && (
                <UserAvatar
                  imageUrl={data.user.image as string}
                  name={data.user.name as string}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExercisesHeader;
