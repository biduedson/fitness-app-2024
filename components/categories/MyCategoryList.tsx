"use client";
import React, { ReactElement, useState } from "react";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import Image from "next/image";
import CategoryItem from "./CategoryItem";

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
    <div className="w-full h-full  bg-black_texture " id={id}>
      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className=" relative w-full  h-[200px] sm:h-[400px]  py-4  lg:hidden rounded-b-xl clip-custom-bottom"
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
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 flex flex-col   w-[350px] sm:w-[380px] sm:text-[40px]
             text-center mb-8 text-accent le leading-[1.1] mt-4 border-white border-y-[1px] "
        >
          <span className="text-[50px] sm:text-[70px] mb-2">
            Meus exercícios
          </span>
          <span className="text-[30px] sm:text-[40px] mb-2">favoritos</span>
        </motion.h2>
      </div>
      <div
        className="grid grid-cols-3  gap-3 lg:flexx lg:items-centerr py-4 px-4 
          pt-8 lg:justify-betweenn lg:hidden
          "
      >
        {exercicesAndComponent.map((category, index) => {
          return (
            <div className="w-full h-full flex items-center justify-center">
              <CategoryItem
                categoryName={category.name}
                component={category.component}
                img={category.img}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCategoryLIst;
