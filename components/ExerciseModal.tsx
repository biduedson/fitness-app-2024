import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaHome } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <motion.div
      variants={fadeIn("down", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        opemModal
          ? "fixed mt-24 lg:mt-0  z-50 w-full h-auto inset-0 bg-primary-300 lg:mx-auto lg:flex items-center justify-center"
          : "hidden"
      }
    >
      {messageVisible && (
        <motion.p
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          onAnimationComplete={() =>
            setTimeout(() => setMessageVisible!(false), 400)
          }
          className=" fixed z-50 top-0  flex items-center justify-center bg-black_texture Ttop-4 rounded-lg w-full h-[100px]  text-center text-accent 
                  uppercase bg-transparent "
        >
          <h1 className="h2">
            {favorite
              ? "Exercício adicionado aos favoritos."
              : "Exercício removido dos favoritos."}
          </h1>
        </motion.p>
      )}
      <div className="w-full h-full flex flex-col gap-8 lg:flex-row items-center lg:w-[800px] lg:gap-4 mt-12  ">
        <div className="relative w-[90%] h-[200px] sm:h-[400px] lg:w-[400px] lg:h-[400px]">
          <Image
            src={imageUrl}
            alt={exerciseName}
            fill
            className="abosolute object-fill sm:object-fill rounded-lg"
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
            className="w-full h-full flex flex-col justify-between  bg-black_texture rounded-t-[30px] mt-2 "
          >
            <div className="relative px-4">
              <div className="w-full flex flex-col items-center justify-center ">
                <p className="text-[#DDDDE1] text-[18px] font-semibold text-left ">
                  {exerciseName}
                </p>
                <p className="text-white text-[16px] font-semibold text-left ">
                  3x12 Repetições
                </p>
              </div>
              <p className="text-[#DDDDE1] text-[18px] font-semibold text-left py-4">
                Descrição:
              </p>
              <p className="text-white text-[18px] font-semibold text-justify">
                {description}
              </p>
            </div>

            <div className="relative w-full flex flex-col gap-4 py-4 mb-8">
              <motion.div
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}
                className="relative w-full h-[70px] flex items-center justify-center 
                 bg-accent cursor-pointer mb-2"
                onClick={() => onclick}
              >
                <motion.div
                  variants={fadeIn("down", 0.6)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.2 }}
                  onClick={() => router.push("/")}
                  className=" absolute top-[-25px] flex flex-col items-center justify-center   
                  bg bg-primary-200 rounded-full w-[80px] h-[80px] border-accent border-[5px] 
                  text-[40px] text-white z-50"
                >
                  <FaHome />
                </motion.div>

                <div className="absolute  top-[-15px] w-full h-[50px] flex items-center justify-between px-4 ">
                  <motion.div
                    variants={fadeIn("down", 0.6)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.2 }}
                    onClick={() => setOpenModal(!opemModal)}
                    className="  flex  items-center justify-center  top-[-25px]
                     bg bg-primary-200 rounded-full w-[60px] h-[60px] text-[30px]
                      border-accent border-[5px] "
                  >
                    <TbArrowBack className="text-white" />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("down", 0.6)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.2 }}
                    onClick={favoriteClick}
                    className="  flex  items-center justify-center  
                    top-[-25px] bg bg-primary-200 rounded-full w-[60px] h-[60px]
                     text-[30px] border-accent border-[5px] "
                  >
                    <FaHeart
                      className={favorite ? "text-accent" : "text-white"}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseModal;
