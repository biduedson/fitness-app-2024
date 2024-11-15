// src/pages/ExerciseGuidePage.tsx
"use server";
import UserProfile from "@/components/profile/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import Image from "next/image";
import { db } from "../_lib/prisma";

import FavoritExercise from "./components/FavoritExercise";
import NavbarUser from "@/components/NavBarUser";
import AccessDenied from "@/components/AccessDenied";

const Page = async () => {
  const data = await getServerSession(authOptions);
  const studentId = data?.user.student?.id;

  const allCategoriesWithmyFavoriteExercises =
    await db.exerciseCategory.findMany({
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
      <AccessDenied message=" Somente alunos têm acesso a este conteúdo" />
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen relative   w-screen overflow-x-hidden">
      <div className="fixed top-0  z-50 w-full h-auto hidden lg:flex ">
        <NavbarUser />
      </div>
      {/* Banner */}
      <div className="relative h-64">
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="Banner Academia"
          fill
          className="object-cover"
        />
        <div className="lg:hidden absolute top-2 left-2">
          <UserProfile />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-red-600 text-4xl font-bold">
            Exercícios favoritos
          </h1>
        </div>
      </div>

      {/* Botões dos Grupos Musculares */}

      {/* Exibição dos Exercícios */}
      <FavoritExercise categories={allCategoriesWithmyFavoriteExercises} />
    </div>
  );
};

export default Page;
