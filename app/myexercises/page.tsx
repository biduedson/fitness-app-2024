"use server";
import { notFound } from "next/navigation";
import ExercisesHeader from "@/components/ExercisesHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import MyCategoryButtonsLIst from "@/components/categories/MyCategoryButtonList";
import { db } from "@/app/_lib/prisma";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const page = async () => {
  const data = await getServerSession(authOptions);

  if (!data?.user.student) {
    return (
      <section
        className=" w-full flex h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="my-exercises"
      >
        <h4 className="h4 text-white text-center">
          Somente alunos tem acesso a este conteúdo
        </h4>
      </section>
    );
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
      {data?.user.student ? (
        <section
          className=" w-full flex  justify-center bg-primary-300 px-4  "
          id="my-exercises"
        >
          <MyCategoryButtonsLIst
            id="s"
            categoryAndMyExercises={categoryAndMyExercises}
          />
        </section>
      ) : (
        <section
          className=" w-full flex h-[100vh] justify-center bg-primary-300 px-4 lg:px-0"
          id="my-exercises"
        >
          <h4 className="h4">Somente alunos tem acesso a este conteúdo</h4>
        </section>
      )}
    </>
  );
};

export default page;
