"use client";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toggleFavoriteExercise } from "@/app/_actions/favotiteExercisesToggle";
import { motion } from "framer-motion";
import ExerciseModal from "./exerciseModal/ExerciseModal";
import { truncateText } from "@/app/util/truncateText";
import { FaHeart } from "react-icons/fa";
import AlertAction from "./AlertAction";

interface FavoriteExerciseCardProps {
  exercise: Prisma.ExerciseGetPayload<{
    include: {
      category: true;
      favoriteByStudents: {
        include: {
          student: {
            include: {
              user: true;
            };
          };
        };
      };
    };
  }>;
  exercises: Prisma.ExerciseGetPayload<{
    include: {
      category: true;
      favoriteByStudents: {
        include: {
          student: {
            include: {
              user: true;
            };
          };
        };
      };
    };
  }>[];
  setExercices: React.Dispatch<
    React.SetStateAction<FavoriteExerciseCardProps["exercises"] | null>
  >;
}

const NewExerciseCard = ({
  exercise,
  exercises,
  setExercices,
}: FavoriteExerciseCardProps) => {
  const { data } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(true);
  const [messageFavorited, setMessageFavorited] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /*para evitar varias renderizações, se  usa  o useeffect para antes de carregar  
a pagina verificarse  o exercicio ja foi favoritado pelo user logado*/

  const [openModal, setOpemModal] = useState(false);
  const [openalertAction, setOpenAlertAction] = useState<boolean>(false);

  const handleFavoriteClick = async () => {
    if (!data?.user?.id) {
      setMessageFavorited("Efetue  o login para favoritar exercício");
      return;
    }
    if (data?.user?.student === null || undefined) {
      setMessageFavorited("Apenas alunos podem favoritar exercícios.");
      return;
    }
    try {
      const response = await toggleFavoriteExercise(data.user.id, exercise.id);
      setIsFavorite(!isFavorite);
      setMessageFavorited(response.message);
      if (response.removed === true) {
        removedFavoriteFunction!(exercise.id);
      }
    } catch (error) {
      setMessageFavorited("Erro ao adicionar aos favoritos");
      console.log("erro");
    }
  };
  const removedFavoriteFunction = (exerciseId: string) => {
    // Filtra o array, removendo o exercício com o ID correspondente do array
    const updatedExercises = exercises.filter(
      (exercise) => exercise.id !== exerciseId
    );

    setExercices(updatedExercises);
  };
  return (
    <>
      <ExerciseModal
        isOpen={isOpen}
        imageUrl={exercise.imageUrl as string}
        exerciseName={exercise.name}
        description={exercise.description}
        setIsOpen={setIsOpen}
        isFavorite={isFavorite}
        favoriteClick={() => {
          setMessageVisible(!messageVisible);
          handleFavoriteClick();
        }}
      />
      <AlertAction
        alertOpen={openalertAction}
        setAlertOpen={setOpenAlertAction}
        alertTitle="Deseja remover este exercício?"
        alertDescription="Ao clicar em remover  o exercício sera removido dos seus exercícios favoritos"
        alertButtonName="Remover"
        alertFunctionAction={() => handleFavoriteClick()}
      />
      <motion.div>
        <Card className=" w-full h-full relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setOpenAlertAction(true)}
            className="absolute top-2 rigth-2 flex z-30 items-center justify-center right-2 text-white bg-slate-300 rounded-full w-8 h-8  hover:text-red-500 transition-colors duration-200"
          >
            <FaHeart className="text-red-600" />
          </motion.button>
          <CardHeader className="flex flex-col items-start w-full  px-1">
            <p className="text-[12px] uppercase font-bold">
              Categoria:{" "}
              <span className="text-red-600">{exercise.category.name}</span>
            </p>

            <h4 className="font-bold text-[12px] text-red-600">
              {truncateText(exercise.name, 25)}
            </h4>
          </CardHeader>
          <CardContent>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ timeConstant: 0.1 }}
              className="py-2 relative "
            >
              <Image
                alt="Exercise image"
                className="object-cover rounded-xl   "
                src={exercise.imageUrl!}
                width={100}
                height={60}
              />
              <div
                className="absolute inset-0 bg-black rounded-xl shadow-lg shadow-slate-400 bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-opacity duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-white text-xl lg:text-2xl font-semibold">
                  Ver Exercício
                </span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default NewExerciseCard;
