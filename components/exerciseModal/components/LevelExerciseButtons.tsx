import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import { FocusEvent } from "react";

interface LevelExerciseButtonsProps {
  levels: { name: string; component: ReactElement }[];
  setComponent: React.Dispatch<React.SetStateAction<ReactElement>>;
}

const LevelExerciseButtons = ({
  setComponent,
  levels,
}: LevelExerciseButtonsProps) => {
  const scrollToView = (event: FocusEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // Evita rolar a página para baixo
        inline: "center", // Centraliza horizontalmente
      });
    }
  };
  return (
    <>
      <div className=" xl:hidden flex mb-4 max-w-full gap-2  items-center  justify-center p-4  bg-white rounded-lg shadow-lg shadow-slate-300 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {levels.map((level) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={level.name}
            onClick={() => setComponent(level.component)}
            onFocus={(event) => scrollToView(event)}
            className="bg-red-600 min-w-[100px] focus:bg-primary/90    focus:translate-y-1.5 active:-scale-y-50  transition-all ease-in-out text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 "
          >
            {level.name}
          </motion.button>
        ))}
      </div>
      <div className="hidden w-full  xl:flex gap-4 justify-center p-2 bg-white rounded-lg shadow-lg shadow-slate-300 mb-2">
        {levels.map((level) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={level.name}
            onClick={() => setComponent(level.component)}
            className=" bg-red-600 min-w-[120px] 
    focus:bg-primary/90   focus:shadow-black
    
    transition-transform ease-in-out 
    text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 "
          >
            {level.name}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default LevelExerciseButtons;
