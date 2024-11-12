"use client"; // Isso garante que este componente seja tratado como cliente

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { motion } from "framer-motion";
import FavoriteExerciseCard from "../_componets/FavoriteExerciseCard";
import { Prisma } from "@prisma/client";

interface CategoryListProps {
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
  }>[]; // Tipo de dados dos exercícios passados
  categoryName: string;
}

const CategoryList = ({ exercises, categoryName }: CategoryListProps) => {
  const router = useRouter();
  const [dataExercises, setDataExercises] = useState(exercises); // Estado para armazenar os exercícios
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  useEffect(() => {
    // Simula um carregamento para mostrar a transição
    setIsLoading(false);
  }, []);

  return (
    <div className="relative min-h-screen px-4 py-8 bg-primary-300">
      <div
        onClick={() => router.replace("/favoriteExerciseGuide")}
        className="absolute z-50 top-4 left-4 flex cursor-pointer items-center justify-center text-black bg-slate-300 rounded-full w-12 h-12"
      >
        <MdOutlineArrowBackIos />
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold mb-6 text-red-600 uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Exercícios para a categoria {categoryName}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Explore todos os exercícios para <strong>{categoryName}</strong>
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Carregando exercícios...</p>
        </div>
      ) : dataExercises.length > 0 ? (
        <div className="flex w-full h-full items-center">
          <motion.div
            className="grid gap-6  max-h-[80vh] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(200px,300px))] max-w-5xl mx-auto  overflow-y-scroll  [&::-webkit-scrollbar]:hidden"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {dataExercises.map((exercise, index) => (
              <FavoriteExerciseCard
                key={index}
                exercise={exercise}
                exercises={dataExercises}
                setExercices={setDataExercises}
              />
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">
            Nenhum exercício encontrado para a categoria{" "}
            <strong>{categoryName}</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;