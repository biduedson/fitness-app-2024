"use client";
import useSWR from "swr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Prisma } from "@prisma/client";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";

import AlertAddStudent from "../components/AlertAddStudent";
import UserControlPanel from "../components/UserControlPanel";
import UserControllerPageHeader from "../components/UserControllerPageHeader";
import AlertDeleteStudent from "../components/AlertDeleteStudente";
import AlertDialogAddGymAdmin from "../components/AlertDialogAddGymAdmin";
import AlertGymAdminDelete from "../components/AlertGymAdminDelete";

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
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [isConfirmDialogDeleteOpen, setIsConfirmDialogDeleteOpen] =
    useState<boolean>(false);
  const [isConfirmGymAdminDialogOpen, setIsConfirmGymAdminDialogOpen] =
    useState<boolean>(false);
  const [
    isConfirmDialogGymAdminDeletOpen,
    setIsConfirmDialogGymAdminDeletOpen,
  ] = useState<boolean>(false);
  useEffect(() => {
    if (initialUser) {
      setUserData(initialUser);
    }
  }, [initialUser, session]);

  if (status === "loading") {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className=" animate-spin text-[20px]">
          <AiOutlineLoading3Quarters />
        </span>
        <span className=" animate-pulse">Loading...</span>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user.gymAdmin) {
    return notFound();
  }
  if (!userData) {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className=" animate-spin text-[20px]">
          <AiOutlineLoading3Quarters />
        </span>
        <span className=" animate-pulse">Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className=" w-full h-[100vh] flex gap-1 items-center justify-center bg-black_texture text-white ">
        <span className="text-[20px]">Erro: {error}</span>
      </div>
    );
  }

  return (
    <section className="w-full h-[100vh] flex flex-col  items-center justify-between bg-black_texture text-white">
      <UserControllerPageHeader user={userData} />

      <UserControlPanel
        user={userData}
        setIsConfirmDialogOpen={() => setIsConfirmDialogOpen(true)}
        setIsConfirmDeletedDialogOpen={() => setIsConfirmDialogDeleteOpen(true)}
        setIsConfirmGymAdminDialogOpen={() =>
          setIsConfirmGymAdminDialogOpen(true)
        }
        setIsConfirmDialogGymAdminDeletOpen={() =>
          setIsConfirmDialogGymAdminDeletOpen(true)
        }
      />

      <MobileNavHomeFooter />

      <AlertAddStudent
        user={userData}
        userId={userData.id}
        setUserData={setUserData}
        isConfirmDialogOpen={isConfirmDialogOpen}
        setIsConfirmDialogOpen={setIsConfirmDialogOpen}
      />
      <AlertDeleteStudent
        user={userData}
        userId={userData.id}
        setUserData={setUserData}
        isConfirmDialogDeleteOpen={isConfirmDialogDeleteOpen}
        setIsConfirmDialogDeleteOpen={setIsConfirmDialogDeleteOpen}
      />
      <AlertDialogAddGymAdmin
        user={userData}
        userId={userData.id}
        setUserData={setUserData}
        isConfirmGymAdminDialogOpen={isConfirmGymAdminDialogOpen}
        setIsConfirmGymAdminDialogOpen={setIsConfirmGymAdminDialogOpen}
      />
      <AlertGymAdminDelete
        user={userData}
        userId={userData.id}
        setUserData={setUserData}
        isConfirmDialogGymAdminDeletOpen={isConfirmDialogGymAdminDeletOpen}
        setIsConfirmDialogGymAdminDeletOpen={
          setIsConfirmDialogGymAdminDeletOpen
        }
      />
    </section>
  );
};

export default Userpage;
