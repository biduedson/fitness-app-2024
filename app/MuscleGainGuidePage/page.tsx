"use client";
import TitleWithDescription from "@/components/TitleWithDescription";
import Footer from "@/components/Footer";
import NavbarUser from "@/components/NavBarUser";
import { foodPlan, levelCard, weightLossPlan } from "../_constants/constants";
import UserProfile from "@/components/profile/UserProfile";
import AccessDenied from "@/components/AccessDenied";
import MuscleBuildingDiet from "./_components/MuscleBuildingDiet";
import FatLossMealPlan from "./_components/FatLossMealPlan";
import ProgressiveWorkoutPlan from "./_components/ProgressiveWorkoutPlan";
import LoadingScreen from "@/components/LoadingScreen";
import useAuth from "../_hooks/useAuth";
import { ReactElement, useState } from "react";
import LifestyleButtons from "./_components/LifestyleButtons";

const MuscleGainGuidePage = () => {
  const [component, setComponent] = useState<ReactElement>(
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-white from-red-white text-white rounded-lg shadow-lg shadow-slate-300">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center text-red-600">
        Bem-vindo!
      </h2>
      <p className="text-md md:text-lg text-center text-red-600">
        Escolha uma categoria para começar. Explore tópicos de{" "}
        <span className="font-semibold">Dieta</span>,{" "}
        <span className="font-semibold">Níveis de Treino</span> ou{" "}
        <span className="font-semibold">Dicas Fitness</span>.
      </p>
    </div>
  );
  const dataComponent = [
    {
      id: 1,
      name: "Ganho de Massa Muscular",
      component: <MuscleBuildingDiet foodPlan={foodPlan} />,
    },
    {
      id: 2,
      name: "Níveis de Treino",
      component: <ProgressiveWorkoutPlan levelCard={levelCard} />,
    },
    {
      id: 3,
      name: "Perda de Gordura",
      component: <FatLossMealPlan weightLossPlan={weightLossPlan} />,
    },
  ];

  const { isLoading, isAuthenticated, isStudent, logout } = useAuth();
  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }
  if (!isAuthenticated || !isStudent) {
    return <AccessDenied message="Somente alunos têm acesso a este conteúdo" />;
  }
  return (
    <div className="relative w-screen min-h-screen">
      <div className="fixed top-2 left-2 z-50 lg:hidden">
        <UserProfile />
      </div>
      <div className="fixed top-0 z-50 w-full h-auto hidden lg:flex">
        <NavbarUser />
      </div>

      <div className="min-h-screen bg-slate-100 text-white font-sans relative">
        <TitleWithDescription
          clasName="lg:mt-20 p-10 lg:p-2 text-primary-300"
          title="Guia Completo para Ganho de Massa Muscular e Dietas Eficazes"
          description="Descubra dicas detalhadas sobre nutrição, estratégias de treino e planejamento alimentar para alcançar seus objetivos de forma eficiente e saudável!"
        />
        <LifestyleButtons
          dataComponents={dataComponent}
          setComponent={setComponent}
        />
        <section className="py-5 px-6 flex flex-col space-y-16 w-full h-full sm:space-y-20 container mx-auto overflow-y-scroll lg:mt-0 [&::-webkit-scrollbar]:hidden">
          {/* Levels Section */}
          {component}
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default MuscleGainGuidePage;
