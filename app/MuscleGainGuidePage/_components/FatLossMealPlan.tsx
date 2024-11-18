"use client";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";

interface MuscleBuildingDietProps {
  weightLossPlan: {
    id: number;
    titulo: string;
    cor: string;
    dados: { tipo: string; descricao: string }[];
  }[];
}

const FatLossMealPlan = ({ weightLossPlan }: MuscleBuildingDietProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Começa invisível
      animate={{ opacity: 1 }} // Fica totalmente visível
      transition={{
        duration: 1.8, // Duração rápida
        ease: "easeOut", // Suavidade na transição
      }}
      className="bg-white rounded-xl p-10 shadow-lg shadow-slate-400 relative overflow-hidden  "
    >
      <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
        Plano Alimentar para Emagrecimento e Perda de Gordura
      </h2>
      <ul className="py-4 text-primary-300 sm:grid-cols-2 grid lg:grid-cols-3 gap-4 lg:gap-8">
        {weightLossPlan.map((refeicao) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ timeConstant: 0.2 }}
            key={refeicao.id}
            className={`p-4 rounded-lg shadow-lg shadow-slate-300 ${refeicao.cor} `}
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

export default FatLossMealPlan;
