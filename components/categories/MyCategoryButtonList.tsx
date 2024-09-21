"use client";
import React, { ReactElement, useState } from "react";
import { Prisma } from "@prisma/client";
import ExerciseList from "../exercices/components/ExerciseList";
import SwiperNavButtons from "../SwiperNavButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import MobileExercisesGroup from "../MobileExercisesGroup";

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
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full h-full  bg-primary-300 mt-[124px]  " id={id}>
      {/*mobile*/}
      <div className="flex w-full h-[700px] flex-col mty-2 lg:mt-0">
        <div
          className="flex flex-col h-full gap-4 py-4 my-4  items-center overflow-x-scroll overflow-y-scroll  
          lg:overflow-x-hidden [&::-webkit-scrollbar]:hidden lg:justify-center 
            lg:flex-row lg:bg-primary-200 lg:p-4 lg:h-full lg:hidden
          "
        >
          {exercicesAndComponent.map((category, index) => {
            return (
              <MobileExercisesGroup
                img={category.img}
                categoryName={category.name}
                handleComponentClick={() => setComponent(category.component!)}
                component={category.component!}
              />
            );
          })}
        </div>
        <div className="lg:flex w-full h-[700px] hidden  flex-col mty-2 lg:mt-0">
          {/*Desktop*/}
          <Swiper className="h-full w-[640px] mt-4 relative  ">
            {exercicesAndComponent.map((category, index) => {
              return (
                <SwiperSlide>
                  <MobileExercisesGroup
                    img={category.img}
                    categoryName={category.name}
                    handleComponentClick={() =>
                      setComponent(category.component!)
                    }
                    component={category.component!}
                  />
                </SwiperSlide>
              );
            })}
            <SwiperNavButtons
              containerStyles={`absolute top-[180px]  left-60 h-[30px] w-[140px] hidden ${
                openModal ? "lg:hidden" : "lg:flex"
              }  
         z-10 flex justify-between `}
              btnStyles="border border-accent text-white w-[56px] h-[56px] rounded-full flex 
        justify-center items-center hover:bg-accent transition-all duration-300"
              iconStyles="text-2xl"
            />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MyCategoryButtonsLIst;
