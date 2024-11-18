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
import { Card, CardContent, CardHeader } from "./ui/card";

const ExerciseCard = ({ exercise }: IExerciseItemProps) => {
  const { data } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [messageFavorited, setMessageFavorited] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (data?.user.student) {
      const favoritedExercise = exercise.favoriteByStudents?.some(
        (favorite) => favorite.studentId === data.user.student?.id!
      );

      setIsFavorite(favoritedExercise);
    }
  }, [data, exercise.favoriteByStudents]);

  const handleFavoriteClick = async () => {
    if (!data?.user?.id) {
      setMessageFavorited("Efetue o login para favoritar exercício");
      return;
    }
    if (!data?.user?.student) {
      setMessageFavorited("Apenas alunos podem favoritar exercícios.");
      return;
    }
    try {
      const response = await toggleFavoriteExercise(data.user.id, exercise.id);
      setIsFavorite(!isFavorite);
      setMessageFavorited(response.message);
    } catch (error) {
      setMessageFavorited("Erro ao adicionar aos favoritos");
      console.log("erro");
    }
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
      <motion.div>
        <Card className=" w-full h-full relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => {
              setMessageVisible(!messageVisible);
              handleFavoriteClick();
            }}
            className="absolute top-2 rigth-2 flex z-30 items-center justify-center right-2 text-white bg-slate-300 rounded-full w-8 h-8  hover:text-red-500 transition-colors duration-200"
          >
            <FaHeart className={isFavorite ? "text-red-600" : "text-white"} />
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
              className="py-2 relative flex items-center justify-center"
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
                <span className="text-white text-sm lg:text-2xl font-semibold">
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

export default ExerciseCard;
