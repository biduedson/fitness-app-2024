"use client";

import { FaUser } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { FaDumbbell } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Achievements from "./Achievements";

const featured = [
  {
    icon: <FaUser />,
    title: "Treinadores Premiados",
    subtitle:
      "Nossa equipe é composta por profissionais reconhecidos e premiados, prontos para levar você ao próximo nível com treinos personalizados e motivação constante.",
  },
  {
    icon: <IoIosPricetag />,
    title: "Preços Imbatíveis",
    subtitle:
      "Oferecemos planos acessíveis sem abrir mão da qualidade. Experimente treinar em um ambiente premium a um custo que cabe no seu bolso.",
  },
  {
    icon: <FaDumbbell />,
    title: "Equipamentos Modernos",
    subtitle:
      "Treine com o que há de mais avançado. Nossa academia oferece máquinas de última geração para garantir o melhor desempenho e segurança no seu treino.",
  },
];

const About = () => {
  return (
    <section className="pt-8 pb-14 lg:pt-16 bg-white lg:pb-28" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-2 mb-8">
          <motion.h2
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="h2 text-center"
          >
            sobre nós
          </motion.h2>
          <motion.p
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="max-w-[600px] mx-auto text-center"
          >
            Nosso compromisso é fornecer um ambiente de treino que inspira e
            motiva. Acreditamos no poder da dedicação e da disciplina para
            alcançar resultados transformadores.
          </motion.p>
        </div>
        {/* features items */}
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-16"
        >
          {featured.map((feature, index) => {
            return (
              <div
                className="flex flex-col justify-center items-center gap-4 border p-10"
                key={index}
              >
                <div
                  className="text-4xl bg-primary-300 text-white w-[80px] h-[80px]
                rounded-full flex justify-center items-center"
                >
                  {feature.icon}
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <h4 className=" h4 text-accent">{feature.title}</h4>
                  <p className="text-center">{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
        {/* achievements */}
        <motion.div
          variants={fadeIn("up", 1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Achievements />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
