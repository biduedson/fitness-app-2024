import { Button } from "@/components/ui/button";
import React, { ReactElement } from "react";
import { FocusEvent } from "react";

interface LifestyleButtonsProps {
  dataComponents: {
    id: number;
    name: string;
    component: ReactElement;
  }[];
  setComponent: React.Dispatch<React.SetStateAction<ReactElement>>;
}

const LifestyleButtons = ({
  dataComponents,
  setComponent,
}: LifestyleButtonsProps) => {
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
    <div className="w-full px-6">
      <div className=" xl:hidden flex    gap-2  min-w-full p-6  bg-white rounded-lg shadow-lg shadow-slate-300 mb-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {dataComponents.map((data) => (
          <Button
            key={data.id}
            onClick={() => setComponent(data.component)}
            onFocus={(event) => scrollToView(event)}
            className={`bg-red-600 min-w-[160px] focus:bg-primary/90    focus:translate-y-1.5 active:-scale-y-50  transition-all ease-in-out text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 $`}
          >
            {data.name}
          </Button>
        ))}
      </div>
      <div className="hidden min-w-full  xl:flex gap-4 justify-center p-4 bg-white rounded-lg shadow-lg shadow-slate-300 mb-2">
        {dataComponents.map((data) => (
          <Button
            key={data.id}
            onClick={() => setComponent(data.component)}
            className=" bg-red-600 min-w-[180px] 
    focus:bg-primary/90 focus:scale-105 focus:duration-150 
    active:scale-110 active:duration-150 
    transition-transform ease-in-out 
    text-white font-bold text-[12px] py-2 px-4 rounded shadow-lg shadow-slate-600 "
          >
            {data.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LifestyleButtons;
