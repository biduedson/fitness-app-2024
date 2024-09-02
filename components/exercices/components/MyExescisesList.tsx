"use client";
import { Prisma } from "@prisma/client";
import React, { useContext, useState } from "react";
import ExerciseItem from "./ExerciseItem";
import {
  IExerciseItemProps,
  IExerciseListProps,
} from "@/app/interfaces/ExercicesInterfacesProps";
import { findUserfavoritesExercises } from "@/app/util/favoriteExercisesUser";
import { FavoriteExercisesContext } from "@/app/_context/favoriteExercisesContext";
import MyExerciseItem from "./MyExerciseItem";

function MyExerciseList({ exercises }: IExerciseListProps) {
  const [dataExercises, setDataExercises] = useState(exercises);

  const { categoryExercises, exercisesAndComponents, setCategoryExercises } =
    useContext(FavoriteExercisesContext);

  const [myCategoryExercises, setMycategoryExercises] =
    useState(categoryExercises);
  const removedFavoriteFunction = (exerciseId: string) => {
    // Filtra o array, removendo o exercício com o ID correspondente do array
    const updatedExercises = dataExercises.filter(
      (exercise) => exercise.id !== exerciseId
    );

    setDataExercises(updatedExercises);
  };

  const addFavoriteFunction = (
    categoryName: string,
    exercise: Prisma.ExerciseGetPayload<{
      include: {
        category: true;
        favoriteByStudents: {
          include: {
            student: {
              include: {
                user: true;
              };
            };
          };
        };
      };
    }>
  ) => {
    setCategoryExercises((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (category.name === categoryName) {
          return {
            ...category,
            exercises: [...category.exercises, exercise],
          };
        }
        return category;
      });
      console.log("Updated Categories:", updatedCategories); // Verifique o estado atualizado aqui
      return updatedCategories;
    });
  };

  return (
    <div className=" px-8  items-center w-ful  mt-8 pb-8 ">
      <div className="flex flex-wrap gap-4 justify-center  overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-[450px]  lg:h-auto w-auto">
        {dataExercises.map((exercise, index) => {
          return (
            <MyExerciseItem
              key={index}
              exercise={exercise}
              removedFavoriteFunction={() =>
                removedFavoriteFunction(exercise.id)
              }
              addFavoriteFunction={() =>
                addFavoriteFunction(exercise.category.name, exercise)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default MyExerciseList;
