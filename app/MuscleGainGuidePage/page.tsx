// pages/MuscleGainGuidePage.tsx

"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import NavbarUser from "@/components/NavBarUser";

const levelCard = [
  {
    title: "Iniciantes",
    description:
      "Para quem está começando, é essencial focar na técnica e construir uma base sólida de musculatura. Os treinos para iniciantes devem ser voltados para o aprendizado correto dos movimentos e aumento gradual de força e resistência.",
    details: [
      "Séries: 2 a 3 séries por exercício",
      "Repetições: 8 a 12 por série",
      "Frequência: 2 a 3 vezes por semana",
      "Foco em exercícios compostos que ativam grandes grupos musculares",
    ],
    colors: "from-gray-700 to-gray-800",
  },
  {
    title: "Intermediários",
    description:
      "Para quem já tem experiência, o nível intermediário busca o desenvolvimento contínuo de força e aumento de massa muscular. Neste nível, é fundamental trabalhar a carga progressiva e a variação de exercícios para estimular os músculos.",
    details: [
      "Séries: 3 a 4 séries por exercício",
      "Repetições: 6 a 12 por série, dependendo do objetivo",
      "Frequência: 3 a 5 vezes por semana",
      "Introdução de variações de exercícios e aumento gradual de carga",
    ],
    colors: "from-gray-800 to-gray-900",
  },
  {
    title: "Avançados",
    description:
      "Para atletas avançados, o foco é maximizar a hipertrofia e a força muscular através de técnicas avançadas de treinamento, periodização e maior frequência de treino. Este nível exige disciplina e planejamento rigoroso.",
    details: [
      "Séries: 4 a 6 séries por exercício",
      "Repetições: 1 a 6 para força máxima e 6 a 12 para hipertrofia",
      "Frequência: 4 a 6 vezes por semana",
      "Uso de métodos avançados, como drop sets, supersets e periodização",
    ],
    colors: "from-gray-700 to-gray-800",
  },
];

const MuscleGainGuidePage = () => {
  const router = useRouter();
  const { data } = useSession();

  if (!data?.user.student) {
    return (
      <section
        className="w-full flex h-[100svh] justify-center items-center bg-primary-300 px-4 lg:px-0"
        id="my-exercises"
      >
        <h4 className="h4 text-white text-center">
          Somente alunos tem acesso a este conteúdo
        </h4>
      </section>
    );
  }
  return (
    <>
      <div className="fixed z-50 w-full h-auto hidden lg:flex ">
        <NavbarUser />
      </div>
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="show"
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans relative "
      >
        {/* Header Section */}
        <section className="text-center relative overflow-y-scroll  [&::-webkit-scrollbar]:hidden ">
          <motion.div className="w-full h-full" />
          <div className="w-full h-full lg:mt-16">
            <div className="relative w-full h-[400px] opacity-70">
              <Image
                src="/assets/img/bannerExercisePage.png"
                alt="banner image"
                layout="fill"
                objectFit="cover"
                className="absolute"
              />
            </div>
          </div>
          <div className="w-full absolute top-10 left-0 lg:mt-16">
            <h1 className="text-5xl font-extrabold text-white mb-6 animate-pulse">
              Guia Definitivo para Ganho de Massa Muscular
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-300 mb-6">
              Melhore seu desempenho com um plano de treino detalhado. Escolha o
              nível certo e acompanhe suas conquistas!
            </p>
            <Button
              onClick={() => router.push("/")}
              className="bg-accent text-white font-semibold py-3 px-8 cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Voltar ao Início
            </Button>
          </div>
        </section>

        {/* Levels Section */}
        <section className="py-20 px-6 flex flex-col  space-y-16 sm:space-y-20 container mx-auto overflow-y-scroll  [&::-webkit-scrollbar]:hidden">
          {/* Level Card */}
          <div className="w-full space-y-16">
            {levelCard.map((level, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn("up", 0.2 + idx * 0.1)}
                className={`bg-gradient-to-r ${level.colors} rounded-xl p-10 shadow-lg relative overflow-hidden transform transition duration-500 hover:scale-105`}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  {level.title}
                </h2>
                <p className="text-lg font-medium text-gray-300 mb-4">
                  {level.description}
                </p>
                <ul className="space-y-2 text-gray-400">
                  {level.details.map((detail, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2 text-accent">•</span> {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          {/* Nutrition Tips Section */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-10 shadow-lg relative overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Dicas de Alimentação para Ganho de Massa Magra
            </h2>
            <ul className="space-y-2 text-gray-400">
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
            className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-10 shadow-lg relative overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Dicas de Alimentação para Emagrecimento
            </h2>
            <ul className="space-y-2 text-gray-400">
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
    </>
  );
};

export default MuscleGainGuidePage;
