import { Prisma } from "@prisma/client";
import React from "react";
import ExerciseItem from "./ExerciseItem";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";
import { findUserfavoritesExercises } from "@/app/util/favoriteExercisesUser";

function ExerciseList({ exercises }: IExerciseListProps) {
  return (
    <div className=" px-8 flex flex-wrap items-center w-ful justify-center gap-4 mt-8 pb-8">
      {exercises.map((exercise, index) => {
        return <ExerciseItem key={index} exercise={exercise} />;
      })}
    </div>
  );
}

export default ExerciseList;
