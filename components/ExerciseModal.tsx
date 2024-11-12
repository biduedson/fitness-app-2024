import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { levelCardExercise } from "@/app/_constants/constants";

interface EnhancedExerciseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  exerciseName: string;
  description: string;
  favoriteClick?: () => void;
  isFavorite?: boolean;
}

const EnhancedExerciseModal = ({
  isOpen,
  setIsOpen,
  imageUrl,
  exerciseName,
  description,
  favoriteClick,
  isFavorite,
}: EnhancedExerciseModalProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${
        isOpen
          ? "fixed z-50 inset-0 h-[100vh] bg-black bg-opacity-60 "
          : "hidden"
      } flex items-center justify-center`}
    >
      <div className="relative w-full flex-col justify-between max-w-2xl h-[85vh] lg:h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full  h-[40%] sm:h-1/2">
          <Image
            src={imageUrl}
            alt={exerciseName}
            layout="fill"
            className="object-contain"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={favoriteClick}>
              <FaHeart
                className={`text-2xl ${
                  isFavorite ? "text-accent" : "text-gray-300"
                }`}
              />
            </button>
            <button>
              <FaShareAlt className="text-2xl text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6 flex-1">
          <h2 className="text-2xl text-accent font-bold text-center mb-2">
            {exerciseName}
          </h2>
          <div className="w-full max-h-[300px] lg:max-h-[220px] flex flex-col justify-between overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            <div className="w-full max-h-[130px] sm:h-[600px] mb-4">
              <p className="text-gray-600 text-justify">{description}</p>
            </div>

            {/* Séries e Repetições com Descrição */}
            <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4 lg:mb-8">
              <h3 className="text-xl text-accent font-semibold mb-2">
                Séries e Repetições
              </h3>
              <div className="space-y-3">
                {levelCardExercise.map((level, index) => (
                  <div
                    key={index}
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
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-gray-200 py-3 flex justify-around items-center">
          <button
            onClick={() => setIsOpen(false)}
            className="text-lg text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-lg text-accent hover:text-black"
          >
            Início
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedExerciseModal;
