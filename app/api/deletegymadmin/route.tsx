import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
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
    const existingGynAdmin = await db.gymAdmin.findUnique({
      where: {
        userId: userId,
      },
    });

    // Retorna uma mensagem se o aluno já existir
    if (!existingGynAdmin) {
      return NextResponse.json(
        { message: "Aluno não encontrado." },
        { status: 404 }
      );
    }

    await db.gymAdmin.delete({
      where: {
        userId: userId,
      },
    });

    const userWithGymAdminDeleted = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        student: true,
        gymAdmin: true,
      },
    });
    return NextResponse.json(userWithGymAdminDeleted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor", error },
      { status: 500 }
    );
  }
}
