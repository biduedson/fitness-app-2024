import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ExerciseModalProps {
  opemModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  exerciseName: string;
  description: string;
}
const ExerciseModal = ({
  opemModal,
  setOpenModal,
  imageUrl,
  exerciseName,
  description,
}: ExerciseModalProps) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        opemModal ? "fixed mt-24  z-20 w-full h-ful inset-0 bg-white" : "hidden"
      }
    >
      <div className="w-full h-full flex flex-col items-center  ">
        <div className="relative w-full h-[350px]">
          <Image
            src={imageUrl}
            alt={exerciseName}
            fill
            className="abosolute object-cover sm:object-contain"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="bg-accent absolute top-10 rounded-full right-4 w-[50px] h-[50px]">
            <IoCloseSharp
              onClick={() => setOpenModal(!opemModal)}
              className=" text-primary-300  w-[50px] h-[50px]"
            />
          </div>
        </div>
        <div className="bg-primary-300 flex-1">
          <h4 className="h4 rounded-b-[20px] w-full text-center text-primary-300 bg-accent">
            {exerciseName}
          </h4>
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
