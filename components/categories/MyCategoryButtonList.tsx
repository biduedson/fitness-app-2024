"use client";
import React, { ReactElement, useState } from "react";
import MyCategoryButton from "./MyCategoryButton";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";

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
  return (
    <div className="w-full  bg-primary-300  " id={id}>
      <div className="flex w-full h-[700px] lg:flex-row flex-col  lg:mt-0">
        <div
          className=" flex flex-col gap-4 my-8 items-center overflow-x-scroll overflow-y-scroll  
          lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden lg:justify-center
          lg:bg-primary-200 lg:p-4 lg:h-full 
          "
        >
          {exercicesAndComponent.map((category, index) => {
            return (
              <MyCategoryButton
                key={index}
                categoryName={category.name}
                img={category.img}
                handleComponentClick={() => {
                  setComponent(category.component!);
                  handleComponentClick(category.component!);
                }}
                component={category.component!}
              />
            );
          })}
        </div>
      </div>
      {component}
    </div>
  );
};

export default MyCategoryButtonsLIst;
