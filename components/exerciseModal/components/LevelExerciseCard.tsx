import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";

interface LevelExerciseProps {
  level: {
    title: string;
    description: string;
    details: string[];
    colors: string; // Rep
  };
}

const LevelExerciseCard = ({ level }: LevelExerciseProps) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full max-h-[350px] lg:max-h-[220px] flex flex-col justify-between overflow-y-scroll [&::-webkit-scrollbar]:hidden"
    >
      {/* Séries e Repetições com Descrição */}
      <div className="grid gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4 lg:mb-8">
          <h3 className="text-xl text-accent font-semibold mb-2">
            Séries e Repetições
          </h3>
          <div className="space-y-3 ">
            <div
              key={level.title}
              className={`bg-gradient-to-r p-4 rounded-md shadow-md mb-4 text-white ${level.colors}`}
            >
              <h4 className="text-lg font-semibold">{level.title}</h4>
              <p className="text-sm mb-2">{level.description}</p>
              <ul className="list-disc ml-6 space-y-1">
                {level.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LevelExerciseCard;
