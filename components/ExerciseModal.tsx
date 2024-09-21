import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import CustomButton from "./CustomButton";

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
  return (
    <motion.div
      variants={fadeIn("down", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        opemModal
          ? "fixed mt-24 lg:mt-0  z-50 w-full h-ful inset-0 bg-primary-300 lg:mx-auto lg:flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="w-full h-full flex flex-col gap-8 lg:flex-row items-center lg:w-[800px] lg:gap-4 mt-12  ">
        <div className="relative w-[90%] h-[200px]  lg:w-[400px] lg:h-[400px]">
          <Image
            src={imageUrl}
            alt={exerciseName}
            fill
            className="abosolute object-fill sm:object-contain rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          {favorite && (
            <motion.div
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="absolute right-2 top-4 flex  w-[40px] h-[40px]  "
              onClick={favoriteClick}
            >
              <FaHeart className="text-accent text-[30px] " />
            </motion.div>
          )}
        </div>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          className="bg-primary-300 flex-1 lg:h-[400px] relative "
        >
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full h-full flex flex-col justify-between  bg-[#202023] rounded-t-[30px] mt-2 p-8"
          >
            <div className="relative">
              <div className="w-full flex flex-col items-center justify-center ">
                <p className="text-[#DDDDE1] text-[18px] font-semibold text-left ">
                  {exerciseName}
                </p>
                <p className="text-[#81809E] text-[16px] font-semibold text-left ">
                  3x12 Repetições
                </p>
              </div>
              <p className="text-[#DDDDE1] text-[18px] font-semibold text-left py-4">
                Descrição:
              </p>
              <p className="text-[#81809E] text-[18px] font-semibold text-justify">
                {description}
              </p>
            </div>

            <div className="relative w-full flex flex-col gap-4 py-4 mb-8">
              <CustomButton
                containerStyles="  w-full h-[50px] rounded-lg"
                text={
                  favorite
                    ? " Remover exercicio dos favoritos"
                    : "Adicionar exercício aos favoritos"
                }
                onclick={favoriteClick}
              />

              <CustomButton
                containerStyles="w-full h-[50px] rounded-lg"
                text="sair"
                onclick={() => setOpenModal(!opemModal)}
              />
              {messageVisible && (
                <motion.p
                  variants={fadeIn("up", 0.1)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  onAnimationComplete={() =>
                    setTimeout(() => setMessageVisible!(false), 400)
                  }
                  className=" absolute  flex items-center justify-center top-4 rounded-lg w-full h-[56px]  text-center text-white 
                  uppercase bg-accent "
                >
                  {favorite
                    ? "Exercício adicionado aos favoritos."
                    : "Exercício removido dos favoritos."}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseModal;
