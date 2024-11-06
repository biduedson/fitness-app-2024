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
    const existingGymAdmin = await db.gymAdmin.findUnique({
      where: {
        userId: userId,
      },
    });

    // Retorna uma mensagem se o aluno já existir
    if (existingGymAdmin) {
      return NextResponse.json(
        { message: "Este  usuario já está cadastrado como administrador." },
        { status: 400 }
      );
    }

    const newGymAdmin = await db.gymAdmin.create({
      data: {
        userId: userId,
      },
    });
    const userUpdated = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        student: true,
        gymAdmin: true,
      },
    });
    return NextResponse.json(userUpdated, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
