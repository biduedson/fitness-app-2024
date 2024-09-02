"use client";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const ExerciseDescription = () => {
  const router = useRouter();
  const { data, status } = useSession();
  if (!data?.user.student) {
    router.push("/");
  }
  return (
    <div className="h-[1000px] bg-primary-300 w-full flex items-center justify-center">
      <h2 className="h2 text-white f">ExerciseDescription</h2>
    </div>
  );
};

export default ExerciseDescription;
