import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "ID do usuário não fornecido" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user.gymAdmin) {
    return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
  }

  try {
    // Verifica se o aluno já está cadastrado
    const existingStudent = await db.student.findUnique({
      where: {
        userId: userId,
      },
    });

    // Retorna uma mensagem se o aluno já existir
    if (existingStudent) {
      return NextResponse.json(
        { message: "O aluno já está cadastrado no sistema." },
        { status: 400 }
      );
    }

    const newStudent = await db.student.create({
      data: {
        userId: userId,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
