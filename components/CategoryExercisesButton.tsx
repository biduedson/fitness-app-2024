"use client";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { group } from "console";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { FocusEvent } from "react";

interface CategoryExercisesButtonProps {
  categoryGroup: Prisma.ExerciseCategoryGetPayload<{
    include: {
      exercises: {
        include: {
          category: true;
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true;
                };
              };
            };
          };
        };
      };
    };
  }>[];

  exercises:
    | Prisma.ExerciseGetPayload<{
        include: {
          category: true;
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true;
                };
              };
            };
          };
        };
      }>[]
    | null;
  setExercises: React.Dispatch<
    React.SetStateAction<CategoryExercisesButtonProps["exercises"] | null>
  >;
}

const CategoryExercisesButton = ({
  categoryGroup,
  setExercises,
}: CategoryExercisesButtonProps) => {
  const handleGrupoClick = (
    exercises: CategoryExercisesButtonProps["exercises"] | null
  ) => {
    console.log("clicou");
    setExercises(exercises);
  };
  const handleClick = useCallback(
    (exercises: CategoryExercisesButtonProps["exercises"] | null) => {
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
      <div className=" xl:hidden flex   gap-2  min-w-full p-6  bg-white rounded-lg shadow-lg shadow-slate-300 mb-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {categoryGroup.map((grupo) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={grupo.name}
            onClick={() => handleGrupoClick(grupo.exercises)}
            onFocus={(event) => scrollToView(event)}
            className="bg-red-600 min-w-[120px] focus:bg-primary/90 focus:shadow-black    focus:translate-y-1.5 active:-scale-y-50  transition-all ease-in-out text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 $"
          >
            {grupo.name}
          </motion.button>
        ))}
      </div>
      <div className="hidden min-w-full  xl:flex gap-4 justify-center p-4 bg-white rounded-lg shadow-lg shadow-slate-300 mb-2">
        {categoryGroup.map((grupo) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={grupo.name}
            onClick={() => handleClick(grupo.exercises)}
            className=" bg-red-600 min-w-[120px] 
    focus:bg-primary/90   focus:shadow-black
    
    transition-transform ease-in-out 
    text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600  "
          >
            {grupo.name}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default CategoryExercisesButton;
