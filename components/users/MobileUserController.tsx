import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import React from "react";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MobileUserController = () => {
  const router = useRouter();
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="relative w-full h-[70px] flex items-center justify-center  bg-accent cursor-pointer "
      onClick={() => router.push("/")}
    >
      <motion.div
        variants={fadeIn("down", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" absolute flex flex-col items-center justify-center  top-[-25px] bg bg-primary-300
          rounded-full w-[80px] h-[80px] border-accent border-[5px] text-[40px] text-white"
      >
        <FaHome />
        <span className="text-[12px]">inicio</span>
      </motion.div>
    </motion.div>
  );
};

export default MobileUserController;
