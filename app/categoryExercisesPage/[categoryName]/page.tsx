"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importe useParams
import { motion } from "framer-motion";
import ExerciseCard from "@/components/ExerciseCard";
import { useRouter } from "next/navigation";

import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSession } from "next-auth/react";

const CategoryExercisesPage = () => {
  const route = useRouter();
  const { categoryName } = useParams(); // Obtém o nome da categoria da rota
  const [dataExercises, setDataExercises] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session, status } = useSession(); // Pega a sessão e o status

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    }

    if (status === "unauthenticated") {
      return route.replace("/login");
    }

    if (status === "authenticated" && categoryName) {
      const fetchExercises = async () => {
        try {
          const response = await fetch(
            `/api/exerciseswhitcategory/${categoryName}`
          );
          const exercises = await response.json();
          setDataExercises(exercises);
        } catch (error) {
          console.error("Erro ao buscar exercícios:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchExercises();
    }
  }, [status, session, categoryName, route]);
  if (session && !session.user.student) {
    return (
      <section
        className="w-full flex h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="exercises"
      >
        <h4 className="text-white text-center text-xl">
          Somente alunos têm acesso a este conteúdo.
        </h4>
      </section>
    );
  }
  //decodificar  o categoryname do parmas
  const decodedCategoryName = categoryName
    ? decodeURIComponent(categoryName as string)
    : "";

  return (
    <div className=" relastive min-h-screen px-4 py-8 Xxl:py-2 bg-black_texture">
      <div
        onClick={() => route.replace("/exerciseGuidePage")}
        className="absolute top-4 left-4 flex cursor-pointer items-center justify-center right-2 text-[20px] text-black bg-slate-300 rounded-full w-12 h-12
          hover:text-red-500 transition-colors duration-200 z-10 "
      >
        <MdOutlineArrowBackIos />
      </div>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold  mb-6 text-accent uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {decodedCategoryName}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Explore todos os exercícios para{" "}
          <strong>{decodedCategoryName}</strong>
        </motion.p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Carregando exercícios...</p>
        </div>
      ) : dataExercises.length > 0 ? (
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  max-h-[80vh] xxl:h-[70vh] xl:grid-cols-4 max-w-5xl Xxl:max-w-7xl mx-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden"
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
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </motion.div>
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

export default CategoryExercisesPage;
