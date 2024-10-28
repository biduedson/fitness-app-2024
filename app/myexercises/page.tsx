"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import MyCategoryLIst from "@/components/categories/MyCategoryList";
import UserProfile from "@/components/UserProfile";

const page = async () => {
  const data = await getServerSession(authOptions);

  if (!data?.user.student) {
    return (
      <section
        className=" w-full flex min-h-screen justify-center items-center bg-primary-300 px-4 lg:px-0"
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
          className="relative w-full h-[100vh] flex flex-col justify-between bg-primary-300   "
          id="my-exercises"
        >
          <div className=" absolute top-2 left-2">
            <UserProfile imageUrl={data.user.image!} />
          </div>

          <MyCategoryLIst
            id="s"
            categoryAndMyExercises={categoryAndMyExercises}
          />
          <MobileNavHomeFooter />
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
