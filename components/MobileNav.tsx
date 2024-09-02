"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
const links = [
  { name: "início", target: "home", offset: -100 },
  { name: "sobre", target: "about", offset: -80 },
  { name: "modalidades", target: "class", offset: -80 },
  { name: "instrutores", target: "team", offset: 0 },
  { name: "planos", target: "prices", offset: -40 },
  { name: "depoimentos", target: "testimonial", offset: 0 },
  { name: "blog", target: "blog", offset: 0 },
];

const MobileNav = ({
  contaynerStyle,
  closeNav,
}: {
  contaynerStyle: string;
  closeNav: () => void;
}) => {
  const isMobile = useMediaQuery({
    query: "(max-width:640px)",
  });

  const { data } = useSession();
  return (
    <nav className={`${contaynerStyle}`}>
      {links.map((link, index) => {
        return (
          <ScrollLink
            key={index}
            offset={link.offset}
            to={link.target}
            smooth
            spy
            activeClass={`${!isMobile && "active"}`}
            className="cursor-pointer hover:text-accent transition-all"
            onClick={closeNav}
          >
            {link.name}
          </ScrollLink>
        );
      })}
      {data?.user.student && (
        <div className="flex flex-col items-center">
          <Link
            href="/exercises"
            className=" bg-accent rounded-full flex items-center justify-center
                 w-14 h-14 text-white transition-all hover:bg-white/10 "
          >
            <Image
              src="/assets/dunbels.png"
              alt="dunbels"
              width={40}
              height={40}
            />
          </Link>
          <p className="text-white text-sm text-center ">Exercícios</p>
        </div>
      )}
      {data?.user.student && (
        <div className="flex flex-col items-center">
          <Link
            href="/myexercises"
            className=" bg-accent rounded-full flex items-center justify-center
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
      )}
    </nav>
  );
};

export default MobileNav;
