import { Input } from "@/components/ui/input";
import { fadeIn } from "@/lib/variants";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";

interface ISearchUserProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const SearchUser = ({ handleInputChange }: ISearchUserProps) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className="  w-full h-[60px] flex items-center justify-center gap-2 bg-transparent z-50  px-6  text-white"
    >
      <Input
        type="text"
        placeholder="Buscar por nome ou email"
        className="w-full h-[40px] border-accent border-[2px] text-black text-[20px] placeholder:text-accent placeholder:text-center bg-white"
        onChange={handleInputChange}
      />
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent text-white text-[20px] ">
        <BsSearch />
      </div>
    </motion.div>
  );
};

export default SearchUser;
