"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { aerobicExercises } from "../_constants/constants";
import NavbarUser from "@/components/NavBarUser";
import Footer from "@/components/Footer";
import UserProfile from "@/components/profile/UserProfile";
import useAuth from "../_hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import { fadeIn } from "@/lib/variants";
import TitleWithDescription from "@/components/TitleWithDescription";

export default function AerobicExercisesPage() {
  const { isLoading, isAuthenticated, isStudent, logout } = useAuth();
  const [favorite, setFavorite] = useState<boolean[]>(
    new Array(aerobicExercises.length).fill(false)
  );

  const handleFavoriteClick = (index: number) => {
    setFavorite((prev) => {
      const newFav = [...prev];
      newFav[index] = !newFav[index];
      return newFav;
    });
  };
  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }
  if (!isAuthenticated || !isStudent) {
    return (
      <section className="w-full flex h-[100svh] justify-center items-center bg-primary-300 px-4 lg:px-0">
        <h4 className="h4 text-white text-center">
          Somente alunos têm acesso a este conteúdo
        </h4>
      </section>
    );
  }
  return (
    <div className="relative w-screen min-h-screen ">
      <div className="fixed  top-2 left-2 z-50 lg:hidden">
        <UserProfile />
      </div>
      <div className="fixed z-50 w-full h-auto hidden lg:flex ">
        <NavbarUser />
      </div>

      <section className=" hidden  fixed top-0 w-full h-full z-10 lg:relative text-center overflow-y-scroll [&::-webkit-scrollbar]:hidden shadow-lg shadow-slate-600">
        <div className="w-full h-full lg:mt-16">
          <div className="relative w-full h-[300px]  ">
            <Image
              src="/assets/img/bannerExercisePage.png"
              alt="banner image"
              layout="fill"
              objectFit="cover"
              className="absolute"
            />
          </div>
        </div>
        <div className="w-full absolute top-10 left-0 mt-16">
          <h1 className="text-5xl font-extrabold text-red-600 mb-6 animate-pulse">
            Guia de Exercícios Aeróbicos
          </h1>
        </div>
      </section>

      <div
        className="relative flex flex-col items-center py-8 bg-gray-100  sm:min-h-screen  lg:h-[1200px]
       max-h-fit overflow-y-scroll lg:overflow-y-hidden [&::-webkit-scrollbar]:hidden   lg:mt-0 "
      >
        <TitleWithDescription
          clasName="lg:mt-14 py-4"
          title="Exercícios Aeróbicos"
          description=" Aumente seu desempenho com um plano de treino aeróbico personalizado.
        Escolha o nível ideal e acompanhe seu progresso!"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4  Xxl:grid-cols-4 mt-8 lg:mt-0  max-w-6xl Xxl:max-w-[1400px]  Xxl:p-12 px-4 my-4 lg:overflow-y-hidden [&::-webkit-scrollbar]:hidden">
          {aerobicExercises.map((exercise, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg shadow-slate-500 overflow-hidden relative lg:max-h-[700px]"
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="relative w-full h-40">
                <Image
                  src={exercise.imageUrl}
                  alt={exercise.title}
                  layout="fill"
                  className="object-contain mt-4"
                />
                <button
                  onClick={() => handleFavoriteClick(index)}
                  className="absolute top-2 right-2 text-2xl text-white"
                >
                  <FaHeart
                    className={
                      favorite[index] ? "text-red-600" : "text-gray-300"
                    }
                  />
                </button>
                <button className="absolute top-2 right-10 text-2xl text-white">
                  <FaShareAlt className="text-gray-300" />
                </button>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold text-red-600 mb-2">
                  {exercise.title}
                </h2>
                <p className="text-gray-600 mb-4 xl:min-h-[130px]">
                  {exercise.description}
                </p>

                <div className="space-y-2">
                  {exercise.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-md ${
                        detail.level === "Iniciante"
                          ? "bg-blue-100 text-blue-600"
                          : detail.level === "Intermediário"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <h4 className="font-semibold">{detail.level}</h4>
                      <p>Duração: {detail.duration}</p>
                      <p>Intensidade: {detail.intensity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Footer className="sm:hidden" />
      </div>
      {/* Footer Section */}

      <Footer className="hidden sm:block" />
    </div>
  );
}
