"use client";
import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import React from "react";

const CategoryButton = ({ categoryName }: { categoryName: string }) => {
  return (
    <motion.button
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="flex items-center justify-center w-[100px] h-[100px] gap-3 rounded-full text-white/40  hover:text-accent bg-primary-200 shadow-accent/50 px-4 py-4 shadow-md
    lg:h-[54px] lg:-[152px] lg:px-3 lg:py4"
    >
      <span className="text-sm font-semibold uppercase lg:text-xs ">
        {categoryName}
      </span>
    </motion.button>
  );
};

export default CategoryButton;
