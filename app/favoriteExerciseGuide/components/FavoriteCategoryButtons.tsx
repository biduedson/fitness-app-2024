"use client";
import {
  IAllSets,
  ICategoryandExercises,
  IExercises,
} from "@/app/interfaces/ExercicesInterfacesProps";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { group } from "console";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { FocusEvent } from "react";

interface FavoriteCategoryButtonsProps
  extends ICategoryandExercises,
    IAllSets {}
const FavoriteCategoryButtons = ({
  categories,
  setExercises,
}: FavoriteCategoryButtonsProps) => {
  const handleGrupoClick = (exercises: IExercises["exercises"] | null) => {
    console.log("clicou");
    setExercises(exercises);
  };
  const handleClick = useCallback(
    (exercises: IExercises["exercises"] | null) => {
      setExercises(exercises);
    },
    []
  );
  const scrollToView = (event: FocusEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Evita rolar a página para baixo
        inline: "center", // Centraliza horizontalmente
      });
    }
  };
  return (
    <>
      <div className=" xl:hidden flex mb-8  gap-2  min-w-full p-6 r bg-white rounded-lg shadow-lg shadow-slate-300 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {categories.map((grupo) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={grupo.name}
            onClick={() => handleGrupoClick(grupo.exercises)}
            onFocus={(event) => scrollToView(event)}
            className="bg-red-600 min-w-[120px] focus:bg-primary/90    focus:translate-y-1.5 active:-scale-y-50  transition-all ease-in-out text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 "
          >
            {grupo.name}
          </motion.button>
        ))}
      </div>
      <div className="hidden min-w-full  xl:flex gap-4 justify-center p-4 bg-white rounded-lg shadow-lg shadow-slate-300 mb-2">
        {categories.map((grupo) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={grupo.name}
            onClick={() => handleClick(grupo.exercises)}
            className=" bg-red-600 min-w-[120px] 
    focus:bg-primary/90   focus:shadow-black
    
    transition-transform ease-in-out 
    text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 "
          >
            {grupo.name}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default FavoriteCategoryButtons;
