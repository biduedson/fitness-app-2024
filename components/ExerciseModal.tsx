import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaHome } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";
import { FiChevronsDown } from "react-icons/fi";
import { useRouter } from "next/navigation";
import MuscleGainGuide from "./MuscleGainGuide";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
          ? "fixed  lg:mt-0  z-50 w-full h-full inset-0 bg-black_texture lg:mx-auto lg:flex items-center justify-center"
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
          className=" fixed z-50 top-0  flex items-center justify-center bg-black_texture  rounded-lg w-full h-[100px]  text-center text-accent 
                  uppercase bg-transparent "
        >
          <h1 className="h2">
            {favorite
              ? "Exercício adicionado aos favoritos."
              : "Exercício removido dos favoritos."}
          </h1>
        </motion.p>
      )}
      <div className="w-full flex flex-col max-h-full justify-between lg:flex-row items-center lg:w-[800px] lg:gap-4 mt-12  ">
        <div className="w-full h-[300px] sm:h-[400px] flex  justify-center">
          <div className="relative w-[80%] h-[200px] sm:h-[300px] lg:w-[400px] lg:h-[400px]">
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
        </div>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          className="bg-primary-300  flex justify-end  lg:h-[400px] "
        >
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full flex flex-col  bg-black_texture"
          >
            <div className="w-full flex flex-col items-center justify-center mt-2 px-4 border-y-white border-[1px]">
              <p className=" text-[18px] uppercase text-accent text-center font-semibold  ">
                {exerciseName}
              </p>
            </div>
            <div className="relative px-4 h-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden">
              <p className="text-[#DDDDE1] text-[16px] font-semibold text-left py-4">
                Descrição:
              </p>
              <div className="w-full h-[180px] my-2  overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                <p className="text-white text-[14px] font-semibold text-justify">
                  {description}
                </p>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <div className="w-full flex items-center justify-center h-[40px] bg-accent my-4 rounded-lg">
                    <span className="text-white text-center uppercase font-semibold">
                      click aqui para dicas
                    </span>
                  </div>
                </SheetTrigger>
                <SheetContent className="w-full  bg-white shadow-md shadow-accent ">
                  <SheetHeader>
                    <SheetTitle>
                      <motion.div
                        variants={fadeIn("down", 0.1)}
                        initial="hidden"
                        whileInView={"show"}
                        className="h-[80px] mt-6  bg-black_texture rounded-lg flex items-center justify-center"
                      >
                        <h2 className="h2  text-center text-accent ">
                          Diretrizes para Aumento de Massa Magra
                        </h2>
                      </motion.div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className=" w-full h-[650px] sm:h-[900px] mt-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden  ">
                    <MuscleGainGuide />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </motion.div>

        <div className="fixed bottom-0 w-full h-[60px]">
          <div className="relative w-full flex flex-col gap-4">
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="relative w-full h-[70px] flex items-center justify-center 
                 bg-accent cursor-pointer "
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
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseModal;
