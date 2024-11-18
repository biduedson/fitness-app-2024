"use client";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import React from "react";

interface ProgressiveWorkoutPlanProps {
  levelCard: {
    title: string;
    description: string;
    details: string[];
    colors: string;
  }[];
}
const ProgressiveWorkoutPlan = ({ levelCard }: ProgressiveWorkoutPlanProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Começa invisível
      animate={{ opacity: 1 }} // Fica totalmente visível
      transition={{
        duration: 1.8, // Duração rápida
        ease: "easeOut", // Suavidade na transição
      }}
      className="bg-white rounded-xl p-10 shadow-lg shadow-slate-400 relative overflow-hidden "
    >
      <h2 className="text-3xl font-bold text-red-600  text-center mb-4 ">
        Evolução no Treino: Do Iniciante ao Atleta Avançado
      </h2>
      <div className="gap-12 grid grid-cols-1 auto-rows-fr lg:grid-cols-3">
        {levelCard.map((level, idx) => (
          <div
            className={`bg-gradient-to-r  rounded-xl p-10 relative overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg shadow-slate-400 ${level.colors}`}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
              {level.title}
            </h2>
            <p
              className={`text-lg font-medium  mb-4 text-justify ${level.colors}`}
            >
              {level.description}
            </p>
            <div
              className={`p-2 rounded-lg shadow-lg shadow-slate-400 bg-white ${level.colors}`}
            >
              <ul className={`${level.colors} bg-white space-y-2`}>
                {level.details.map((detail, i) => (
                  <li key={i} className="flex items-center bg-white">
                    <span className={`mr-2 bg-white ${level.colors}`}>•</span>{" "}
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressiveWorkoutPlan;
