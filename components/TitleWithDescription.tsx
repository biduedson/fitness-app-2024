import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { StringifyOptions } from "querystring";

interface TitleWithDescriptionAnimationProps {
  title: string;
  description: string;
  clasName?: string;
}
const TitleWithDescriptionAnimation = ({
  title,
  description,
  clasName,
}: TitleWithDescriptionAnimationProps) => {
  return (
    <div
      className={
        clasName
          ? `${clasName} flex flex-col  items-center gap-2  bg-slate-100`
          : "flex flex-col  items-center gap-2 mb-8 bg-slate-100"
      }
    >
      <motion.h2
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 text-center text-red-600"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="max-w-[600px]  text-center px-4"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default TitleWithDescriptionAnimation;
