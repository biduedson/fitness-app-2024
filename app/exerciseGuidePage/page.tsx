// src/pages/ExerciseGuidePage.tsx
import UserProfile from "@/components/profile/UserProfile";
import ExerciseCategoryCard from "./components/ExerciseCategoryCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import NavbarUser from "@/components/NavBarUser";
import Image from "next/image";
import CategoryFooterNav from "@/components/CategoryFooterNav";
import Footer from "@/components/Footer";

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
const data = await getServerSession(authOptions);

// Verifica se o usuário é um aluno autorizado

const ExerciseGuidePage = async () => {
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
    <section className="relative bg-primary-300 h-[100vh] lg:mt-24 flex flex-col lg:overflow-y-scroll overflow-y-hidden [&::-webkit-scrollbar]:hidden">
      <div className="fixed top-0 z-50 hidden lg:flex w-screen ">
        <NavbarUser />
      </div>
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
          Guia de Exercícios
        </h2>
        <div className="w-full h-[400px]  overflow-y-scroll  lg:mb-40 [&::-webkit-scrollbar]:hidden">
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
      <div className="w-full h-auto lg:hidden">
        <CategoryFooterNav />
      </div>
      <div className="min-w-screen hidden lg:flex flex-col">
        <Footer />
      </div>
    </section>
  );
};

export default ExerciseGuidePage;
