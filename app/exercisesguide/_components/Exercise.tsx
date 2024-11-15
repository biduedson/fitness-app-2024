// components/Exercicios.tsx
"use client";
import ExerciseCard from "@/components/ExerciseCard";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import CategoryExercisesButton from "@/components/CategoryExercisesButton";

interface Props {
  grupoSelecionado?: string;
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
  exercises: Prisma.ExerciseGetPayload<{
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
  }>[];
}

export default function Exercises({ exercises, categoryGroup }: Props) {
  const [dataExercises, setDataExercises] = useState<Props["exercises"] | null>(
    null
  );

  return (
    <>
      <div className="w-full  p-4 ">
        <CategoryExercisesButton
          categoryGroup={categoryGroup}
          setExercises={setDataExercises}
          exercises={dataExercises}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {!dataExercises ? (
            <div className="bg-white rounded-lg shadow-md text-center text-red-600 p-4">
              <h1>Escolha a categoria de exercícios</h1>
            </div>
          ) : (
            dataExercises.map((exercise) => (
              <div
                key={exercise.name}
                className="bg-white rounded-lg shadow-md"
              >
                <ExerciseCard exercise={exercise} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
