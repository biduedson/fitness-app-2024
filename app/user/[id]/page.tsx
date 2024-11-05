"use client";
import useSWR from "swr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import UserControlPanel from "../components/UserControlPanel";
import UserControllerPageHeader from "../components/UserControllerPageHeader";

interface IUserPageProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
}

const fetcher = (url: string): Promise<IUserPageProps["user"]> =>
  fetch(url).then((res) => res.json());

const Userpage = () => {
  const params = useParams();
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: initialUser, error } = useSWR<IUserPageProps["user"]>(() => {
    if (status === "authenticated" && session?.user.gymAdmin) {
      return `/api/user/${id}`;
    }
    return null;
  }, fetcher);

  const [userData, setUserData] = useState<IUserPageProps["user"] | null>(
    initialUser!
  );

  useEffect(() => {
    if (initialUser) {
      setUserData(initialUser);
    }
  }, [initialUser, session]);

  if (status === "loading") {
    return <LoadingScreen message="Carregando..." />;
  }

  if (status === "unauthenticated" || !session?.user.gymAdmin) {
    return notFound();
  }

  if (!userData) {
    return <LoadingScreen message="Carregando informações do usuário..." />;
  }

  if (error) {
    return <ErrorScreen message={`Erro: ${error}`} />;
  }

  return (
    <section className=" relative flex flex-col items-center  justify-center min-h-screen bg-gray-900 text-white sm:px-6 lg:px-8">
      <div className="w-full h-[100vh]  flex flex-col items-center justify-around">
        <UserControllerPageHeader user={userData} />
        <div className="flex flex-col items-center w-full mt-4 px-4">
          <UserControlPanel user={userData} setUserData={setUserData} />
        </div>
      </div>
      <MobileNavHomeFooter />
    </section>
  );
};

export default Userpage;

// Componentes de tela de erro e carregamento para reaproveitamento
const LoadingScreen = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white">
    <div className="flex flex-col items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      <span className="animate-pulse text-lg mt-2">{message}</span>
    </div>
  </div>
);

const ErrorScreen = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black text-white">
    <span className="text-lg">{message}</span>
  </div>
);
