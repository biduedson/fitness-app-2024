"use client";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";

interface MuscleBuildingDietProps {
  foodPlan: {
    id: number;
    titulo: string;
    cor: string;
    dados: { tipo: string; descricao: string }[];
  }[];
}

const MuscleBuildingDiet = ({ foodPlan }: MuscleBuildingDietProps) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-white rounded-xl p-10 shadow-lg shadow-slate-400 relative overflow-hidden transform transition duration-500 hover:scale-105"
    >
      <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
        Plano Alimentar para Ganho de Massa Muscular
      </h2>
      <ul className="py-4 text-primary-300 sm:grid-cols-2 grid lg:grid-cols-3 gap-4 lg:gap-8">
        {foodPlan.map((refeicao) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ timeConstant: 0.2 }}
            key={refeicao.id}
            className={`p-4 rounded-lg shadow-lg shadow-slate-300 hover:shadow-slate-500 ${refeicao.cor} `}
          >
            <strong>
              {refeicao.id}. {refeicao.titulo}:
            </strong>
            <ul className="ml-4">
              {refeicao.dados.map((item, index) => (
                <li key={index}>
                  <strong>{item.tipo}:</strong> {item.descricao}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MuscleBuildingDiet;
