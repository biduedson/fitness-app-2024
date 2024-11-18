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
    colors: "bg-blue-100 text-blue-600",
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
    colors: "bg-green-100 text-green-600",
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
    colors: "bg-red-100 text-red-600",
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

export const foodPlan = [
  {
    id: 1,
    titulo: "Café da Manhã",
    cor: "bg-blue-100 text-blue-600",
    dados: [
      {
        tipo: "Carboidratos",
        descricao: "4 fatias de pão integral ou 50g de aveia com frutas.",
      },
      { tipo: "Proteínas", descricao: "4 claras e 2 ovos inteiros mexidos." },
      {
        tipo: "Gorduras boas",
        descricao: "1 colher de sopa de pasta de amendoim integral.",
      },
      {
        tipo: "Bebida",
        descricao: "1 copo (200ml) de suco de laranja ou água com limão.",
      },
      {
        tipo: "Suplemento",
        descricao:
          "1 dose de whey protein (opcional, para complementar as proteínas).",
      },
    ],
  },
  {
    id: 2,
    titulo: "Lanche da Manhã",
    cor: "bg-green-100 text-green-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao:
          "1 iogurte natural proteico ou 1 dose de whey protein com água.",
      },
      {
        tipo: "Carboidratos",
        descricao: "1 banana ou 2 colheres de sopa de granola.",
      },
      {
        tipo: "Gorduras boas",
        descricao: "10 amêndoas ou 1 colher de chá de óleo de coco.",
      },
    ],
  },
  {
    id: 3,
    titulo: "Almoço",
    cor: " bg-yellow-100 text-yellow-600 ",
    dados: [
      {
        tipo: "Carboidratos",
        descricao:
          "150g de arroz integral ou batata doce (equivalente a 2 colheres de sopa cheias).",
      },
      {
        tipo: "Proteínas",
        descricao:
          "150g de peito de frango grelhado ou carne magra (patinho, músculo).",
      },
      {
        tipo: "Leguminosas",
        descricao: "1 concha de feijão, grão-de-bico ou lentilha.",
      },
      {
        tipo: "Vegetais",
        descricao:
          "Salada verde à vontade com azeite de oliva (1 colher de chá).",
      },
    ],
  },
  {
    id: 4,
    titulo: "Pré-Treino (30-60 minutos antes do treino)",
    cor: "bg-red-100 text-red-600",
    dados: [
      {
        tipo: "Carboidratos",
        descricao: "1 banana com mel ou 2 fatias de pão integral.",
      },
      {
        tipo: "Proteínas",
        descricao: "1 dose de whey protein ou 3 claras de ovo cozidas.",
      },
      {
        tipo: "Suplemento",
        descricao:
          "5g de creatina + 200ml de água (se liberado por um profissional).",
      },
    ],
  },
  {
    id: 5,
    titulo: "Pós-Treino",
    cor: "bg-blue-200 text-blue-600",
    dados: [
      {
        tipo: "Suplemento",
        descricao:
          "1 dose de whey protein + 30g de maltodextrina ou dextrose (para reposição energética).",
      },
      {
        tipo: "Carboidratos",
        descricao:
          "2 fatias de pão integral com geléia sem açúcar ou 1 batata doce média.",
      },
      { tipo: "Proteínas", descricao: "150g de frango, peixe ou carne magra." },
    ],
  },
  {
    id: 6,
    titulo: "Jantar",
    cor: "bg-green-200 text-green-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao: "150g de peixe ou filé de peito de frango.",
      },
      {
        tipo: "Carboidratos",
        descricao: "1 batata-doce média ou 1 xícara de arroz integral.",
      },
      {
        tipo: "Vegetais",
        descricao: "Vegetais cozidos (brócolis, couve-flor, abóbora).",
      },
    ],
  },
  {
    id: 7,
    titulo: "Ceia (se necessário)",
    cor: "bg-yellow-200 text-yellow-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao: "1 porção de queijo cottage ou 1 scoop de caseína.",
      },
      {
        tipo: "Gorduras boas",
        descricao: "1 colher de sopa de óleo de linhaça ou azeite.",
      },
    ],
  },
];

export const weightLossPlan = [
  {
    id: 1,
    titulo: "1. Café da Manhã",
    cor: "bg-blue-100 text-blue-600",
    dados: [
      {
        tipo: "Carboidratos",
        descricao: "1 fatia de pão integral ou 30g de aveia.",
      },
      {
        tipo: "Proteínas",
        descricao: "2 claras de ovo e 1 ovo inteiro cozidos.",
      },
      { tipo: "Gorduras boas", descricao: "1 colher de chá de óleo de coco." },
      {
        tipo: "Bebida",
        descricao: "1 copo (200ml) de chá verde ou café preto sem açúcar.",
      },
    ],
  },
  {
    id: 2,
    titulo: "2. Lanche da Manhã",
    cor: "bg-green-100 text-green-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao: "1 iogurte grego sem açúcar ou 1 scoop de whey protein.",
      },
      { tipo: "Carboidratos", descricao: "1 maçã ou 10 morangos." },
      {
        tipo: "Gorduras boas",
        descricao: "10 amêndoas ou 1 colher de sopa de pasta de amendoim.",
      },
    ],
  },
  {
    id: 3,
    titulo: "3. Almoço",
    cor: "bg-yellow-100 text-yellow-600",
    dados: [
      {
        tipo: "Carboidratos",
        descricao: "100g de arroz integral ou 1 batata-doce média.",
      },
      {
        tipo: "Proteínas",
        descricao: "120g de peito de frango grelhado ou peixe.",
      },
      {
        tipo: "Vegetais",
        descricao: "Salada verde com azeite de oliva (1 colher de chá).",
      },
    ],
  },
  {
    id: 4,
    titulo: "4. Lanche da Tarde",
    cor: "bg-red-100 text-red-600",
    dados: [
      {
        tipo: "Carboidratos",
        descricao: "1 fatia de pão integral ou 2 colheres de sopa de quinoa.",
      },
      {
        tipo: "Proteínas",
        descricao: "1 fatia de queijo cottage ou 1 ovo cozido.",
      },
      {
        tipo: "Gorduras boas",
        descricao: "1 colher de sopa de abacate amassado.",
      },
    ],
  },
  {
    id: 5,
    titulo: "5. Jantar",
    cor: "bg-blue-200 text-blue-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao: "150g de filé de peixe ou frango grelhado.",
      },
      {
        tipo: "Carboidratos",
        descricao: "1 xícara de arroz integral ou 1 batata-doce média.",
      },
      {
        tipo: "Vegetais",
        descricao: "Brócolis, espinafre ou abobrinha grelhada.",
      },
    ],
  },
  {
    id: 6,
    titulo: "6. Ceia (se necessário)",
    cor: "bg-green-200 text-green-600",
    dados: [
      {
        tipo: "Proteínas",
        descricao: "1 scoop de caseína ou 1 porção de queijo cottage.",
      },
      {
        tipo: "Gorduras boas",
        descricao: "1 colher de sopa de óleo de linhaça ou azeite.",
      },
    ],
  },
];
