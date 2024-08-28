import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../../_lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';


export async function GET(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {

        if(req.method !== "GET"){
      return NextResponse.json({message: "Metodo incorreto" }, { status: 401})  
    }
        const { studentId } = params;

        if (!studentId) {
            return NextResponse.json({ error: "studentId é necessário." }, { status: 400 });
        }

        const result = await db.favoriteExercise.findMany({
            where: {
                studentId: studentId,
            },
            include: {
                exercise: {
                    include: {
                        category: true,
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