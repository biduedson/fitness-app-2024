"use client";
import { useState } from "react";
import Image from "next/image";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { aerobicExercises } from "../_constants/constants";
import NavbarUser from "@/components/NavBarUser";
import Footer from "@/components/Footer";
import UserProfile from "@/components/profile/UserProfile";

export default function AerobicExercisesPage() {
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
    <>
      <div className="fixed z-50 w-full h-auto hidden lg:flex ">
        <NavbarUser />
      </div>

      <div className="relative flex flex-col items-center py-8 bg-gray-100 min-h-screen">
        <div className=" flex w-full items-center justify-between px-4 lg:static p-2 lg:p-0  fixed top-0 z-50 bg-gray-100  shadow-slate-600 shadow-lg lg:z-10 lg:shadow-transparent ">
          <div className="lg:hidden">
            <UserProfile />
          </div>

          <div className="w-full flex items-center justify-center">
            <h1 className="text-xl sm:text-4xl text-center font-bold text-red-600 lg:mt-24 py-4">
              Guia de Exercícios Aeróbicos
            </h1>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 Xxl:grid-cols-4 mt-20 lg:mt-0  max-w-5xl Xxl:max-w-full px-4">
          {aerobicExercises.map((exercise, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg shadow-slate-500 overflow-hidden relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
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
                    className={
                      favorite[index] ? "text-red-600" : "text-gray-300"
                    }
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
                <p className="text-gray-600 mb-4">{exercise.description}</p>

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
      </div>
      {/* Footer Section */}
      <Footer />
    </>
  );
}
