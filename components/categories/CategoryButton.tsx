import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import CustomButton from "../CustomButton";

interface CategoryButtonProps {
  categoryName: string;
  index: number;
  handleComponentClick: () => void;
}

const CategoryButton = ({
  categoryName,
  index,
  handleComponentClick,
}: CategoryButtonProps) => {
  return (
    <motion.div
      variants={fadeIn("up", index * 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="mt-4 px-4 "
      key={index}
      onClick={handleComponentClick}
    >
      <CustomButton
        text={categoryName}
        containerStyles="text-[11px] sm:text-[14px] lg:text-[16px]  w-[120px] h-[32px] sm:w-[146px] sm:h-[42px] lg:w-[196px] lg:h-[62px]"
      />
    </motion.div>
  );
};

export default CategoryButton;
