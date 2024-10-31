"use client";
import React, { useState } from "react";
import ExerciseItem from "./ExerciseItem";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

function ExerciseList({ exercises }: IExerciseListProps) {
  const [dataExercises, setDataExercises] = useState(exercises);

  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className=" mt-6 p-4  "
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-4 lg:h-full overflow-y-scroll  [&::-webkit-scrollbar]:hidden max-h-[680px]   ">
        {dataExercises.map((exercise, index) => {
          return <ExerciseItem key={index} exercise={exercise} />;
        })}
      </div>
    </motion.div>
  );
}

export default ExerciseList;
