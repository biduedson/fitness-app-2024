"use client";
import React, { ReactElement, useState } from "react";
import MobileExercisesGroup from "../MobileExercisesGroup";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import ExercisesListMotal from "../ExercisesListMotal";

interface CategoryButtonProps {
  img: string;
  categoryName: string;
  component: ReactElement;
}

const MyCategoryButton = ({
  img,
  categoryName,
  component,
}: CategoryButtonProps) => {
  const [openModal, setOpenModel] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative flex items-end w-full h-[200px]
         cursor-pointer lg:z-30 
        "
        onClick={() => setOpenModel(!openModal)}
      >
        <Image
          src={img}
          alt={categoryName}
          fill
          className="absolute object-cover rounded-[14px]"
        />
        <div className="flex items-center w-[181px] h-[43px] bg-white/5 p-2 rounded-bl-[14px] backdrop-blur-[4px]">
          <p className="text-[#e7e7e7] text-[14px] justify-self-start uppercase font-medium  z-50">
            {categoryName}
          </p>
        </div>
      </motion.div>
      <ExercisesListMotal
        component={component}
        openModal={openModal}
        setOpenModal={setOpenModel}
        categoryName={categoryName}
        imageUrl={img}
      />
    </>
  );
};

export default MyCategoryButton;
