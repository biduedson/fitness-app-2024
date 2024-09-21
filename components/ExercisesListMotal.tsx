import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import { ReactElement } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface ExerciseModalListProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  categoryName: string;
  component: ReactElement;
}
function ExercisesListMotal({
  openModal,
  setOpenModal,
  imageUrl,
  categoryName,
  component,
}: ExerciseModalListProps) {
  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        openModal
          ? " fixed mt-[124px] lg:mt-0 z-40 lg:z-50 w-full h-ful inset-0 bg-primary-300 "
          : "hidden "
      }
    >
      <div className="relative flex items-end w-full h-[200px] z-30 ">
        <Image
          src={imageUrl}
          fill
          alt="Exercises list"
          className="absolute object-cover rounded-b-[14px]"
        />
        <div
          className=" flex items-center justify-center bg-gray-500 hover:bg-gray-700 cursor-pointer absolute top-2 rounded-full
         right-2 w-[40px] h-[40px]"
        >
          <IoCloseSharp
            onClick={() => setOpenModal(!openModal)}
            className=" text-accent   w-[30px] h-[30px]"
          />
        </div>
        <div className="flex items-center w-[181px] h-[43px] bg-white/5 p-2 rounded-bl-[14px] backdrop-blur-[4px]">
          <p className="text-[#e7e7e7] text-[14px] justify-self-start uppercase font-medium  z-10">
            {categoryName}
          </p>
        </div>
      </div>
      {component}
    </motion.div>
  );
}

export default ExercisesListMotal;
