"use server";

import React from "react";
import CategoryButtonsLIst from "@/components/categories/CategoryButtonsLIst";
import ExercisesHeader from "./ExercisesHeader";
import ExercisesFooter from "@/components/ExercisesFoter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

const Exercicies = async () => {
  const data = await getServerSession(authOptions);

  const categoryExercises = await db.exerciseCategory.findMany({
    include: {
      exercises: {
        include: {
          category: true,
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!data?.user.student) {
    return (
      <section
        className=" w-full flex h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="exercises"
      >
        <h4 className="h4 text-white text-center">
          Somente alunos tem acesso a este conteúdo
        </h4>
      </section>
    );
  }

  return (
    <>
      <section
        className=" w-full  h-auto flex flex-col   justify-center bg-primary-300 px-4 lg:px-0"
        id="exercises"
      >
        <CategoryButtonsLIst id="s" categoryAndExercises={categoryExercises} />
      </section>
    </>
  );
};

export default Exercicies;
