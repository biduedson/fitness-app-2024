import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_lib/prisma'; 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';


export async function GET(req: NextRequest,{ params }: { params: Promise<{ slug: string }> }) {
const categoryName = (await params).slug
  const session = await getServerSession(authOptions);

  if (!session?.user.gymAdmin) {
    return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
  }
    try {
      
        if(req.method !== "GET"){
      return NextResponse.json({message: "Metodo incorreto" }, { status: 401})  
    }

    const exercises = await db.exercise.findMany({
     
    where: {
        category: {
          name: categoryName, // Filtra os exercícios pela categoria
        },
      },
      include: {
        category: true, // Inclui as informações da categoria nos resultados
      },
   
  });
   console.log(exercises)
        return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
        console.error("Erro ao obter os dados:", error);
        return NextResponse.json({ error: "Falha ao obter os dados." }, { status: 500 });
    }
}