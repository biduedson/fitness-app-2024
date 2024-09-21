"use client";
import React, { ReactElement, useState } from "react";
import CategoryButton from "./CategoryButton";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";

//components
import CustomButton from "../CustomButton";
import SwiperNavButtons from "../SwiperNavButtons";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import MobileExercisesGroup from "../MobileExercisesGroup";
import SwiperNavCategoryButtons from "../SwiperNavCategoryButtons";

interface CategoryButtonListProps {
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

const CategoryButtonsLIst = ({
  id,
  categoryAndExercises,
}: CategoryButtonListProps) => {
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
    <div className="w-full h-full mt-[124px] ">
      {/*mobile*/}
      <div className="flex w-full h-[1700px]  flex-col my-2 lg:mt-0">
        <div
          className="grid grid-cols-2 gap-3 lg:flexx lg:items-centerr py-4 lg:justify-betweenn lg:hidden
          "
        >
          {exercicesAndComponent.map((category, index) => {
            return (
              <CategoryButton
                categoryName={category.name}
                component={category.component}
                img={category.img}
              />
            );
          })}
        </div>

        <div className=" relative w-full  h-[200px] sm:h-[35%]  py-4  lg:hidden">
          <Image
            src="/assets/img/Banner-sem-botao.png"
            alt="banner"
            fill
            className="absolute object-cover rounded-lg"
          />
        </div>

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

export default CategoryButtonsLIst;
