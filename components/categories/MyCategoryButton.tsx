import React, { ReactElement } from "react";
import MobileExercisesGroup from "../MobileExercisesGroup";

interface CategoryButtonProps {
  img: string;
  categoryName: string;
  component: ReactElement;
  handleComponentClick: () => void;
}

const MyCategoryButton = ({
  img,
  categoryName,
  component,
  handleComponentClick,
}: CategoryButtonProps) => {
  return (
    <MobileExercisesGroup
      categoryName={categoryName}
      img={img}
      handleComponentClick={handleComponentClick}
      component={component}
    />
  );
};

export default MyCategoryButton;
