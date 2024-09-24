import { Prisma } from "@prisma/client";


export interface IExerciseListProps {
  exercises:Prisma.ExerciseGetPayload<{
    include: {
      category: true,
      favoriteByStudents:{
        include: {
              student: {
                include: {
                  user: true,
                },
             },
         },
      }
    };
  }>[];
}

export interface IExerciseItemProps {
  exercise: Prisma.ExerciseGetPayload<{
    include: {
      category: true,
      favoriteByStudents:{
        include:{
          student: {
                include: {
                  user: true,
                },
             },
        }
      }
    };
  }>;
  addFavoriteFunction?:( categoryName: string, exercise:any) => void;
  removedFavoriteFunction?:(exerciseId:string) => void
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
