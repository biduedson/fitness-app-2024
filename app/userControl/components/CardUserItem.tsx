// src/components/CardUserItem.tsx
"use client";

import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ICardProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
}

const CardUserItem = ({ user }: ICardProps) => {
  const router = useRouter();

  const handleUserRouterClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleUserRouterClick}
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={user.image!}
          alt="User Image"
          fill
          className="rounded-full object-cover border-4 border-accent"
        />
      </div>
      <h3 className="text-xl font-bold text-accent">{user.name}</h3>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <div
        className={`mt-4 px-4 py-1 rounded-full text-white font-semibold ${
          user.student ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {user.student ? "Aluno" : "Não aluno"}
      </div>
    </div>
  );
};

export default CardUserItem;
