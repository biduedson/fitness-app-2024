"use client";

import { Link as ScrollLink } from "react-scroll";

const links = [
  { name: "início", target: "home", offset: -100 },
  { name: "sobre", target: "about", offset: -80 },
  { name: "modalidades", target: "class", offset: -80 },
  { name: "instrutores", target: "team", offset: 0 },
  { name: "planos", target: "prices", offset: -40 },
  { name: "depoimentos", target: "testimonial", offset: 0 },
  { name: "Meus exercícios", target: "myexercises", offset: 0 },
  { name: "blog", target: "blog", offset: 0 },
  { name: "exercícios", target: "exercices", offset: 0 },
];

const Nav = ({ containerStyles }: { containerStyles: string }) => {
  return (
    <nav className={`${containerStyles}`}>
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
