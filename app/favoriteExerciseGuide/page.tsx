// src/pages/ExerciseGuidePage.tsx
"use server";
import UserProfile from "@/components/profile/UserProfile";
import FavoriteexerciseCategoryCard from "./components/FavoriteexerciseCategoryCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Image from "next/image";
import { db } from "../_lib/prisma";

const studentId = data?.user.student?.id;
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

const Page = async () => {
  const data = await getServerSession(authOptions);

  if (!data?.user.student) {
    return (
      <section
        className="w-full flex h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="exercises"
      >
        <h4 className="text-white text-center text-xl">
          Somente alunos têm acesso a este conteúdo
        </h4>
      </section>
    );
  }

  return (
    <section className="relative bg-black_texture h-[100vh] flex flex-col overflow-y-hidden [&::-webkit-scrollbar]:hidden">
      <div className="absolute top-12 left-6">
        <UserProfile imageUrl={data.user.image!} />
      </div>
      <div className="flex-1 py-10 px-4 md:px-20 Xxl:px-4">
        <div className="relative w-full h-[30%] md:h-[40%] mb-10">
          <Image
            src="/assets/img/bannerExercisePage.png" // Adicione sua imagem aqui
            alt="Guia de Exercícios"
            layout="fill"
            className="absolute object-cover rounded-lg shadow-lg"
          />
        </div>
        <h2 className="text-4xl text-accent font-bold text-center mb-10">
          Guia de Exercícios favoritos
        </h2>
        <div className="w-full pb-10 sm:pb-0 h-[400px] overflow-y-scroll  [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-1 pb-10 sm:pb-0 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryAndMyExercises.map((category) => (
              <FavoriteexerciseCategoryCard
                key={category.id}
                title={category.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
