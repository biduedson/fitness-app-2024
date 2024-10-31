"use client";
import React, { ReactElement, useState } from "react";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import MyCategoryButton from "./MyCategoryButton";
import MyExerciseList from "../exercices/components/MyExescisesList";

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

const MyCategoryLIst = ({
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
        <MyExerciseList exercises={category.exercises} key={category.id} />
      ) : (
        <>
          <div
            className="  flex flex-col w-full  justify-center items-center
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
    <div className="w-full h-full  bg-black_texture " id={id}>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" relative w-full  h-[200px] sm:h-[300px]  py-4  lg:hidden rounded-b-xl clip-custom-bottom"
      >
        <Image
          src="/assets/img/bannerExercisePage.png"
          alt="banner"
          fill
          className="absolute object-cover "
        />
      </motion.div>
      <div className="flex items-center justify-center w-full">
        <motion.h2
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 flex flex-col   w-[350px] sm:w-[380px] sm:text-[40px]
             text-center mb-8 text-accent le leading-[1.1] mt-4 border-white border-y-[1px] "
        >
          <span className="text-[40px] sm:text-[70px] mb-2">exercícios</span>
          <span className="text-[20px] sm:text-[40px] mb-2">favoritos</span>
        </motion.h2>
      </div>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="h-[400px] grid grid-cols-3 gap-3 overflow-y-scroll  lg:items-centerr p-4 
          lg:justify-betweenn lg:hidden 
          "
      >
        {exercicesAndComponent.map((category, index) => {
          return (
            <motion.div
              variants={fadeIn("up", 0.2 * index)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="w-full h-full flex items-center justify-center "
            >
              <MyCategoryButton
                categoryName={category.name}
                component={category.component}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MyCategoryLIst;
