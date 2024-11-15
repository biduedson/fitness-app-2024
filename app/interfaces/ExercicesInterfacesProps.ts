import { Prisma } from "@prisma/client";
import React from "react";

export interface IExerciseListProps {
  exercises: Prisma.ExerciseGetPayload<{
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
  }>[];
}

export interface IExerciseItemProps {
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
  }>;
  addFavoriteFunction?: (categoryName: string, exercise: any) => void;
  removedFavoriteFunction?: (exerciseId: string) => void;
}

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

export interface IExercises {
  exercises: Prisma.ExerciseGetPayload<{
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
  }>[];
}

export interface ICategoryandExercises {
  categories: Prisma.ExerciseCategoryGetPayload<{
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
  }>[];
}
export interface IAllSets {
  setExercises: React.Dispatch<
    React.SetStateAction<IExercises["exercises"] | null>
  >;
}
