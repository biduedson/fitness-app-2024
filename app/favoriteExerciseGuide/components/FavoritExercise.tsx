// components/Exercicios.tsx
"use client";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import FavoriteExerciseCard from "./FavoriteExerciseCard";
import { useSession } from "next-auth/react";
import FavoriteCategoryButtons from "./FavoriteCategoryButtons";
import {
  ICategoryandExercises,
  IExercises,
} from "@/app/interfaces/ExercicesInterfacesProps";

export default function FvoritExercise({ categories }: ICategoryandExercises) {
  const { data } = useSession();

  const [dataExercises, setDataExercises] = useState<
    IExercises["exercises"] | null
  >(null);

  return (
    <>
      <div className="w-full  p-4 ">
        <FavoriteCategoryButtons
          categories={categories}
          setExercises={setDataExercises}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {!dataExercises ? (
            <div className="bg-white rounded-lg shadow-md text-center text-red-600 p-4">
              <h1>Escolha a categoria de exercícios</h1>
            </div>
          ) : (
            dataExercises.map((exercise) => (
              <div
                key={exercise.name}
                className="bg-white rounded-lg shadow-md"
              >
                <FavoriteExerciseCard
                  exercise={exercise}
                  setExercices={setDataExercises}
                  exercises={dataExercises}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
