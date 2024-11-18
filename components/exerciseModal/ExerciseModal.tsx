import { motion } from "framer-motion";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { levelCardExercise } from "@/app/_constants/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactElement, useState } from "react";
import LevelExerciseCard from "./components/LevelExerciseCard";
import LevelExerciseButtons from "./components/LevelExerciseButtons";
import { IoCloseCircle } from "react-icons/io5";

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
  const [component, setcomponent] = useState<ReactElement>(
    <LevelExerciseCard level={levelCardExercise[0]} />
  );
  const levels: any[] = levelCardExercise.map((level) => {
    return {
      name: level.title,
      component: <LevelExerciseCard level={level} />,
    };
  });

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="w-full h-[250px] lg:h-[200px]">
              <div className="relative w-full  h-full ">
                <Image
                  src={imageUrl}
                  alt={exerciseName}
                  layout="fill"
                  className="absolute object-contain"
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
                <div className="absolute top-0 left-0 ">
                  <button onClick={() => setIsOpen(false)}>
                    <IoCloseCircle className="text-5xl  text-accent" />
                  </button>
                </div>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="p-2 flex-1">
                <h2 className=" text-sm lg:text-lg text-accent font-bold text-center ">
                  {exerciseName}
                </h2>
                <LevelExerciseButtons
                  levels={levels}
                  setComponent={setcomponent}
                />
                {component}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EnhancedExerciseModal;
