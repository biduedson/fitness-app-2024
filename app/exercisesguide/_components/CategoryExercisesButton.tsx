"use client";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { group } from "console";
import React, { useState } from "react";

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
    setExercises(null);
    setExercises(exercises);
  };
  return (
    <div className=" grid grid-cols-3 lg:flex gap-4 justify-center p-4 bg-white rounded-lg shadow-lg shadow-slate-300 mb-2">
      {categoryGroup.map((grupo) => (
        <Button
          key={grupo.name}
          onClick={() => handleGrupoClick(grupo.exercises)}
          className={`bg-red-600 min-w-[120px] hover:bg-blue-700 text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 $`}
        >
          {grupo.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryExercisesButton;