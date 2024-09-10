"use client";

import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const trainerData = [
  {
    image: "/assets/img/trainers/david.jpg",
    name: "David Williams",
    role: "Instrutor de musculação.",
    description:
      "Com expertise em treinamento personalizado, David Williams cria planos para maximizar sua força e definição.",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com" },
      { icon: FaTwitter, href: "https://www.twitter.com" },
      { icon: FaYoutube, href: "https://www.youtube.com" },
    ],
  },
  {
    image: "/assets/img/trainers/rosy.jpg",
    name: "Rosy Rivera",
    role: "Instrutora de musculação.",
    description:
      "Rosy Rivera é uma instrutora experiente em musculação, destacando-se por seus treinamentos personalizados e eficazes.",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com" },
      { icon: FaTwitter, href: "https://www.twitter.com" },
      { icon: FaYoutube, href: "https://www.youtube.com" },
    ],
  },
  {
    image: "/assets/img/trainers/matt.jpg",
    name: "Matt Stone",
    role: "Instrutor de crossfit.",
    description:
      "Matt Stone é um instrutor de CrossFit, conhecido por seus treinos desafiadores e motivadores.",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com" },
      { icon: FaTwitter, href: "https://www.twitter.com" },
      { icon: FaYoutube, href: "https://www.youtube.com" },
    ],
  },
  {
    image: "/assets/img/trainers/sofia.jpg",
    name: "Sofia Lauren",
    role: "Instrutora de Aeróbicos.",
    description:
      "Sofia Lauren é uma instrutora de aeróbicos, destacando-se por suas aulas energéticas e envolventes.",
    social: [
      { icon: FaFacebook, href: "https://www.facebook.com" },
      { icon: FaTwitter, href: "https://www.twitter.com" },
      { icon: FaYoutube, href: "https://www.youtube.com" },
    ],
  },
];

const Team = () => {
  return (
    <section className="py-12 xl:h-[110vh] bg-white" id="team">
      <div
        className="container mx-auto h-full flex flex-col items-center
      justify-center"
      >
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center mb-6"
        >
          Our Trainers
        </motion.h2>
        {/* trainers grid */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-12"
        >
          {trainerData.map((treiner, index) => {
            return (
              <div
                className="flex flex-col items-center text-center"
                key={index}
              >
                {/* image */}
                <div className="relative w-[320px] h-[360px] mx-auto mb-4">
                  <Image
                    src={treiner.image}
                    fill
                    alt={treiner.name}
                    className="object-cover"
                  />
                </div>
                {/* name */}
                <h4 className="h4 mb-2">{treiner.name}</h4>
                {/* role */}
                <p className="uppercase tracking-[3px] text-xs mb-2">
                  {treiner.role}
                </p>
                {/* description */}
                <p className="mb-6 max-w-[320px] mx-auto">
                  {treiner.description}
                </p>
                {/* docials */}
                <div className="flex gap-12 justify-center">
                  {treiner.social.map((social, index) => {
                    return (
                      <div key={index}>
                        <Link href={social.href} className="hover:text-accent">
                          <social.icon className="text-lg" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* btn */}
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <CustomButton
            containerStyles="w-[196px] h-[62px]"
            text="See all trainers"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
