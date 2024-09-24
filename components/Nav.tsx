"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
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
  { name: "Exercícios", target: "exercises", offset: -40 },
  { name: "Meus Exercícios", target: "my-exercises", offset: -40 },
  { name: "login", target: "login", offset: -40 },
];

const Nav = ({ containerStyles }: { containerStyles: string }) => {
  const { data } = useSession();
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
            activeClass="active"
            className="cursor-pointer hover:text-accent transition-all"
          >
            {link.name}
          </ScrollLink>
        );
      })}
    </nav>
  );
};

export default Nav;
