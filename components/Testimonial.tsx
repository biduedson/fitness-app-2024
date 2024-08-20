"use client";

import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

//import swipert components
import { Swiper, SwiperSlide } from "swiper/react";

//import required modules'
import { Pagination } from "swiper/modules";

//impoert swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonialData = [
  {
    img: "/assets/img/testimonial/lucy.jpg",
    message:
      "Ótimos equipamentos e equipe motivadora. Treinar aqui é um prazer!",
    name: "lucy Anthony",
  },
  {
    img: "/assets/img/testimonial/michael.jpg",
    message:
      "Ambiente excelente e aulas dinâmicas. Os instrutores são muito atenciosos.",
    name: "Michal Smith",
  },
  {
    img: "/assets/img/testimonial/maria.jpg",
    message:
      "A academia é bem equipada e limpa. Meus resultados estão melhorando!",
    name: "Maria Garcia",
  },
  {
    img: "/assets/img/testimonial/lucy.jpg",
    message:
      "Instrutores dedicados e resultados incríveis. Estou muito satisfeita!",
    name: "lucy Anthony",
  },
  {
    img: "/assets/img/testimonial/michael.jpg",
    message:
      "Ambiente acolhedor e instalações de qualidade. Me sinto bem a cada treino.",
    name: "Michal Smith",
  },
  {
    img: "/assets/img/testimonial/maria.jpg",
    message:
      "Ótimo suporte e desafios bem equilibrados. Estou alcançando meus objetivos!",
    name: "Maria Garcia",
  },
];

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/variants";

const Testimonial = () => {
  return (
    <section className="py-12 xl:py-28" id="testimonial">
      <div className="container mx-auto">
        <motion.h2
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="h2 text-center"
        >
          Our Testimonial
        </motion.h2>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Swiper
            className="h-[320px]"
            slidesPerView={1}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {testimonialData.map((person, index) => {
              return (
                <SwiperSlide key={index} className="h-full">
                  <div
                    className="flex flex-col justify-center items-center gap-6
                  text-center h-full"
                  >
                    <Image
                      src={person.img}
                      width={90}
                      height={90}
                      alt={person.name}
                      className="rounded-full border-2 border-accent"
                    />

                    <div className="flex flex-col justify-center items-center">
                      <FaQuoteLeft className="text-2xl text-gray-300" />
                      <p className="max-w-[380px] mb-4">{person.message}</p>
                      <span className="text-2xl text-accent">
                        {person.name}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
