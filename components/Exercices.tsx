"use client";

import React, { ReactElement, useState } from "react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import CategoryButtonsLIst from "./categories/CategoryButtonsLIst";
import ExerciseList from "./exercices/components/ExerciseList";

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

const Exercicies = ({ categoryExercises }: ICategories) => {
  const { data } = useSession();

  let exercicesAndComponent: { name: string; component: ReactElement }[] = [];

  categoryExercises.map((category) => {
    exercicesAndComponent.push({
      name: category.name,
      component: <ExerciseList exercises={category.exercises} />,
    });
  });

  const [component, setComponent] = useState<ReactElement>(<></>);
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  return (
    <CategoryButtonsLIst
      id="exercises"
      title="Exercícios"
      component={component}
      setComponent={setComponent}
      exercises={exercicesAndComponent}
    />
  );
};

export default Exercicies;
