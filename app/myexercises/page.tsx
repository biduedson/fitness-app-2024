"use server";
import { notFound } from "next/navigation";
import ExercisesFooter from "../../components/ExercisesFoter";
import ExercisesHeader from "@/components/ExercisesHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import MyCategoryButtonsLIst from "@/components/categories/MyCategoryButtonList";
import { db } from "../_lib/prisma";

const MyExercises = async () => {
  const data = await getServerSession(authOptions);

  if (!data?.user.student) {
    return notFound();
  }
  const studentId = data.user.student.id;
  const categoryAndMyExercises = await db.exerciseCategory.findMany({
    include: {
      exercises: {
        where: {
          favoriteByStudents: {
            some: {
              studentId: studentId, // Filtrar pelo studentId específico
            },
          },
        },
        include: {
          category: true,
          favoriteByStudents: {
            where: {
              studentId: studentId, // Garantir que apenas os favoritos desse studentId sejam retornados
            },
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

  return (
    <>
      <ExercisesHeader title="meus exercícios favoritos" />
      <section
        className=" w-full flex  justify-center bg-primary-300 px-4 lg:px-0"
        id="myexercises"
      >
        <MyCategoryButtonsLIst
          id="myexercises"
          categoryAndMyExercises={categoryAndMyExercises}
        />
      </section>
      <ExercisesFooter url="/exercises" linkName="Todos os exercícios" />
    </>
  );
};

export default MyExercises;
