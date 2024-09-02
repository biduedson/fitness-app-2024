import React, { ReactElement, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CategoryButton from "./CategoryButton";

interface CategoryButtonListProps {
  id: string;
  title: string;
  component: ReactElement;
  setComponent: React.Dispatch<React.SetStateAction<ReactElement>>;
  exercises: {
    name: string;
    component?: ReactElement;
  }[];
}

const CategoryButtonsLIst = ({
  id,
  title,
  component,
  setComponent,
  exercises,
}: CategoryButtonListProps) => {
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  return (
    <div className="w-full  bg-primary-300 " id={id}>
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 text-center mb-2 p-6 text-white"
      >
        {title}
      </motion.h2>
      <div className="flex  py-2 lg:py-6 lg:flex-wrap items-center overflow-x-scroll lg:overflow-x-hidden  [&::-webkit-scrollbar]:hidden lg:justify-center">
        {exercises.map((exercice, index) => {
          return (
            <CategoryButton
              key={index}
              categoryName={exercice.name}
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
