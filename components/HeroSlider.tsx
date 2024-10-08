"use client";

//import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/navigation";

//components
import CustomButton from "./CustomButton";
import SwiperNavButtons from "./SwiperNavButtons";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";
import { Link as ScrollLink } from "react-scroll";

const HeroSlider = () => {
  return (
    <Swiper className="h-full">
      <SwiperSlide>
        <div className=" h-full flex justify-end pt-48">
          <div className="flex flex-col items-center lg:items-start lg:max-w-[720px]">
            <motion.h1
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="h1 text-center lg:text-left mb-2 "
            >
              <span className="text-accent ">Superação diária,</span> resultados
              duradouros.
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="text-white italic text-center lg:text-left mb-4"
            >
              Superação diária é o combustível que transforma desafios em
              conquistas extraordinárias.
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ScrollLink to="prices" smooth offset={-40}>
                <CustomButton
                  text="escolha seu plano"
                  containerStyles="w-[196px] h-[62px]"
                />
              </ScrollLink>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" h-full flex justify-end pt-48">
          <div className="flex flex-col items-center lg:items-start lg:max-w-[700px]">
            <motion.h1
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="h1 text-center lg:text-left mb-2"
            >
              <span className="text-accent">Dedicação que</span> gera
              resultados.
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="text-white italic text-center lg:text-left mb-4"
            >
              A disciplina que você cultiva no treino reflete em todas as áreas
              da sua vida.
            </motion.p>
            <motion.div
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.2 }}
              className="mb-4"
            >
              <ScrollLink to="prices" smooth offset={-40}>
                <CustomButton
                  text="escolha seu plano"
                  containerStyles="w-[196px] h-[62px]"
                />
              </ScrollLink>
            </motion.div>
          </div>
        </div>
      </SwiperSlide>

      {/* swipper nav buttons*/}

      <SwiperNavButtons
        containerStyles="absolute bottom-2 lg:bottom-0 right-0 h-[130px] w-full
        lg:w-[700px] z-50 flex justify-center lg:justify-start gap-1 "
        btnStyles="border border-accent text-white w-[56px] h-[56px] flex 
        justify-center items-center hover:bg-accent transition-all duration-300"
        iconStyles="text-2xl"
      />
    </Swiper>
  );
};

export default HeroSlider;
