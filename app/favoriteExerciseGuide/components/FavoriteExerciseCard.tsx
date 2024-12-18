"use client";
import React, { useEffect, useState } from "react";
import { IExerciseItemProps } from "@/app/interfaces/ExercicesInterfacesProps";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { toggleFavoriteExercise } from "@/app/_actions/favotiteExercisesToggle";
import ExerciseModal from "@/components/exerciseModal/ExerciseModal";
import { fadeIn } from "@/lib/variants";
import { truncateText } from "@/app/util/truncateText";
import { Prisma } from "@prisma/client";
import { Trash2 } from "lucide-react";
import AlertAction from "@/components/AlertAction";

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

const FavoriteExerciseCard = ({
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
      <div
        key={exercise.id}
        className="relative m-2 p-2 shadow-lg rounded-lg bg-white flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200 ease-in-out"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.3 }}
          onClick={() => setOpenAlertAction(true)}
          className="absolute top-2 rigth-2 flex z-30 items-center justify-center right-2 text-white bg-slate-300 rounded-full w-8 h-8  hover:text-red-500 transition-colors duration-200"
        >
          <FaHeart className="text-red-600" />
        </motion.button>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] lg:w-[200px] lg:h-[200px] Xxl:w-[180px] xl:h-[200px] xl:w-[180px] Xxl:h-[200px] rounded-lg overflow-hidden"
        >
          <Image
            src={exercise.imageUrl!}
            fill
            alt="Exercise"
            className="object-cover rounded-t-lg"
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-opacity duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-white text-2xl font-semibold">
              Ver Exercício
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="relative mt-2 w-full text-center p-2 bg-red-600 rounded-b-lg text-white font-semibold text-lg flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className=" w-full absolute top-[-20px] mt-2 p-4 bg-gray-200 text-black rounded-lg z-50"
            >
              {exercise.name}
            </motion.div>
          )}
          {truncateText(exercise.name, 10)}

          {messageVisible && (
            <motion.div
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              animate={"show"}
              onAnimationComplete={() =>
                setTimeout(() => setMessageVisible(false), 400)
              }
              className="absolute bottom-[-40px] left-0 right-0 text-sm bg-white text-gray-800 p-1 rounded shadow-md"
            >
              {messageFavorited}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default FavoriteExerciseCard;
