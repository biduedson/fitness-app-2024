"use server"

import { revalidatePath } from "next/cache"
import {db} from "../_lib/prisma"

export const toggleFavoriteExercise = async(id:string,exerciseId:string):Promise<string> =>{
    const user = await db.user.findUnique({where:{id:id},include:{student:true}})
    if(!user?.student?.id){
        return "Apenas alunos podem favoritar exercícios."
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
        return "Exercicio removido dos favoritos."
    }

    await db.favoriteExercise.create({
        data:{
            studentId:user.student?.id!,
            exerciseId:exerciseId

        }
    })
    revalidatePath("/")
    return "Exercicio adicionado aos favoritos."
    
}