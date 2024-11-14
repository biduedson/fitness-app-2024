// pages/MuscleGainGuidePage.tsx

"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useRouter } from "next/navigation";
import TitleWithDescription from "@/components/TitleWithDescription";
import Image from "next/image";
import Footer from "@/components/Footer";
import NavbarUser from "@/components/NavBarUser";
import { levelCard } from "../_constants/constants";
import LoadingScreen from "@/components/LoadingScreen";
import useAuth from "../_hooks/useAuth";
import UserProfile from "@/components/profile/UserProfile";

const MuscleGainGuidePage = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, isStudent, logout } = useAuth();

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
    <div className="relative w-screen min-h-screen">
      <div className="fixed  top-2 left-2 z-50 lg:hidden">
        <UserProfile />
      </div>
      <div className="fixed top-0  z-50 w-full h-auto hidden lg:flex ">
        <NavbarUser />
      </div>

      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="show"
        className="min-h-screen  bg-slate-100 text-white font-sans relative"
      >
        <TitleWithDescription
          clasName="lg:mt-20 py-4 text-primary-300"
          title="Exercícios Aeróbicos"
          description=" Aumente seu desempenho com um plano de treino aeróbico personalizado.
        Escolha o nível ideal e acompanhe seu progresso!"
        />
        {/* Levels Section */}
        <section className="py-20 px-6  flex flex-col space-y-16  sm:space-y-20 container mx-auto overflow-y-scroll  lg:mt-0  [&::-webkit-scrollbar]:hidden">
          {/* Level Card */}
          {/* auto-rows-fr faz todos do grid tem a mesma altura asim como no items-stretch do flex */}
          <div className=" gap-12   grid grid-cols-1 auto-rows-fr   lg:grid-cols-3  ">
            {levelCard.map((level, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className={`bg-gradient-to-r bg-white rounded-xl p-10  relative overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg shadow-slate-400`}
              >
                <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
                  {level.title}
                </h2>
                <p className="text-lg font-medium text-primary-300 mb-4 text-justify">
                  {level.description}
                </p>
                <div
                  className={`p-2  rounded-lg shadow-lg shadow-slate-300 ${
                    level.title === "Iniciantes"
                      ? "bg-blue-100 text-blue-600"
                      : level.title === "Intermediários"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <ul className="space-y-2 text-primary-200">
                    {level.details.map((detail, i) => (
                      <li key={i} className="flex items-center ">
                        <span className="mr-2 text-accent">•</span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Nutrition Tips Section */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-white rounded-xl p-10 shadow-lg shadow-slate-400 relative overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
              Dicas de Alimentação para Ganho de Massa Magra
            </h2>
            <ul className="space-y-2 text-primary-300 bg-blue-100 p-2 shadow-lg shadow-slate-300 rounded-lg">
              <li>
                <strong>Proteínas:</strong> Consuma proteínas magras, como
                frango, peixe, ovos, e também fontes vegetais como feijão e
                grão-de-bico, para auxiliar na reparação muscular.
              </li>
              <li>
                <strong>Carboidratos:</strong> Inclua carboidratos complexos,
                como batata-doce, arroz integral, aveia e quinoa, para fornecer
                energia sustentável durante os treinos e para a recuperação.
              </li>
              <li>
                <strong>Gorduras Saudáveis:</strong> Acrescente gorduras boas na
                dieta, como nozes, abacate e azeite de oliva, que são essenciais
                para a produção de hormônios anabólicos.
              </li>
              <li>
                <strong>Hidratação:</strong> Beba água suficiente ao longo do
                dia para otimizar a função muscular e a recuperação pós-treino.
              </li>
            </ul>
          </motion.div>

          {/* Nutrition Tips for Weight Loss */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="bg-white rounded-xl p-10 shadow-lg shadow-slate-400 relative overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
              Dicas de Alimentação para Emagrecimento
            </h2>
            <ul className="space-y-2 text-primary-300 bg-green-100 p-2 shadow-lg shadow-slate-300 rounded-lg">
              <li>
                <strong>Déficit Calórico:</strong> Para perder peso, consuma
                menos calorias do que seu gasto diário. Prefira alimentos ricos
                em nutrientes, como vegetais e proteínas magras.
              </li>
              <li>
                <strong>Proteínas:</strong> Consuma proteínas para ajudar na
                saciedade e na preservação de massa muscular durante a perda de
                peso.
              </li>
              <li>
                <strong>Fibra:</strong> Inclua alimentos ricos em fibras, como
                vegetais, frutas e grãos integrais, que promovem a saciedade e
                melhoram a digestão.
              </li>
              <li>
                <strong>Adequação de Carboidratos:</strong> Opte por
                carboidratos de baixo índice glicêmico e evite açúcares
                refinados para manter o nível de energia estável.
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Footer Section */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default MuscleGainGuidePage;
