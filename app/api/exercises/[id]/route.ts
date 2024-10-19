import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_lib/prisma'; 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';


export async function GET(req: NextRequest) {
    try {
      
        if(req.method !== "GET"){
      return NextResponse.json({message: "Metodo incorreto" }, { status: 401})  
    }
    const exercises = await db.exerciseCategory.findMany({
    include: {
      exercises: {
        include: {
          category: true,
          favoriteByStudents: {
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
        return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
        console.error("Erro ao obter os dados:", error);
        return NextResponse.json({ error: "Falha ao obter os dados." }, { status: 500 });
    }
}