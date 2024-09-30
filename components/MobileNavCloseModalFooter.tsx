"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { IoClose } from "react-icons/io5";

const MobileNavCloseModalFooter = ({ onclick }: { onclick: () => void }) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="relative w-full h-[70px] flex items-center justify-center  bg-accent cursor-pointer "
      onClick={onclick}
    >
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" absolute flex flex-col items-center justify-center  top-[-25px] bg bg-primary-300
          rounded-full w-[80px] h-[80px] border-accent border-[5px] text-[40px] text-white"
      >
        <IoClose />
      </motion.div>
    </motion.div>
  );
};

export default MobileNavCloseModalFooter;
