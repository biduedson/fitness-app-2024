"use client";

import { useSession } from "next-auth/react";
import { Link as ScrollLink } from "react-scroll";
import { useRouter } from "next/navigation";

const Nav = ({ containerStyles }: { containerStyles: string }) => {
  const { data } = useSession();
  const route = useRouter();
  const handleRoute = (name: string) => {
    if (name === "Exercícios") route.push("/exercises");
    if (name === "Meus Exercícios") route.push("/myexercises");
  };
  const links = [
    { name: "início", target: "home", offset: -100 },
    { name: "sobre", target: "about", offset: -80 },
    { name: "modalidades", target: "class", offset: -80 },
    { name: "instrutores", target: "team", offset: 0 },
    { name: "planos", target: "prices", offset: -40 },
    { name: "depoimentos", target: "testimonial", offset: 0 },
    { name: "blog", target: "blog", offset: 0 },
    { name: "Exercícios", target: "", offset: -40 },
    { name: "Meus Exercícios", target: "", offset: -40 },
    {
      name: data?.user.student ? "logout" : "login",
      target: "login",
      offset: -40,
    },
  ];

  return (
    <nav className={`${containerStyles} flex items-center`}>
      {links.map((link, index) => {
        return (
          <ScrollLink
            key={index}
            offset={link.offset}
            to={link.target}
            smooth
            spy
            onClick={() => handleRoute(link.name)}
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
                ? " flex items-center justify-center w-[170px] cursor-pointer  bg-accent p-2 rounded-md"
                : "cursor-pointer hover:text-accent transition-all"
            }
          >
            {link.name}
          </ScrollLink>
        );
      })}
    </nav>
  );
};

export default Nav;
