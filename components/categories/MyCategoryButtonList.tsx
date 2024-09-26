"use client";
import React, { ReactElement, useState } from "react";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";
import SwiperNavButtons from "../SwiperNavButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import MobileExercisesGroup from "../MobileExercisesGroup";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import MyCategoryButton from "./MyCategoryButton";

interface CategoryButtonListProps {
  id: string;
  categoryAndMyExercises: Prisma.ExerciseCategoryGetPayload<{
    include: {
      exercises: {
        include: {
          category: true;
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true;
                };
              };
            };
          };
        };
      };
    };
  }>[];
}

const MyCategoryButtonsLIst = ({
  id,
  categoryAndMyExercises,
}: CategoryButtonListProps) => {
  const [component, setComponent] = useState<ReactElement>(<></>);
  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  let exercicesAndComponent: {
    name: string;
    img: string;
    component: ReactElement;
  }[] = [];

  categoryAndMyExercises.map((category) => {
    exercicesAndComponent.push({
      img: category.imageUrl!,
      name: category.name,
      component: category.exercises.length ? (
        <ExerciseList exercises={category.exercises} key={category.id} />
      ) : (
        <>
          <div
            className="  flex flex-col w-full justify-center items-center
         px-4  mt-10  "
          >
            <motion.h2
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="h2 text-center lg:text-left my-4 bg "
            >
              <span className="text-white ">
                Não há exercícios cadastrados.
              </span>
            </motion.h2>
          </div>
        </>
      ),
    });
  });
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full h-full  bg-primary-300 mt-[64px] " id={id}>
      <motion.h2
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h2 text-center mb-8 text-white"
      >
        Meu exercícios
      </motion.h2>
      <div
        className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-24 w-full h-full gap-4 py-4 my-4  
                    items-center  overflow-y-scroll  
                    overflow-x-hidden [&::-webkit-scrollbar]:hidden
          "
      >
        {exercicesAndComponent.map((category, index) => {
          return (
            <MyCategoryButton
              categoryName={category.name}
              component={category.component}
              img={category.img}
            />
          );
        })}
      </div>
      {/*mobile*/}
    </div>
  );
};

export default MyCategoryButtonsLIst;
