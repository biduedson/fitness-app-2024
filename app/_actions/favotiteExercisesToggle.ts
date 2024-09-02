"use server"

import { revalidatePath } from "next/cache"
import {db} from "../_lib/prisma"

interface ResponseFavoritedExercises{
    error?:boolean;
    removed?: boolean;
    favorited?:boolean;
    message:string;
}

export const toggleFavoriteExercise = async(id:string,exerciseId:string):Promise<ResponseFavoritedExercises> =>{
    const user = await db.user.findUnique({where:{id:id},include:{student:true}})
    if(!user?.student?.id){
        return {
            error:true,
            message:"Apenas alunos podem favoritar exercícios."
        }
    }
    
    const isFavorite =  await db.favoriteExercise.findFirst({
        where:{
            exerciseId:exerciseId
        }
    })

    if(isFavorite){
        await db.favoriteExercise.delete({
          where:{
            id:isFavorite.id
          }
        })
        revalidatePath("/")
         return {
            removed:true,
            message:"Exercicio removido dos favoritos."
        }     
    }

    await db.favoriteExercise.create({
        data:{
            studentId:user.student?.id!,
            exerciseId:exerciseId
        }
    })
    revalidatePath("/")
    return {
            favorited:true,
            message:"Exercicio adicionado aos favoritos."
        }    
}