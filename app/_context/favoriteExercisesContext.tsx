"use client";
import ExerciseList from "@/components/exercices/components/ExerciseList";
import { Exercise, Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  createContext,
  useEffect,
  ReactNode,
  useState,
  ReactElement,
} from "react";
import { IExerciseItemProps } from "../interfaces/ExercicesInterfacesProps";

export interface FavoriteCategoryAndExercisesByStudentsProps
  extends Prisma.ExerciseCategoryGetPayload<{
    include: {
      exercises: {
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
      };
    };
  }> {}

export interface ExercisesFavoritStudant {
  exercisesStudent: Prisma.ExerciseGetPayload<{
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
  }>;
}

export interface FavoriteExercisesUserContext {
  categoryExercises: FavoriteCategoryAndExercisesByStudentsProps[];
  setCategoryExercises: React.Dispatch<
    React.SetStateAction<FavoriteCategoryAndExercisesByStudentsProps[]>
  >;
  exercisesAndComponents: {
    name: string;
    component: ReactElement;
  }[];
}

export const FavoriteExercisesContext =
  createContext<FavoriteExercisesUserContext>({
    categoryExercises: [],
    setCategoryExercises: () => [],
    exercisesAndComponents: [],
  });

export const UserFavoriteExerciseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categoryExercises, setCategoryExercises] = useState<
    FavoriteCategoryAndExercisesByStudentsProps[]
  >([]);

  let exercisesAndComponents: { name: string; component: ReactElement }[] = [];
  const { data } = useSession();

  useEffect(() => {
    const fetchExercises = async () => {
      if (data?.user.student) {
        const id = data?.user.student?.id;
        try {
          const response = await fetch(`/api/exercisefavorite/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`Erro HTTP! status: ${response.status}`);
          }
          const data = await response.json();
          setCategoryExercises(data);
        } catch (error) {
          console.log("Erro interno do servidor: ", error);
        }
      }
    };
    fetchExercises();
  }, [data]);

  categoryExercises.map((category) => {
    exercisesAndComponents.push({
      name: category.name,
      component: <ExerciseList exercises={category.exercises} />,
    });
  });

  return (
    <FavoriteExercisesContext.Provider
      value={{
        categoryExercises,
        setCategoryExercises,
        exercisesAndComponents,
      }}
    >
      {children}
    </FavoriteExercisesContext.Provider>
  );
};
