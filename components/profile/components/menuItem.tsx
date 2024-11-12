// components/MenuItem.tsx
"use client";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { GoArrowRight } from "react-icons/go";

interface MenuItemProps {
  label: string;
  iconSrc?: string;
  iconComponent?: React.ReactNode;
  onclick?: () => void;
  logout?: () => Promise<void>;
}

const MenuItem = ({
  label,
  iconSrc,
  iconComponent,

  onclick,
  logout,
}: MenuItemProps) => {
  return (
    <div
      className="w-full p-1 cursor-pointer lg:hover:animate-pulse"
      onClick={onclick}
    >
      <div className="flex items-center justify-between w-full h-[60px] rounded-md p-2 hover:bg-slate-100  ">
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] bg-slate-300 flex items-center justify-center rounded-full">
            {iconSrc ? (
              <div className="relative w-[28px] h-[28px]">
                <Image
                  src={iconSrc}
                  alt={`${label} Icon`}
                  fill
                  className="absolute object-cover"
                />
              </div>
            ) : (
              iconComponent
            )}
          </div>
          <p>{label}</p>
        </div>
        <GoArrowRight className="flex justify-self-end text-2xl" />
      </div>
    </div>
  );
};

export default MenuItem;
