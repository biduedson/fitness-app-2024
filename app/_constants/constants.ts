export const aerobicExercises = [
  {
    title: "Esteira",
    description:
      "A esteira é uma opção prática para treinos aeróbicos, proporcionando uma caminhada ou corrida controlada em ambientes internos.",
    imageUrl: "/assets/img/esteira.png",
    details: [
      { level: "Iniciante", duration: "15-20 minutos", intensity: "Leve" },
      {
        level: "Intermediário",
        duration: "20-30 minutos",
        intensity: "Moderada",
      },
      { level: "Avançado", duration: "30-45 minutos", intensity: "Alta" },
    ],
  },
  {
    title: "Bicicleta",
    description:
      "O treino com bicicleta ergométrica fortalece o sistema cardiovascular e é ideal para quem busca um exercício de baixo impacto nas articulações.",
    imageUrl: "/assets/img/bicicleta.png",
    details: [
      { level: "Iniciante", duration: "20-30 minutos", intensity: "Leve" },
      {
        level: "Intermediário",
        duration: "30-45 minutos",
        intensity: "Moderada",
      },
      { level: "Avançado", duration: "45-60 minutos", intensity: "Alta" },
    ],
  },
  {
    title: "Elíptico",
    description:
      "O elíptico é uma excelente escolha para um treino de corpo inteiro, combinando movimentos de braços e pernas para melhorar a resistência.",
    imageUrl: "/assets/img/eliptico.png",
    details: [
      { level: "Iniciante", duration: "10-20 minutos", intensity: "Leve" },
      {
        level: "Intermediário",
        duration: "20-30 minutos",
        intensity: "Moderada",
      },
      { level: "Avançado", duration: "30-45 minutos", intensity: "Alta" },
    ],
  },
  {
    title: "Aparelho de Escada",
    description:
      "O aparelho de escada simula o movimento de subir degraus, fortalecendo pernas e glúteos enquanto melhora o condicionamento cardiovascular.",
    imageUrl: "/assets/img/escada.png",
    details: [
      { level: "Iniciante", duration: "10-15 minutos", intensity: "Leve" },
      {
        level: "Intermediário",
        duration: "15-25 minutos",
        intensity: "Moderada",
      },
      { level: "Avançado", duration: "25-40 minutos", intensity: "Alta" },
    ],
  },
];

export const levelCard = [
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

export const levelCardExercise = [
  {
    title: "Iniciantes",
    description:
      "Para quem está começando, é essencial focar na técnica e construir uma base sólida de musculatura. Os treinos para iniciantes devem ser voltados para o aprendizado correto dos movimentos e aumento gradual de força e resistência.",
    details: [
      "Séries: 2 a 3 séries por exercício",
      "Repetições: 8 a 12 por série",
    ],
    colors: "from-blue-500 to-blue-700", // Cor ajustada para o nível Iniciantes
  },
  {
    title: "Intermediários",
    description:
      "Para quem já tem experiência, o nível intermediário busca o desenvolvimento contínuo de força e aumento de massa muscular. Neste nível, é fundamental trabalhar a carga progressiva e a variação de exercícios para estimular os músculos.",
    details: [
      "Séries: 3 a 4 séries por exercício",
      "Repetições: 6 a 12 por série, dependendo do objetivo",
    ],
    colors: "from-green-500 to-green-700", // Cor ajustada para o nível Intermediário
  },
  {
    title: "Avançados",
    description:
      "Para atletas avançados, o foco é maximizar a hipertrofia e a força muscular através de técnicas avançadas de treinamento, periodização e maior frequência de treino. Este nível exige disciplina e planejamento rigoroso.",
    details: [
      "Séries: 4 a 6 séries por exercício",
      "Repetições: 1 a 6 para força máxima e 6 a 12 para hipertrofia",
    ],
    colors: "from-red-500 to-red-700", // Cor ajustada para o nível Avançado
  },
];
