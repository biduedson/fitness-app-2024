"use client";

// pages/exercise/muscle-gain-guide.tsx
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeIn = (direction = "up", delay = 0.1) => {
  return {
    hidden: { opacity: 0, y: direction === "up" ? 10 : -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    },
  };
};

const MuscleGainGuidePage = () => {
  const router = useRouter();
  const iniciantes = [
    {
      label: "Objetivo",
      text: "Aprender a técnica e construir uma base muscular.",
    },
    { label: "Séries", text: "2 a 3 séries por exercício" },
    { label: "Repetições", text: "8 a 12 repetições" },
    { label: "Frequência", text: "2 a 3 vezes por semana" },
    {
      label: "Notas",
      text: "Concentre-se em exercícios compostos e na forma correta.",
    },
  ];
  const intermediarios = [
    {
      label: "Objetivo",
      text: "Continuar a desenvolver força e massa muscular.",
    },
    { label: "Séries", text: "3 a 4 séries por exercício" },
    { label: "Repetições", text: "6 a 12 repetições" },
    { label: "Frequência", text: "3 a 5 vezes por semana" },
    {
      label: "Notas",
      text: "Inclua variações nos exercícios e considere aumentar gradualmente a carga.",
    },
  ];
  const avancados = [
    { label: "Objetivo", text: "Maximizar a hipertrofia e a força." },
    { label: "Séries", text: "4 a 6 séries por exercício" },
    {
      label: "Repetições",
      text: "1 a 6 repetições para força; 6 a 12 repetições para hipertrofia",
    },
    { label: "Frequência", text: "4 a 6 vezes por semana" },
    {
      label: "Notas",
      text: "Utilizar métodos avançados, como periodização do treino.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center text-gray-800">
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="show"
        className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6"
      >
        <h1 className="text-3xl font-bold text-accent text-center mb-6">
          Diretrizes para Aumento de Massa Magra
        </h1>

        <Section title="1. Iniciantes" items={iniciantes} />

        <Section title="2. Intermediários" items={intermediarios} />

        <Section title="3. Avançados" items={avancados} />

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-accent">
            Considerações Gerais
          </h3>
          <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
            <li>
              <strong>Carga:</strong> Deve ser desafiadora, mas permitir a
              execução correta do movimento.
            </li>
            <li>
              <strong>Descanso:</strong> 1 a 3 minutos entre séries, dependendo
              da intensidade e do objetivo.
            </li>
            <li>
              <strong>Progressão:</strong> Aumentar gradualmente o peso e/ou o
              número de repetições ao longo do tempo.
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/")}
          className="text-lg text-accent hover:text-black underline"
        >
          Voltar para Início
        </button>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  items: { label: string; text: string }[];
}

const Section = ({ title, items }: SectionProps) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-accent">{title}</h3>
    <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
      {items.map((item, index) => (
        <li key={index}>
          <strong>{item.label}:</strong> {item.text}
        </li>
      ))}
    </ul>
  </div>
);

export default MuscleGainGuidePage;
