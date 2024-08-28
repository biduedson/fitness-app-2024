import React, { ReactElement, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CategoryButton from "./CategoryButton";

interface CategoryButtonListProps {
  component: ReactElement;
  setComponent: React.Dispatch<React.SetStateAction<ReactElement>>;
  exercises: {
    name: string;
    component?: ReactElement;
  }[];
}

const CategoryButtonsLIst = ({
  component,
  setComponent,
  exercises,
}: CategoryButtonListProps) => {
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  return (
    <div className="w-full h-auto  bg-primary-300" id="exercices">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 text-center mb-6 p-6 text-white"
      >
        Exercícios
      </motion.h2>
      <div className="flex flex-wrap items-center justify-center">
        {exercises.map((exercice, index) => {
          return (
            <CategoryButton
              key={index}
              categoryName={exercice.name}
              index={index}
              handleComponentClick={() =>
                handleComponentClick(exercice.component!)
              }
            />
          );
        })}
      </div>
      {component}
    </div>
  );
};

export default CategoryButtonsLIst;
