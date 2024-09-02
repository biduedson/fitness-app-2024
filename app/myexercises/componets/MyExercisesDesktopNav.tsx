"use client";

import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const links = [
  { name: "início", href: "/" },
  { name: "sair", href: "/" },
];

const MyExercisesDesktopNav = ({
  containerStyles,
}: {
  containerStyles: string;
}) => {
  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.href as string}
            key={index}
            className="cursor-pointer hover:text-accent transition-all"
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default MyExercisesDesktopNav;
