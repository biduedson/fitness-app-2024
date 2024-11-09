import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
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
    const existingStudent = await db.student.findUnique({
      where: {
        userId: userId,
      },
    });

    // Retorna uma mensagem se o aluno já existir
    if (!existingStudent) {
      return NextResponse.json(
        { message: "Aluno não encontrado." },
        { status: 404 }
      );
    }

    await db.student.delete({
      where: {
        userId: userId,
      },
    });

    const userWithStudentDeleted = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        student: true,
        gymAdmin: true,
      },
    });
    revalidatePath("/userControl");
    return NextResponse.json(userWithStudentDeleted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor", error },
      { status: 500 }
    );
  }
}
