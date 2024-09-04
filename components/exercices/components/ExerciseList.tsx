"use client";
import { Prisma } from "@prisma/client";
import React, { useContext, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";
import { FavoriteExercisesContext } from "@/app/_context/favoriteExercisesContext";

function ExerciseList({ exercises }: IExerciseListProps) {
  const [dataExercises, setDataExercises] = useState(exercises);

  return (
    <div className=" px-8  items-center w-ful  mt-6 pb-8  ">
      <div className="flex flex-wrap gap-4 justify-center h-[500px] overflow-y-scroll [&::-webkit-scrollbar]:hidden   lg:h-auto w-auto">
        {dataExercises.map((exercise, index) => {
          return <ExerciseItem key={index} exercise={exercise} />;
        })}
      </div>
    </div>
  );
}

export default ExerciseList;
