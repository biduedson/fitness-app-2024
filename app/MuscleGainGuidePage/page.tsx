import TitleWithDescription from "@/components/TitleWithDescription";
import Footer from "@/components/Footer";
import NavbarUser from "@/components/NavBarUser";
import { foodPlan, levelCard, weightLossPlan } from "../_constants/constants";
import UserProfile from "@/components/profile/UserProfile";
import AccessDenied from "@/components/AccessDenied";
import MuscleBuildingDiet from "./MuscleBuildingDiet";
import FatLossMealPlan from "./FatLossMealPlan";
import ProgressiveWorkoutPlan from "./ProgressiveWorkoutPlan";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import LoadingScreen from "@/components/LoadingScreen";

const MuscleGainGuidePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <LoadingScreen message="Loading..." />;
  }

  if (!session?.user.student) {
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

        {/* Levels Section */}
        <section className="py-20 px-6 flex flex-col space-y-16 sm:space-y-20 container mx-auto overflow-y-scroll lg:mt-0 [&::-webkit-scrollbar]:hidden">
          {/* Level Card */}
          <ProgressiveWorkoutPlan levelCard={levelCard} />

          {/* Plano Alimentar para Ganho de Massa Muscular */}
          <MuscleBuildingDiet foodPlan={foodPlan} />

          {/*Plano Alimentar para Emagrecimento e Perda de Gordura */}
          <FatLossMealPlan weightLossPlan={weightLossPlan} />
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default MuscleGainGuidePage;
