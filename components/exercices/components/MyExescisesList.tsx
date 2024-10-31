"use client";
import React, { useState } from "react";
import { IExerciseListProps } from "@/app/interfaces/ExercicesInterfacesProps";
import MyExerciseItem from "./MyExerciseItem";

function MyExerciseList({ exercises }: IExerciseListProps) {
  const [myDataExercises, setMyDataExercises] = useState(exercises);

  const removedFavoriteFunction = (exerciseId: string) => {
    // Filtra o array, removendo o exercício com o ID correspondente do array
    const updatedExercises = myDataExercises.filter(
      (exercise) => exercise.id !== exerciseId
    );

    setMyDataExercises(updatedExercises);
  };

  return (
    <div className="mt-6 p-4 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-4 lg:h-full overflow-y-scroll  [&::-webkit-scrollbar]:hidden max-h-[620px] md:max-h-[740px]  ">
        {myDataExercises.map((exercise, index) => {
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
