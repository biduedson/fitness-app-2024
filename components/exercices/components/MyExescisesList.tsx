"use client";
import { Prisma } from "@prisma/client";
import React, { useContext, useState } from "react";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";
import { FavoriteExercisesContext } from "@/app/_context/favoriteExercisesContext";
import MyExerciseItem from "./MyExerciseItem";

function MyExerciseList({ exercises }: IExerciseListProps) {
  const [dataExercises, setDataExercises] = useState(exercises);

  const removedFavoriteFunction = (exerciseId: string) => {
    // Filtra o array, removendo o exercício com o ID correspondente do array
    const updatedExercises = dataExercises.filter(
      (exercise) => exercise.id !== exerciseId
    );

    setDataExercises(updatedExercises);
  };

  return (
    <div className=" px-8  items-center w-ful h-full mt-6 pb-8">
      <div className="flex flex-wrap gap-4 justify-center h-[500px] lg:h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[450px]   ">
        {dataExercises.map((exercise, index) => {
          return (
            <MyExerciseItem
              key={index}
              exercise={exercise}
              removedFavoriteFunction={() =>
                removedFavoriteFunction(exercise.id)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default MyExerciseList;
