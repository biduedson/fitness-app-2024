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
    <>
      <motion.h2
        key="title"
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-3xl font-bold text-red-600 mb-4 text-center"
      >
        Plano Alimentar para Ganho de Massa Muscular
      </motion.h2>
      <div className="gap-12 grid grid-cols-1 auto-rows-fr lg:grid-cols-3">
        {levelCard.map((level, idx) => (
          <motion.div
            key={idx}
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-gradient-to-r bg-white rounded-xl p-10 relative overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg shadow-slate-400"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
              {level.title}
            </h2>
            <p className="text-lg font-medium text-primary-300 mb-4 text-justify">
              {level.description}
            </p>
            <div
              className={`p-2 rounded-lg shadow-lg shadow-slate-300 ${
                level.title === "Iniciantes"
                  ? "bg-blue-100 text-blue-600"
                  : level.title === "Intermediários"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <ul className="space-y-2 text-primary-200">
                {level.details.map((detail, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2 text-accent">•</span> {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ProgressiveWorkoutPlan;
