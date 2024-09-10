"use client";
import React, { ReactElement, useState } from "react";
import CategoryButton from "./CategoryButton";
import "swiper/css";
import "swiper/css/navigation";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";

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
            className=" flex flex-col w-full justify-center items-center
         bg-slate-100 px-8  mt-10 rounded-lg lg:bg-primary-300  "
          >
            <h5 className="text-center text-primary-300 lg:text-white">
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
  const [openModeal, setOpemModal] = useState(false);
  return (
    <div className="w-full  bg-primary-300  " id={id}>
      <div className="flex w-full h-[700px] lg:flex-row flex-col mty-2 lg:mt-0">
        <div
          className="flex flex-col h-full gap-4 py-4 my-4  items-center overflow-x-scroll overflow-y-scroll  
          lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden lg:justify-center 
          lg:bg-primary-200 lg:p-4 lg:h-full
          "
        >
          {exercicesAndComponent.map((category, index) => {
            return (
              <CategoryButton
                img={category.img}
                categoryName={category.name}
                handleComponentClick={() => {
                  setComponent(category.component!);
                  // handleComponentClick(exercise.component!);
                }}
                component={category.component!}
              />
            );
          })}
        </div>

        {component}
      </div>
    </div>
  );
};

export default CategoryButtonsLIst;
