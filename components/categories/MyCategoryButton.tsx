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
      <motion.button
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="flex items-center justify-center w-[100px] h-[100px] gap-3 rounded-full text-white/40  hover:text-accent bg-primary-200 shadow-accent/50 px-4 py-4 shadow-md
    lg:h-[54px] lg:-[152px] lg:px-3 lg:py4"
        onClick={() => setOpenModel(!openModal)}
      >
        <span className="text-sm font-semibold uppercase lg:text-xs ">
          {categoryName}
        </span>
      </motion.button>
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
