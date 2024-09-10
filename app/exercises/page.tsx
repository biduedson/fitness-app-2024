"use server";

import React from "react";
import CategoryButtonsLIst from "@/components/categories/CategoryButtonsLIst";
import ExercisesHeader from "../../components/ExercisesHeader";
import ExercisesFooter from "@/components/ExercisesFoter";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";

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
    return notFound();
  }

  return (
    <>
      <ExercisesHeader title="exercícios" />
      <section className="overflow-y-hiddne w-full  h-full flex  justify-center bg-primary-300 px-4 lg:px-0">
        <CategoryButtonsLIst
          id="exercises"
          categoryAndExercises={categoryExercises}
        />
      </section>
      <ExercisesFooter url="/myexercises" linkName="Exercícios favoritos" />
    </>
  );
};

export default Exercicies;
