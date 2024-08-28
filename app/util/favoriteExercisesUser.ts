import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

 interface FavoriteExercises{
favoriteUsersExercises: Prisma.FavoriteExerciseGetPayload<{
    include:{
        student:{
            include:{
                user:true
            }
        }
    }
}>
 }

 export const findUserfavoritesExercises = async  (userId:string, exerciseId:string):Promise<boolean>=>{
    
    const favoriteUsersExercises = await db.favoriteExercise.findFirst({
    where: {
      student: {
        userId:userId,
        
      },
      exerciseId:exerciseId
    },
    include: {
      exercise: true, 
    },
  });
 return !!favoriteUsersExercises; // Retorna true se o exercício favorito existir, caso contrário false
}
   
 