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
          ? "fixed  flex flex-col lg:items-end   z-50  w-full  inset-0 overflow-y-hidden bg-black_texture sm:bg-hero bg-cover "
          : "hidden "
      }
    >
      <div className="flex flex-col  justify-between lg:items-center h-full w-full lg:w-[450px]">
        <motion.h1
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h1 text-center lg:text-left my-4 lg:text-[70px] "
        >
          <span className="text-accent ">{categoryName}</span>
        </motion.h1>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className=" h-full mb-4  overflow-y-scroll [&::-webkit-scrollbar]:hidden"
        >
          {component}
        </motion.div>

        <div className="w-full px-4 ">
          <button
            className=" w-full h-[50px] rounded-lg bg-accent text-white mb-2 uppercase "
            onClick={() => setOpenModal(!openModal)}
          >
            sair
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ExercisesListMotal;
