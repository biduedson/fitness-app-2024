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
      className=" w-full h-[244px]  flex flex-col justify-between  border-accent border-[1px] rounded-lg  bg-white cursor-pointer "
      onClick={handleUserRouterClick}
      key={user.id}
    >
      <div className=" relative bg-accent bg- w-full h-[120px]">
        <div className="absolute top-[50px] w-full flex flex-col items-center justify-center ">
          <div className="relative w-[120px] h-[120px]   ">
            <Image
              src={user.image!}
              alt="user image"
              fill
              className="absolute object-cover rounded-full border-white border-[4px]"
              priority
              sizes="(width: 120px) "
            />
          </div>
          <div className="flex flex-col gap2">
            <p className="text-accent text-center  font-extrabold">
              {user.name}
            </p>
            <p className=" text-slate-500 text-[13px] font-extrabold">
              {user.email}
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center h-[30px] bg-accent rounded-b-lg">
        <p className=" text-white capitalize font-extrabold text-center">
          {user.student ? "Aluno" : "Não aluno"}
        </p>
      </div>
    </div>
  );
};

export default CardUserItem;
