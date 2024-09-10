import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CustomButton from "../CustomButton";
import CustomMobileButton from "../CustomMobileButton";
import MobileExercisesGroup from "../MobileExercisesGroup";

interface CategoryButtonProps {
  img: string;
  categoryName: string;
  component: ReactElement;
  handleComponentClick: () => void;
}

const CategoryButton = ({
  img,
  categoryName,
  component,
  handleComponentClick,
}: CategoryButtonProps) => {
  return (
    <MobileExercisesGroup
      img={img}
      categoryName={categoryName}
      handleComponentClick={handleComponentClick}
      component={component}
    />
  );
};

export default CategoryButton;
