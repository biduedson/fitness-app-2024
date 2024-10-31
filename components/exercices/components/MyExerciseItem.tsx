"use client";
import React, { useEffect, useState } from "react";
import { IExerciseItemProps } from "@/app/interfaces/ExercicesInterfacesProps";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../lib/variants";
import { useSession } from "next-auth/react";
import { toggleFavoriteExercise } from "@/app/_actions/favotiteExercisesToggle";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import ExerciseModal from "@/components/ExerciseModal";

const MyExerciseItem = ({
  exercise,
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
  const [openModal, setOpemModal] = useState(false);

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
      if (response.removed === true) {
        removedFavoriteFunction!(exercise.id);
      }
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
      <ExerciseModal
        opemModal={openModal}
        imageUrl={exercise.imageUrl as string}
        exerciseName={exercise.name}
        description={exercise.description}
        setOpenModal={setOpemModal}
        favorite={favorite}
        favoriteClick={() => {
          setMessageVisible(!messageVisible);
          handleFavoriteClick();
        }}
      />
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative  h-[150px] w-[150px]   sm:h-[200px] sm:w-[200px] lg:w-[250px] lg:h-[250px] rounded-t-lg text-white "
      >
        <Image
          src={exercise.imageUrl!}
          fill
          alt="exercice"
          className="relative object-cover rounded-t-lg "
        />

        {/*para sobrepor a imagem e escurece-la*/}

        <div
          className="absolute inset-0 bg-black opacity-30 cursor-pointer"
          onClick={() => setOpemModal(!openModal)}
        ></div>
      </motion.div>
      <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="text-sm text-white font-semibold z-10 text-center w-[150px] h-[60px] sm:w-[200px] lg:w-[250px]  rounded-b-lg
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

export default MyExerciseItem;
