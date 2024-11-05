"use client";
import { FaHome } from "react-icons/fa";
import { TbArrowBack } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const MobileNavHomeFooter = () => {
  const router = useRouter();

  return (
    <>
      {/* Versão Mobile */}
      <motion.footer
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="fixed lg:hidden bottom-0 w-full h-[80px] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 flex justify-around items-center text-gray-300 shadow-inner z-50 md:hidden"
      >
        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => router.back()}
        >
          <TbArrowBack className="text-3xl mb-1 hover:scale-110 transition-transform" />
          <span className="text-xs">Voltar</span>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FaHome className="text-3xl mb-1 hover:scale-110 transition-transform" />
          <span className="text-xs">Início</span>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default MobileNavHomeFooter;
