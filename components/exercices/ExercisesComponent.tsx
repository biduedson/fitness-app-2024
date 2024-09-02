"use client";

import React, { ReactElement, useState, useContext } from "react";
import { useSession } from "next-auth/react";
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
      handleComponentClick={handleComponentClick}
    />
  );
};

export default ExercisesComponent;
