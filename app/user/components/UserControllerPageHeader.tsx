import { useRouter } from "next/navigation";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

interface IUserControllerPageHeaderProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
}

const UserControllerPageHeader = ({ user }: IUserControllerPageHeaderProps) => {
  const router = useRouter();

  return (
    <motion.header
      variants={fadeIn("down", 0.6)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className=" w-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white"
    >
      <div className="absolute md:hidden top-0 w-full h-[300px] overflow-hidden rounded-lg shadow-lg">
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="User Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
      </div>
      {/* Versão para dispositivos móveis */}
      <div className="absolute  w-full top-4 md:hidden flex flex-col gap-4 items-center justify-center h-[300px] sm:h-[350px] p-4">
        <div className="relative w-32 h-32 overflow-hidden rounded-full shadow-lg">
          <Image
            src={user?.image || "/assets/img/default-avatar.png"}
            alt="User Avatar"
            layout="fill"
            objectFit="cover"
            className="opacity-90 rounded-full border-white border-[2px]"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg opacity-90 p-2">
          <h1 className=" text-xl font-semibold text-center text-red-500">
            {user?.name || "Nome do Usuário"}
          </h1>
          <p className="text-sm  mt-1 text-center text-primary-300">
            {user?.email || "email@exemplo.com"}
          </p>
        </div>
      </div>

      {/* Versão para desktop */}
      <div className="hidden md:flex flex-col items-center justify-center h-[300px] relative text-center p-8">
        <div className="absolute inset-0 w-full h-[300px] overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/assets/img/bannerExercisePage.png"
            alt="User Banner"
            layout="fill"
            objectFit="cover"
            className="opacity-60"
          />
        </div>
        <div className="absolute flex flex-col items-center w-3/5 max-w-lg p-6 bg-white rounded-lg shadow-xl bg-opacity-90">
          <div className="relative w-24 h-24 overflow-hidden rounded-full shadow-lg">
            <Image
              src={user?.image || "/assets/img/default-avatar.png"}
              alt="User Avatar"
              layout="fill"
              objectFit="cover"
              className="opacity-90 rounded-full"
            />
          </div>
          <h1 className="text-3xl font-semibold text-red-500">
            {user?.name || "Nome do Usuário"}
          </h1>
          <p className="text-lg text-primary-300 mt-2">
            {user?.email || "email@exemplo.com"}
          </p>
        </div>
      </div>
    </motion.header>
  );
};

export default UserControllerPageHeader;
