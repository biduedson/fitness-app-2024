"use client";
import useSWR from "swr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Prisma, User } from "@prisma/client";
import { MdArrowBackIos } from "react-icons/md";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json());

const Userpage = () => {
  const params = useParams();
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session?.user.gymAdmin) {
    return notFound();
  }
  const { data: initialUser, error } = useSWR<User>(() => {
    if (status === "authenticated" && session?.user.gymAdmin) {
      return `/api/user/${id}`;
    }
    return null;
  }, fetcher);

  const [userData, setUserData] = useState<User | null>(initialUser!);

  useEffect(() => {
    if (initialUser) {
      setUserData(initialUser);
    }
  }, [initialUser]);

  const updadteUser = async (updatedData: Partial<User>) => {
    try {
      const response = await fetch(`/api/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    <section className="w-full h-[100vh] flex flex-col  items-center bg-black_texture text-white">
      <motion.header
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" relative lg:bg-accent w-full h-[220px]"
      >
        <div
          className="absolute top-4 left-4 w-[50px] h-[50px] rounded-full  bg-white/80 z-10 flex items-center 
        justify-center text-[26px] text-accent font-bold"
          onClick={() => router.back()}
        >
          <MdArrowBackIos />
        </div>
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="banner"
          fill
          className="lg:hidden absolute object-cover "
          sizes="150px"
          priority // Adicione essa propriedade para priorizar o carregamento
        />
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-full flex  items-center"
        >
          <div className="absolute top-[140px] w-full flex flex-col items-center justify-center">
            <div className="relative w-[150px] h-[150px] ">
              <Image
                src={userData?.image!}
                alt="User image"
                className="absolute rounded-full object-cover border-accent border-[4px] "
                fill
                sizes="(width: 150px)"
              />
            </div>
            <div>
              <div className="w-[250px] flex flex-col items-center">
                <p className=" text-[28px] lg:text-[18px] font-semibold text-accent ">
                  {userData?.name!}
                </p>
                <p className="text-[20px] lg:text-[12px] font-semibold text-slate-400 ">
                  {userData?.email!}
                </p>
                <p className="text-[20px] lg:text-[12px] font-oswald text-slate-400  text-center mt-4">
                  Nesta seção, você pode adicionar ou remover o usuário como
                  aluno da academia.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>
    </section>
  );
};

export default Userpage;
