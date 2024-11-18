// components/Exercicios.tsx
"use client";
import ExerciseCard from "@/components/ExerciseCard";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import CategoryExercisesButton from "@/components/CategoryExercisesButton";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0 }} // Começa invisível
          animate={{ opacity: 1 }} // Fica totalmente visível
          transition={{
            duration: 1.8, // Duração rápida
            ease: "easeOut", // Suavidade na transição
          }}
          className="w-full h*full"
        >
          {!dataExercises ? (
            <div className="bg-white w-full flex items-center justify-center rounded-lg shadow-md text-center text-red-600 p-4">
              <h1>Escolha a categoria de exercícios</h1>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3  xl:grid-cols-7 gap-4">
              {dataExercises.map((exercise) => (
                <motion.div
                  initial={{ opacity: 0 }} // Começa invisível
                  animate={{ opacity: 1 }} // Fica totalmente visível
                  transition={{
                    duration: 1.8, // Duração rápida
                    ease: "easeOut", // Suavidade na transição
                  }}
                  key={exercise.name}
                  className="bg-white rounded-lg shadow-md"
                >
                  <ExerciseCard exercise={exercise} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
