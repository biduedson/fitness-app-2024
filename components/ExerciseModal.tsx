import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import MuscleGainGuide from "./MuscleGainGuide";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        isOpen ? "fixed z-50 inset-0 bg-black bg-opacity-60" : "hidden"
      } flex items-center justify-center`}
    >
      <div className="relative w-full flex- flex-col justify-between max-w-2xl h-[85vh] bg-white rounded-lg shadow-lg overflow-hidden">
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

        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl text-accent font-bold text-center mb-2">
            {exerciseName}
          </h2>
          <div className="w-full max-h-[130px] sm:h-[600px] overflow-y-scroll  [&::-webkit-scrollbar]:hidden mb-4 ">
            <p className="text-gray-600 text-justify ">{description}</p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full bg-accent text-white font-semibold py-2 rounded-md">
                Veja mais dicas
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Diretrizes para Aumento de Massa Magra</SheetTitle>
              </SheetHeader>
              <div className="p-4 overflow-y-scroll max-h-[80vh]">
                <MuscleGainGuide />
              </div>
            </SheetContent>
          </Sheet>
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
