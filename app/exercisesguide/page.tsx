// components/GuiaExercicios.tsx
import Image from "next/image";
import { db } from "../_lib/prisma";
import Exercises from "./_components/Exercise";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import UserProfile from "@/components/profile/UserProfile";

const exercises = await db.exercise.findMany({
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
});

const categoryGroup = await db.exerciseCategory.findMany({
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

export default async function Page() {
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
    <div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
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
            Guia de Exercícios
          </h1>
        </div>
      </div>

      {/* Botões dos Grupos Musculares */}

      {/* Exibição dos Exercícios */}
      <Exercises exercises={exercises} categoryGroup={categoryGroup} />
    </div>
  );
}
