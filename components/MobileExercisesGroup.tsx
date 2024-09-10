"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import ExercisesListMotal from "./ExercisesListMotal";
import { ReactElement, useState } from "react";
const MobileExercisesGroup = ({
  categoryName,
  img,
  component,
  handleComponentClick,
}: {
  categoryName: string;
  img: string;
  component: ReactElement;
  handleComponentClick: () => void;
}) => {
  const [openModal, setOpemModel] = useState(false);
  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative flex items-end w-[400px] sm:w-[640px] h-[127px] sm:h-[200px]  "
        onClick={() => setOpemModel(!openModal)}
      >
        <Image
          src={img}
          alt={categoryName}
          fill
          className="absolute object-cover rounded-[14px]"
        />
        <div className="flex items-center w-[181px] h-[43px] bg-white/5 p-2 rounded-bl-[14px] backdrop-blur-[4px]">
          <p className="text-[#e7e7e7] text-[14px] justify-self-start uppercase font-medium  z-10">
            {categoryName}
          </p>
        </div>
      </motion.div>
      <ExercisesListMotal
        component={component}
        openModal={openModal}
        setOpenModal={setOpemModel}
        categoryName={categoryName}
        imageUrl={img}
      />
    </div>
  );
};

export default MobileExercisesGroup;
