import { Prisma } from "@prisma/client";



export interface IExerciseListProps {
  exercises: Prisma.ExerciseGetPayload<{
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
          student:true
        }
      }
    };
  }>;
}

