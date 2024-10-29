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
import MobileNavHomeFooter from "@/components/MobileNavHomeFooter";
import { IoIosPersonAdd } from "react-icons/io";
import { MdPersonRemoveAlt1 } from "react-icons/md";

import { RiAdminFill } from "react-icons/ri";

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json());

const Userpage = () => {
  const params = useParams();
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session?.user.gymAdmin ? "administrador" : "Usuario comum");

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
  }, [initialUser, session]);

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
      <motion.header
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" relative lg:bg-accent w-full h-[220px] "
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
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full flex items-center justify-center border-b-[1px] border-white"
            >
              <div className="w-[250px] flex flex-col items-center">
                <p className=" text-[28px] lg:text-[18px] font-semibold text-accent ">
                  {userData?.name!}
                </p>
                <p className="text-[20px] lg:text-[12px] font-semibold text-white ">
                  {userData?.email!}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.header>

      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full h-[400px] flex flex-col items-center justify-center gap-4 bg-transparent mt-2"
      >
        <h4 className="w-full h4 font-oswald text-accent uppercase  text-center mt-4">
          Controle de usuário
        </h4>
        <div className="w-full  flex flex-col gap-4 items-center justify-center px-4 ">
          <div className="bg-accent w-full  h-[50px] flex items-center  justify-between px-4 gap-2 text-sm  uppercase rounded-lg">
            <IoIosPersonAdd className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span>Adicionar usuário como aluno.</span>
            </div>
          </div>
          <div className="bg-accent w-full h-[40px] flex items-center justify-between px-4 text-sm  uppercase rounded-lg">
            <MdPersonRemoveAlt1 className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span>Remover usuário como aluno.</span>
            </div>
          </div>
          <div className="bg-accent w-full h-[40px] flex items-center  justify-between px-4 text-sm  uppercase rounded-lg">
            <RiAdminFill className="text-[40px] text-black" />
            <div className="w-full flex items-center justify-center">
              <span>Adicinar usuário como Administrador.</span>
            </div>
          </div>
        </div>
      </motion.div>
      <MobileNavHomeFooter />
    </section>
  );
};

export default Userpage;
