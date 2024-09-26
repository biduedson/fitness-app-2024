"use client";
import React, { useState } from "react";
import ExerciseItem from "./ExerciseItem";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";

function ExerciseList({ exercises }: IExerciseListProps) {
  const [dataExercises, setDataExercises] = useState(exercises);

  return (
    <div className=" mt-6 p-8  ">
      <div className="flex flex-wrap gap-4 lg:h-full overflow-y-scroll  [&::-webkit-scrollbar]:hidden max-h-[450px]   ">
        {dataExercises.map((exercise, index) => {
          return <ExerciseItem key={index} exercise={exercise} />;
        })}
      </div>
    </div>
  );
}

export default ExerciseList;
