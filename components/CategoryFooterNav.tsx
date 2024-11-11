"use client";

import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiArrowGoBackFill } from "react-icons/ri";

const CategoryFooterNav = () => {
  const router = useRouter();
  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className=" min-w-full flex justify-center    h-[80px] bg-gray-800 items-center text-gray-300 shadow-inner "
    >
      <div className="w-full h-full flex justify-around ">
        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center justify-center cursor-pointer  "
          onClick={() => router.back()}
        >
          <RiArrowGoBackFill className="text-4xl mb-1 hover:scale-110 transition-transform" />
          <span className="text-sm">voltar</span>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center justify-center cursor-pointer "
          onClick={() => router.push("/")}
        >
          <FaHome className="text-4xl mb-1 hover:scale-110 transition-transform" />
          <span className="text-sm">Início</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryFooterNav;
