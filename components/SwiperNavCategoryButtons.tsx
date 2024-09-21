"use client";

import { useSwiper } from "swiper/react";

import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { ReactElement } from "react";

const SwiperNavCategoryButtons = ({
  containerStyles,
  btnStyles,
  iconStyles,
  quantitySlides,
  onclick,
}: {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
  quantitySlides?: { name: string; img: string; component: ReactElement }[];
  onclick?: () => void;
}) => {
  const swiper = useSwiper();
  return (
    <div className={`${containerStyles} `}>
      <button className={`${btnStyles}`} onClick={() => swiper.slidePrev()}>
        <PiCaretLeftBold className={`${iconStyles}`} />
      </button>
      {quantitySlides?.length &&
        quantitySlides.map((slide, index) => {
          return (
            <div
              className="w-[60px] h-[60px] rounded-full flex items-center  text-center text-[10px] 
               text-white/20 transition-colors duration-300 hover:text-white hover:bg-accent/50
                hover:transition-transform hover:scale-110 cursor-pointer justify-center bg-accent/20 
                "
              key={index}
              onClick={() => swiper.slideTo(index)}
            >
              {slide.name}
            </div>
          );
        })}
      <button className={`${btnStyles}`} onClick={() => swiper.slideNext()}>
        <PiCaretRightBold className={`${iconStyles}`} />
      </button>
    </div>
  );
};

export default SwiperNavCategoryButtons;
