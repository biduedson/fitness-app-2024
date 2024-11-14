"use client";

import { useMediaQuery } from "react-responsive";
import { Link as ScrollLink } from "react-scroll";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const MobileNav = ({
  contaynerStyle,
  closeNav,
}: {
  contaynerStyle: string;
  closeNav: () => void;
}) => {
  const isMobile = useMediaQuery({ query: "(max-width:640px)" });
  const { data } = useSession();
  const router = useRouter();

  const links = [
    { name: "Início", target: "home", offset: -80 },
    { name: "Sobre", target: "about", offset: -60 },
    { name: "Modalidades", target: "class", offset: -60 },
    { name: "Instrutores", target: "team", offset: 0 },
    { name: "Planos", target: "prices", offset: -40 },
    { name: "Depoimentos", target: "testimonial", offset: 0 },
    { name: "Blog", target: "blog", offset: 0 },
    {
      name: data?.user.student ? "Logout" : "Login",
      target: "",
      offset: 0,
      href: "/login",
    },
  ];

  return (
    <nav className={`${contaynerStyle} bg-white text-foreground shadow-lg`}>
      {/* Cabeçalho com visual elegante e minimalista */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative w-full h-[150px] flex items-center justify-center "
      >
        <div className="relative w-full h-full mb-2  overflow-hidden border ">
          <Image
            src="/assets/img/bannerExercisePage.png"
            alt="Imagem do Usuário"
            fill
            className="absolute object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Perfil do usuário */}
      {data?.user.student && (
        <div className="flex flex-col items-center  text-center text-primary-foreground">
          <div className="relative w-[70px] h-[70px] mb-2 rounded-full overflow-hidden border border-muted-foreground shadow-inner-smoke">
            <Image
              src={data?.user.image!}
              alt="Imagem do Usuário"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h3 className="text-lg font-medium text-primary-300">
            {data?.user.name}
          </h3>
          <span className="text-muted-foreground text-sm">
            {data?.user.email}
          </span>
        </div>
      )}

      {/* Links de Navegação */}
      <div className="flex flex-col items-center gap-4 mt-6 px-5 text-base">
        {links.map((link, index) => (
          <ScrollLink
            key={index}
            offset={link.offset}
            to={link.target}
            smooth
            spy
            onClick={() => {
              if (link.name === "Logout") {
                signOut();
              } else if (link.href) {
                router.push(link.href);
              }
              closeNav();
            }}
            className={`w-full py-2 px-3 text-center rounded-lg font-medium transition-colors ${
              ["Login", "Logout"].includes(link.name)
                ? "bg-destructive text-destructive-foreground shadow-sm shadow-slate-400"
                : "bg-slate-100 shadow-sm shadow-black/50 text-secondary-foreground hover:bg-muted hover:text-muted-foreground"
            }`}
          >
            {link.name}
          </ScrollLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
