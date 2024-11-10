import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import CategoryList from "../_componets/CategoryList";

interface PageProps {
  params: {
    categoryname: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { categoryname } = params;
  const data = await getServerSession(authOptions);

  // Verifica se o usuário tem permissão para acessar a página
  if (!data?.user.student) {
    return (
      <section
        className="w-full flex h-[100svh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="my-exercises"
      >
        <h4 className="h4 text-white text-center">
          Somente alunos tem acesso a este conteúdo
        </h4>
      </section>
    );
  }
  // Decodifica o nome da categoria da URL
  const decodedCategoryName = categoryname
    ? decodeURIComponent(categoryname)
    : "";

  // Pega o ID do aluno logado
  const studentId = data.user.student.id;

  // Busca os exercícios favoritados pelo aluno
  const exercises = await db.exercise.findMany({
    where: {
      category: {
        name: decodedCategoryName, // Filtra pela categoria
      },
      favoriteByStudents: {
        some: {
          studentId: studentId, // Filtra pelos favoritos do aluno
        },
      },
    },
    include: {
      category: true,
      favoriteByStudents: {
        where: {
          studentId: studentId,
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
  });

  // Passa os dados para o componente de cliente
  return (
    <CategoryList exercises={exercises} categoryName={decodedCategoryName} />
  );
};

export default Page;
