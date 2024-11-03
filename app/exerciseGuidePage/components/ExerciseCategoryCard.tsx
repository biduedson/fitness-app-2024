// src/components/ExerciseCategoryCard.tsx
"use client";

import { useRouter } from "next/navigation";

interface ExerciseCategoryCardProps {
  categoryName: string;
}

const ExerciseCategoryCard = ({ categoryName }: ExerciseCategoryCardProps) => {
  const router = useRouter();
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg p-6 text-center 
    transition-transform transform hover:scale-105 hover:bg-accent  cursor-pointer"
      onClick={() => router.push(`/categoryExercisesPage/${categoryName}`)}
    >
      <h3 className="text-xl font-bold text-white">{categoryName}</h3>
    </div>
  );
};

export default ExerciseCategoryCard;