"use client";
import React, { ReactElement, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import MyCategoryButton from "./MyCategoryButton";

interface CategoryButtonListProps {
  id: string;
  title: string;
  component: ReactElement;
  setComponent: React.Dispatch<React.SetStateAction<ReactElement>>;
  handleComponentClick: (categoryComponent: ReactElement) => void;

  exercises: {
    name: string;
    component: ReactElement;
  }[];
}

const MyCategoryButtonsLIst = ({
  id,
  title,
  component,
  setComponent,
  handleComponentClick,
  exercises,
}: CategoryButtonListProps) => {
  const [currentComponent, setCurrentComponent] = useState<ReactElement>(<></>);
  console.log(exercises);
  return (
    <div className="w-full   bg-primary-300 overflow-y-hidden" id={id}>
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 text-center mb-2 p-6 text-white"
      >
        {title}
      </motion.h2>
      <div className="flex lg:flex-wrap items-center overflow-x-scroll   lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden lg:justify-center">
        {exercises.map((exercice, index) => {
          return (
            <MyCategoryButton
              key={index}
              categoryName={exercice.name}
              handleComponentClick={() => {
                setComponent(exercice.component!);
                handleComponentClick(exercice.component!);
              }}
            />
          );
        })}
      </div>
      {component}
    </div>
  );
};

export default MyCategoryButtonsLIst;
