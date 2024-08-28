"use client";

import { useMediaQuery } from "react-responsive";
import { Link as ScrollLink } from "react-scroll";

const links = [
  { name: "início", target: "home", offset: -100 },
  { name: "sobre", target: "about", offset: -80 },
  { name: "modalidades", target: "class", offset: -80 },
  { name: "instrutores", target: "team", offset: 0 },
  { name: "planos", target: "prices", offset: -40 },
  { name: "depoimentos", target: "testimonial", offset: 0 },
  { name: "blog", target: "blog", offset: 0 },
  { name: "exercícios", target: "exercices", offset: 0 },
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
    </nav>
  );
};

export default MobileNav;
