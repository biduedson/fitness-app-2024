"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import CategoryButtonsLIst from "@/components/categories/CategoryButtonsLIst";
import ExerciseList from "@/components/exercices/components/ExerciseList";
import ExercisesHeader from "../../components/ExercisesHeader";
import { FavoriteCategoryAndExercisesByStudentsProps } from "../interfaces/ExercicesInterfacesProps";
import { notFound } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ExercisesFooter from "@/components/ExercisesFoter";

interface ICategories {
  categoryExercises: Prisma.ExerciseCategoryGetPayload<{
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
  }>[];
}

const Exercicies = () => {
  const { data } = useSession();
  const [categoryExercises, setCategoryExercises] = useState<
    FavoriteCategoryAndExercisesByStudentsProps[]
  >([]);
  const [component, setComponent] = useState<ReactElement>(<></>);
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  useEffect(() => {
    const fetchExercises = async () => {
      if (data?.user.student) {
        const id = data?.user.student?.id;
        try {
          const response = await fetch("/api/exercises", {
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

  let exercicesAndComponent: { name: string; component: ReactElement }[] = [];

  categoryExercises.map((category) => {
    exercicesAndComponent.push({
      name: category.name,
      component: (
        <ExerciseList exercises={category.exercises} key={category.id} />
      ),
    });
  });

  return (
    <section className="overflow-y-hidden w-full  flex  justify-center bg-primary-300 mt-28">
      <ExercisesHeader />
      <CategoryButtonsLIst
        id="exercises"
        title="Exercícios"
        component={component}
        setComponent={setComponent}
        exercises={exercicesAndComponent}
      />
      <ExercisesFooter url="/myexercises" linkName="Exercícios favoritos" />
    </section>
  );
};

export default Exercicies;
