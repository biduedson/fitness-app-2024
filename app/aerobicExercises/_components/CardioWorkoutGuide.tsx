import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";

interface CardioWorkoutGuideProps {
  aerobicExercises: {
    title: string;
    description: string;
    imageUrl: string;
    details: {
      level: string;
      duration: string;
      intensity: string;
    }[];
  }[];
}

const CardioWorkoutGuide = ({ aerobicExercises }: CardioWorkoutGuideProps) => {
  const [favorite, setFavorite] = useState<boolean[]>(
    new Array(aerobicExercises.length).fill(false)
  );

  const handleFavoriteClick = (index: number) => {
    setFavorite((prev) => {
      const newFav = [...prev];
      newFav[index] = !newFav[index];
      return newFav;
    });
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4   Xxl:grid-cols-4 mt-8 lg:mt-0  max-w-6xl Xxl:max-w-[1400px]  Xxl:p-12 px-4 py-8 lg:overflow-y-hidden [&::-webkit-scrollbar]:hidden">
      {aerobicExercises.map((exercise, index) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ timeConstant: 0.2 }}
          key={index}
          className="bg-white rounded-lg shadow-lg shadow-slate-500 overflow-hidden relative lg:max-h-[700px] 
         "
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="relative w-full h-40">
            <Image
              src={exercise.imageUrl}
              alt={exercise.title}
              layout="fill"
              className="object-contain mt-4"
            />
            <button
              onClick={() => handleFavoriteClick(index)}
              className="absolute top-2 right-2 text-2xl text-white"
            >
              <FaHeart
                className={favorite[index] ? "text-red-600" : "text-gray-300"}
              />
            </button>
            <button className="absolute top-2 right-10 text-2xl text-white">
              <FaShareAlt className="text-gray-300" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              {exercise.title}
            </h2>
            <p className="text-gray-600 mb-4 xl:min-h-[130px]">
              {exercise.description}
            </p>

            <div className="space-y-2">
              {exercise.details.map((detail, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-md ${
                    detail.level === "Iniciante"
                      ? "bg-blue-100 text-blue-600"
                      : detail.level === "Intermediário"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <h4 className="font-semibold">{detail.level}</h4>
                  <p>Duração: {detail.duration}</p>
                  <p>Intensidade: {detail.intensity}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardioWorkoutGuide;
