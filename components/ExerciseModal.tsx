import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

interface ExerciseModalProps {
  opemModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  exerciseName: string;
  description: string;
  favoriteClick?: () => void;
  favorite?: boolean;
  messageVisible?: boolean;
  setMessageVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}
const ExerciseModal = ({
  opemModal,
  setOpenModal,
  imageUrl,
  exerciseName,
  description,
  favorite,
  favoriteClick,
  messageVisible,
  setMessageVisible,
}: ExerciseModalProps) => {
  console.log(messageVisible);
  return (
    <motion.div
      variants={fadeIn(opemModal ? "up" : "down", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        opemModal
          ? "fixed mt-24  z-20 w-full h-ful inset-0 bg-primary-300 lg:mx-auto lg:flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="w-full h-full flex flex-col lg:flex-row items-center lg:w-[800px] lg:gap-4  ">
        <div className="relative w-full h-[350px] lg:w-[400px] lg:h-[400px]">
          <Image
            src={imageUrl}
            alt={exerciseName}
            fill
            className="abosolute object-cover sm:object-contain"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="bg-gray-500 hover:bg-gray-700 cursor-pointer absolute top-10 rounded-full right-4 w-[50px] h-[50px]">
            <IoCloseSharp
              onClick={() => setOpenModal(!opemModal)}
              className=" text-accent  w-[50px] h-[50px]"
            />
          </div>
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="absolute left-4 top-10 flex  w-[50px] h-[50px] cursor-pointer  items-center justify-center rounded-full  bg-gray-500 hover:bg-gray-700 "
            onClick={favoriteClick}
          >
            <FaHeart
              className={
                favorite
                  ? "text-accent text-[30px] "
                  : "text-white text-[30px] "
              }
            />
          </motion.div>
        </div>
        <div className="bg-primary-300 flex-1 lg:h-[400px] relative ">
          <h4 className="h4 rounded-b-[20px] w-full text-center text-primary-300 bg-accent">
            {exerciseName}
          </h4>
          {messageVisible && (
            <motion.h4
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              onAnimationComplete={() =>
                setTimeout(() => setMessageVisible!(false), 400)
              }
              className="h4 absolute top-0 rounded-b-[20px] w-full  text-center text-white bg-accent "
            >
              {favorite
                ? "Exercício adicionado aos favoritos."
                : "Exercício removido dos favoritos."}
            </motion.h4>
          )}
          <div className="w-full px-4 py-8 ">
            <p className="text-white text-[22px] font-semibold text-justify">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseModal;
