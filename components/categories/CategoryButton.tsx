"use client";
import React, { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CustomButton from "../CustomButton";
import CustomMobileButton from "../CustomMobileButton";
import MobileExercisesGroup from "../MobileExercisesGroup";
import ExercisesListMotal from "../ExercisesListMotal";

interface CategoryButtonProps {
  categoryName: string;
  img: string;
  component: ReactElement;
}

const CategoryButton = ({
  img,
  categoryName,
  component,
}: CategoryButtonProps) => {
  const [openModal, setOpenModel] = useState(false);
  return (
    <>
      <button
        className="flex items-center justify-center gap-3 rounded-full text-white/40  hover:text-accent bg-primary-200 shadow-accent/50 px-4 py-4 shadow-md
    lg:h-[54px] lg:-[152px] lg:px-3 lg:py4"
        onClick={() => setOpenModel(!openModal)}
      >
        <span className="text-sm font-semibold uppercase lg:text-xs ">
          {categoryName}
        </span>
      </button>
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

export default CategoryButton;
