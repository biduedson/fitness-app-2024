"use client";
import Image from "next/image";
import { aerobicExercises } from "../_constants/constants";
import NavbarUser from "@/components/NavBarUser";
import Footer from "@/components/Footer";
import UserProfile from "@/components/profile/UserProfile";
import useAuth from "../_hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import TitleWithDescription from "@/components/TitleWithDescription";
import AccessDenied from "@/components/AccessDenied";
import CardioWorkoutGuide from "./_components/CardioWorkoutGuide";

export default function AerobicExercisesPage() {
  const { isLoading, isAuthenticated, isStudent, logout } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }
  if (!isAuthenticated || !isStudent) {
    return <AccessDenied message="Somente alunos têm acesso a este conteúdo" />;
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

        <CardioWorkoutGuide aerobicExercises={aerobicExercises} />

        <Footer className="sm:hidden" />
      </div>
      {/* Footer Section */}

      <Footer className="hidden sm:block" />
    </div>
  );
}
