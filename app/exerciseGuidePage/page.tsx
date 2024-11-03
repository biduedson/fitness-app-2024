// src/pages/ExerciseGuidePage.tsx
"use server";
import UserProfile from "@/components/profile/UserProfile";
import ExerciseCategoryCard from "./components/ExerciseCategoryCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

// Busca as categorias de exercícios e seus exercícios associados do banco de dados
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

// Verifica se o usuário é um aluno autorizado
const data = await getServerSession(authOptions);

const ExerciseGuidePage = () => {
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
      <div className="absolute top-2 left-2">
        <UserProfile imageUrl={data.user.image!} />
      </div>
      <div className="flex-1 py-10 px-5 md:px-20">
        <div className="mb-10">
          <img
            src="/assets/img/bannerExercisePage.png" // Adicione sua imagem aqui
            alt="Guia de Exercícios"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        <h2 className="text-4xl text-accent font-bold text-center mb-10">
          Guia de Exercícios
        </h2>
        <div className="w-full h-[400px]  overflow-y-scroll  [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryExercises.map((category) => (
              <ExerciseCategoryCard
                key={category.id}
                categoryName={category.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExerciseGuidePage;
