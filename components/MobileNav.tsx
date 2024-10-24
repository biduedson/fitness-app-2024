"use client";

import { useMediaQuery } from "react-responsive";
import { Link as ScrollLink } from "react-scroll";
import UserProfile from "./UserProfile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useRouter } from "next/navigation";

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
  const route = useRouter();

  const links = [
    { name: "início", target: "home", offset: -100, href: null },
    { name: "sobre", target: "about", offset: -80, href: null },
    { name: "modalidades", target: "class", offset: -80, href: null },
    { name: "instrutores", target: "team", offset: 0, href: null },
    { name: "planos", target: "prices", offset: -40, href: null },
    { name: "depoimentos", target: "testimonial", offset: 0, href: null },
    { name: "blog", target: "blog", offset: 0, href: null },
    { name: "Exercícios", target: "", offset: -40, href: "/exercises" },
    { name: "Meus Exercícios", target: "", offset: 0, href: "/myexercises" },
    {
      name: data?.user.student ? "logout" : "login",
      target: "",
      offset: -40,
      href: "/login",
    },
  ];

  return (
    <nav className={`${contaynerStyle} bg-primary-300 `}>
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative  w-full h-[150px] flex flex-col items-center mx-auto p-4 clip-custom-bottom
        "
      >
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="banner"
          fill
          className="absolute object-cover rounded-b-[]"
        />
      </motion.div>

      {data?.user.student && (
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="absolute top-[7%] w-full flex flex-col items-center   "
        >
          <div className="relative w-[140px] h-[140px] mb-2">
            <Image
              src={data?.user.image!}
              alt="userImage"
              fill
              className="absolute rounded-full object-cover shadow-slate-100  shadow-2xl"
              sizes="(width: 140px)"
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className=" h3 capitalize">{data?.user.name!}</h3>
            <span className=" lowercase text-sm">{data?.user.email}</span>
          </div>
        </motion.div>
      )}
      <div className="w-full mt-[100px] ">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col w-full justify-center items-center gap-2  h-[55vh]  rounded-lg
         "
        >
          {links.map((link, index) => {
            return (
              <ScrollLink
                key={index}
                offset={link.offset}
                to={link.target}
                smooth
                spy
                onClick={link.href ? () => route.push(link.href) : closeNav}
                activeClass={
                  ["Exercícios", "Meus Exercícios", "login", "logout"].includes(
                    link.name
                  )
                    ? "inative"
                    : "active"
                }
                className={
                  ["Exercícios", "Meus Exercícios", "login", "logout"].includes(
                    link.name
                  )
                    ? " flex items-center justify-center w-[180px] cursor-pointer text-[18px] rounded-2xl border-accent border-[1px] p-2 "
                    : "cursor-pointer hover:text-accent transition-all text-[18px]"
                }
              >
                {link.name}
              </ScrollLink>
            );
          })}
        </motion.div>
      </div>
    </nav>
  );
};

export default MobileNav;
