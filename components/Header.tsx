"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";
import ButtonLogin from "./ButtonLogin";

const Header = () => {
  const { data } = useSession();
  const [headrActive, setHeaderActive] = useState(false);
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      //detect scroll
      setHeaderActive(window.scrollY > 50);
    };

    // add scroll event

    window.addEventListener("scroll", handleScroll);

    // clear scroll event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${headrActive ? "h-[100px]" : "h-[124px]"} 
    fixed max-w-[1920px] top-0  w-full bg-primary-200 h-[100px] transition-all z-50 shadow-lg  shadow-primary-300`}
    >
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* mobile nav - hidden on large diveces*/}
        <MobileNav
          closeNav={() => setOpenNav(!openNav)}
          contaynerStyle={`${headrActive ? "top-[90px]" : "top-[124px]"}
          
            ${
              openNav
                ? "max-h-max  pb-10 border-t border-white/10"
                : "max-h-0 pt-0 pb-0 overflow-hidden border-white/0"
            } 
            flex flex-col text-center gap-8 bg-primary-200 w-full 
            fixed left-0  text-base uppercase font-medium transition-all xl:hidden text-white`}
        />

        {/* desktop nav - hidden on small diveces*/}
        <Nav
          containerStyles="py-12 flex gap-4 text-white text-base uppercase font-medium 
        transition-all hidden lg:flex"
        />

        {/*hide/open menu button*/}

        {/*avatar login user*/}
        {data?.user && (
          <>
            <UserProfile
              imageUrl={data.user.image as string}
              openNav={openNav}
              setOpenNav={setOpenNav}
            />
          </>
        )}

        {/* logo */}
        <Link href="/">
          <Image src={"/assets/img/logo.png"} width={117} height={55} alt="" />
        </Link>
        <button
          className="text-white lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          <MdMenu className="text-4xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;
