import { Prisma } from "@prisma/client";
import React from "react";
import CardUserItem from "./CardUserItem";

interface ICardUserListProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}

const CardUserList = ({ users }: ICardUserListProps) => {
  return (
    <div className="w-full h-[530px] grid grid-cols-2  gap-4 p-6  overflow-y-scroll [&::-webkit-scrollbar]:hidden ">
      {users.map((user, index) => {
        return <CardUserItem user={user} />;
      })}
    </div>
  );
};

export default CardUserList;
