import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;

  if (!id) {
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
    const user = await db.user.findUnique({
      where: { id },
      include: {
        student: true,
        gymAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
