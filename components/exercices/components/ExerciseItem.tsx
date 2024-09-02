"use client";
import React, { useEffect, useState } from "react";
import { IExerciseItemProps } from "@/app/interfaces/ExercicesInterfacesProps";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../lib/variants";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { toggleFavoriteExercise } from "@/app/_actions/favotiteExercisesToggle";

const ExerciseItem = ({
  exercise,
  addFavoriteFunction,
  removedFavoriteFunction,
}: IExerciseItemProps) => {
  const { data } = useSession();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [messageFavorited, setMessageFavorited] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);

  /*para evitar varias renderizações, se  usa  o useeffect para antes de carregar  
a pagina verificarse  o exercicio ja foi favoritado pelo user logado*/
  useEffect(() => {
    if (data?.user) {
      const favoritedExercise = exercise.favoriteByStudents.some(
        (favorite) => favorite.student.userId === data.user.id!
      );
      setFavorite(favoritedExercise);
    }
  }, [data, exercise.favoriteByStudents]);

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
      setFavorite(!favorite);
      setMessageFavorited(response.message);
    } catch (error) {
      setMessageFavorited("Erro ao adicionar aos favoritos");
      console.log("erro");
    }
  };
  return (
    <div
      className="relative flex flex-col items-center justify-center  "
      key={exercise.id}
    >
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative  h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] lg:w-[300px] lg:h-[300px] rounded-t-lg text-white "
      >
        <Image
          src={exercise.imageUrl!}
          fill
          alt="exercice"
          className="relative object-cover rounded-t-lg"
        />
        {/*para sobrepor a imagem e escurece-la*/}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {data?.user && (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="absolute right-2 top-2 flex h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9 cursor-pointer  items-center justify-center rounded-full  bg-gray-500 hover:bg-gray-700 "
            onClick={() => {
              setMessageVisible(!messageVisible);
              handleFavoriteClick();
            }}
          >
            <FaHeart
              className={
                favorite
                  ? "text-accent lg:h-[22px] lg:w-[22px]lg:h-[22px] lg:w-[22px]"
                  : "text-white lg:h-[22px] lg:w-[22px]lg:h-[22px] lg:w-[22px]"
              }
            />
          </motion.div>
        )}
      </motion.div>
      <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-sm text-white font-semibold z-10 text-center w-[150px] h-[60px] sm:w-[200px] lg:w-[300px] rounded-b-lg
             bg-accent flex items-center justify-center "
      >
        {exercise.name!}
      </motion.p>
      {messageVisible && (
        <motion.p
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          onAnimationComplete={() =>
            setTimeout(() => setMessageVisible(false), 400)
          }
          className="absolute bottom-0  text-sm text-white font-semibold z-10 text-center w-[150px] h-[60px] sm:w-[200px] lg:w-[300px] rounded-b-lg
         bg-accent flex items-center justify-center "
        >
          {messageFavorited}
        </motion.p>
      )}
    </div>
  );
};

export default ExerciseItem;
