import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../../_lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';


export async function GET(req: NextRequest, { params }: { params: { studentId: string } }) {
  const session = await getServerSession( authOptions);
    try {
       if(!session?.user.student){
         return NextResponse.json({message: "Nao autorizado" }, { status: 401}) 
      }

      if(session?.user.student?.id !== params.studentId ){
         return NextResponse.json({message: "Nao autorizado" }, { status: 401}) 
       }
        if(req.method !== "GET"){
      return NextResponse.json({message: "Metodo incorreto" }, { status: 401})  
       }
        const { studentId } = params;

        if (!studentId) {
            return NextResponse.json({ error: "studentId é necessário." }, { status: 400 });
        }

        const result = await db.exerciseCategory.findMany({
           include: {
           exercises: {
              where: {
        favoriteByStudents: {
          some: {
            studentId: studentId, // Filtrar pelo studentId específico
          },
        },
      },
      include: {
        category: true,
        favoriteByStudents: {
          where: {
            studentId: studentId, // Garantir que apenas os favoritos desse studentId sejam retornados
          },
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    },
  },
        });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Erro ao obter os dados:", error);
        return NextResponse.json({ error: "Falha ao obter os dados." }, { status: 500 });
    }
}