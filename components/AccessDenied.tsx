"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface AccessDeniedProps {
  message: string;
}
const AccessDenied = ({ message }: AccessDeniedProps) => {
  const router = useRouter();
  return (
    <section
      className="w-full flex flex-col h-[100vh] justify-center items-center bg-primary-300 px-4 lg:px-0"
      id="exercises"
    >
      <h4 className="text-white text-center uppercase text-xl">{message}</h4>
      <Button
        className="my-4 hover:bg-red-600"
        onClick={() => router.push("/")}
      >
        Voltao ao início
      </Button>
    </section>
  );
};

export default AccessDenied;
