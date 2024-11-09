"use server";

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";

import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import CategoryLIst from "@/components/categories/CategoryLIst";
import UserProfile from "@/components/profile/UserProfile";

const page = async () => {
  const data = await getServerSession(authOptions);

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

  if (!data?.user.student) {
    return (
      <section
        className=" w-full flex h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="exercises"
      >
        <h4 className="h4 text-white text-center">
          Somente alunos tem acesso a este conteúdo
        </h4>
      </section>
    );
  }

  return (
    <>
      <section
        className="relative w-full  h-[100vh] flex flex-col justify-betweenr bg-primary-300  lg:px-0"
        id="exercises"
      >
        {data.user && (
          <div className=" absolute top-2 left-2">
            <UserProfile />
          </div>
        )}
        <CategoryLIst id="s" categoryAndExercises={categoryExercises} />
        <MobileNavHomeFooter />
      </section>
    </>
  );
};

export default page;
