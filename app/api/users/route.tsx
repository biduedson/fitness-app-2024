import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.gymAdmin) {
    return NextResponse.json({ message: "Nao autorizado" }, { status: 401 });
  }

  try {
    const users = await db.user.findMany({
      include: {
        student: true,
        gymAdmin: true,
      },
    });

    if (users.length === 0) {
      return NextResponse.json(
        { message: "Nenhum usuário encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
