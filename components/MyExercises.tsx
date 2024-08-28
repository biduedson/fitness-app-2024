"use client";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface MyUserexercises {
  exercises: Prisma.FavoriteExerciseGetPayload<{
    include: {
      exercise: {
        include: {
          category: true;
        };
      };
    };
  }>;
}

const MyExercises = () => {
  const { data } = useSession();
  const [studentExercises, setStudentExecises] = useState<MyUserexercises | []>(
    []
  );
  useEffect(() => {
    const fetchExercises = async () => {
      if (data?.user.student) {
        const id = data?.user.student?.id;
        try {
          const response = await fetch(`/api/exercisefavorite/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
          }
          const data = await response.json();
          setStudentExecises(data);
          console.log(data);
        } catch (error) {
          console.log("Erro interno do servidor: ", error);
        }
      }
    };
    fetchExercises();
  }, [data]);
  console.log(studentExercises);
  if (data?.user.student === null || undefined || !data?.user) {
    return (
      <div
        className="h-[1000px] w-full flex items-center justify-center bg-primary-300"
        id="myexercises"
      >
        <h2 className="h2 text-white font-semibold">
          somente aludos tem acesso a este conteúdo
        </h2>
      </div>
    );
  }
  return (
    <div
      className="h-[1000px] w-full flex items-center justify-center bg-primary-300"
      id="myexercises"
    >
      <h2 className="h2 text-white font-semibold"> Aluno Logado</h2>
    </div>
  );
};

export default MyExercises;
