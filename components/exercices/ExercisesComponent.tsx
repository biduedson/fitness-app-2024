"use client";

import React, { ReactElement, useState, useContext } from "react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import CategoryButtonsLIst from "../categories/CategoryButtonsLIst";
import ExerciseList from "./components/ExerciseList";
import { FavoriteExercisesContext } from "@/app/_context/favoriteExercisesContext";
import MyCategoryButtonsLIst from "../categories/MyCategoryButtonList";
interface ICategories {
  id: string;
  exercisesAndComponents: {
    name: string;
    component: ReactElement;
  }[];
}
const ExercisesComponent = ({ id, exercisesAndComponents }: ICategories) => {
  const { data } = useSession();

  const [component, setComponent] = useState<ReactElement>(<></>);
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  return (
    <MyCategoryButtonsLIst
      id={id}
      title="Meus exercícios favoritos"
      component={component}
      setComponent={setComponent}
      exercises={exercisesAndComponents}
    />
  );
};

export default ExercisesComponent;
