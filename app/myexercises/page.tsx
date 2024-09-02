"use client";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import ExercisesComponent from "@/components/exercices/ExercisesComponent";
import { notFound } from "next/navigation";
import MyExerciseList from "@/components/exercices/components/MyExescisesList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ExercisesFooter from "../../components/ExercisesFoter";
import ExercisesHeader from "@/components/ExercisesHeader";

interface FavoriteCategoryAndExercisesByStudentsProps
  extends Prisma.ExerciseCategoryGetPayload<{
    include: {
      exercises: {
        include: {
          category: true;
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true;
                };
              };
            };
          };
        };
      };
    };
  }> {}
const MyExercises = () => {
  const { data } = useSession();
  const [categoryExercises, setCategoryExercises] = useState<
    FavoriteCategoryAndExercisesByStudentsProps[]
  >([]);
  let exercisesAndComponents: { name: string; component: ReactElement }[] = [];
  const [component, setComponent] = useState<ReactElement>(<></>);
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
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
          if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
          }
          const data = await response.json();
          setCategoryExercises(data);
        } catch (error) {
          console.log("Erro interno do servidor: ", error);
        }
      }
    };
    fetchExercises();
  }, [data]);
  if (!data?.user.student) {
    return (
      <div className=" bg-primary-300 flex items-center justify-center">
        <h1 className="h1 animate-pulse flex gap-2">
          <AiOutlineLoading3Quarters className="animate-spin" />
          Loading...
        </h1>
      </div>
    );
  }

  if (!data?.user.student) {
    return notFound();
  }

  categoryExercises.map((category) => {
    exercisesAndComponents.push({
      name: category.name,
      component: (
        <MyExerciseList exercises={category.exercises} key={category.id} />
      ),
    });
  });

  return (
    <>
      <ExercisesHeader />
      <section
        className=" w-full flex  justify-center bg-primary-300 mt-28"
        id="myexercises"
      >
        <ExercisesComponent
          id="myexercises"
          exercisesAndComponents={exercisesAndComponents}
        />
      </section>
      <ExercisesFooter url="/exercises" linkName="Todos os exercícios" />
    </>
  );
};

export default MyExercises;
