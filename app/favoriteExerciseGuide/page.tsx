// src/pages/ExerciseGuidePage.tsx
"use server";
import UserProfile from "@/components/profile/UserProfile";
import FavoriteexerciseCategoryCard from "./components/FavoriteexerciseCategoryCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Image from "next/image";
import { db } from "../_lib/prisma";
import NavbarUser from "@/components/NavBarUser";
import CategoryFooterNav from "@/components/CategoryFooterNav";

const Page = async () => {
  const data = await getServerSession(authOptions);
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
    <section className="relative bg-primary-300 h-[100vh] flex flex-col overflow-y-hidden [&::-webkit-scrollbar]:hidden">
      <NavbarUser />
      <div className="lg:hidden absolute top-2 left-2">
        <UserProfile />
      </div>
      <div className="relative w-full h-[30%] md:h-[40%] lg:hidden mb-10">
        <Image
          src="/assets/img/bannerExercisePage.png" // Adicione sua imagem aqui
          alt="Guia de Exercícios"
          layout="fill"
          className="absolute object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1 py-4 px-5 md:px-20 ">
        <div className="hidden relative w-full h-[30%] md:h-[40%] lg:flex mb-10">
          <Image
            src="/assets/img/bannerExercisePage.png" // Adicione sua imagem aqui
            alt="Guia de Exercícios"
            layout="fill"
            className="absolute object-cover rounded-lg shadow-lg"
          />
        </div>
        <h2 className="text-4xl text-red-600 font-bold text-center mb-10">
          Guia de Exercícios favoritos
        </h2>
        <div className="w-full pb-10 sm:pb-0 h-[400px] overflow-y-scroll  [&::-webkit-scrollbar]:hidden">
          <div className="grid grid-cols-1 pb-10 sm:pb-0 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {categoryAndMyExercises.map((category) => (
              <FavoriteexerciseCategoryCard
                key={category.id}
                categoryName={category.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-auto lg:hidden">
        <CategoryFooterNav />
      </div>
    </section>
  );
};

export default Page;
