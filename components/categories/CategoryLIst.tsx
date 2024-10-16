"use client";
import React, { ReactElement, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

//components
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import MobileExercisesGroup from "../MobileExercisesGroup";
import SwiperNavCategoryButtons from "../SwiperNavCategoryButtons";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  id: string;

  categoryAndExercises: Prisma.ExerciseCategoryGetPayload<{
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

const CategoryLIst = ({ id, categoryAndExercises }: CategoryListProps) => {
  const [component, setComponent] = useState<ReactElement>(<></>);
  const [closeBtnSlider, setCloseBtnSlider] = useState(false);
  let exercicesAndComponent: {
    name: string;
    img: string;
    component: ReactElement;
  }[] = [];

  categoryAndExercises.map((category) => {
    exercicesAndComponent.push({
      img: category.imageUrl!,
      name: category.name,
      component: category.exercises.length ? (
        <ExerciseList exercises={category.exercises} key={category.id} />
      ) : (
        <>
          <div
            className="  flex flex-col w-full justify-center items-center
         px-4  mt-10  lg:bg-primary-300  "
          >
            <h5
              className=" w-full text-center text-primary-300
            rounded-lg lg:text-white  bg-slate-100"
            >
              não ha exercico cadastrado nesta categoria
            </h5>
          </div>
        </>
      ),
    });
  });

  const handleComponentClick = (component: ReactElement) => {
    setComponent(component);
  };
  return (
    <div className="w-full h-full bg-black_texture bg-cover ">
      {/*mobile*/}
      <div className="flex w-full   flex-col mb-2 lg:mt-0">
        <motion.div
          variants={fadeIn("down", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className=" relative w-full  h-[200px] sm:h-[300px]  py-4  lg:hidden rounded-b-xl clip-custom-bottom"
        >
          <Image
            src="/assets/img/bannerExercisePage.png"
            alt="banner"
            fill
            className="absolute object-cover rounded-b-[]"
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
            <span className="text-[50px] sm:text-[70px] mt-2">Guia</span>
            <span className="text-[30px] sm:text-[40px] mb-2">
              de exercícios
            </span>
          </motion.h2>
        </div>
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-3  gap-3  lg:items-centerr py-4 px-4 
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
        </motion.div>

        <div className="  lg:flex w-full h-[700px] hidden flex-col my-2   lg:mt-0">
          {/*Desktop*/}
          <Swiper className="h-full w-[1024px] relative mt-[124px]  ">
            {exercicesAndComponent.map((category, index) => {
              return (
                <SwiperSlide key={index}>
                  <MobileExercisesGroup
                    img={category.img}
                    categoryName={category.name}
                    handleComponentClick={() => {
                      setComponent(category.component!);
                    }}
                    component={category.component!}
                  />
                </SwiperSlide>
              );
            })}
            <SwiperNavCategoryButtons
              quantitySlides={exercicesAndComponent}
              containerStyles={`absolute flex items-center top-[55%]  left-[14%] h-[30px] w-[auto] gap-2                    
                 z-20 flex justify-between  `}
              btnStyles="border border-accent text-white w-[66px] h-[66px] rounded-full flex 
                 justify-center items-center hover:bg-accent transition-all duration-300"
              iconStyles="text-2xl"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CategoryLIst;
