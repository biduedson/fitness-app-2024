"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

function HomeButtom({ text }: { text: string }) {
  const route = useRouter();
  return (
    <div className=" w-full px-4 ">
      <button
        className="flex items-center justify-center gap-2 w-full h-[50px] z-50 rounded-lg bg-accent text-white mb-2 uppercase "
        onClick={() => route.push("/")}
      >
        <FaHome width={40} height={40} />
        {text}
      </button>
    </div>
  );
}

export default HomeButtom;
