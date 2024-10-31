import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";

interface IUserControllerPageHeaderProps {
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
}
const UserControllerPageHeader = ({ user }: IUserControllerPageHeaderProps) => {
  const router = useRouter();

  return (
    <motion.header
      variants={fadeIn("down", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className=" relative lg:bg-accent w-full h-[220px] "
    >
      <div
        className="absolute top-4 left-4 w-[50px] h-[50px] rounded-full  bg-white/80 z-10 flex items-center 
        justify-center text-[26px] text-accent font-bold"
        onClick={() => router.back()}
      >
        <MdArrowBackIos />
      </div>
      <Image
        src="/assets/img/bannerExercisePage.png"
        alt="banner"
        fill
        className="lg:hidden absolute object-cover "
        sizes="150px"
        priority // Adicione essa propriedade para priorizar o carregamento
      />
      <motion.div
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full flex  items-center"
      >
        <div className="absolute top-[140px] w-full flex flex-col items-center justify-center">
          <div className="relative w-[150px] h-[150px] ">
            <Image
              src={user?.image!}
              alt="User image"
              className="absolute rounded-full object-cover border-accent border-[4px] "
              fill
              sizes="(width: 150px)"
            />
          </div>
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="w-full flex items-center justify-center "
          >
            <div className="w-[250px] flex flex-col items-center">
              <p className=" text-[28px] lg:text-[18px] font-semibold text-accent ">
                {user?.name!}
              </p>
              <p className="text-[20px] lg:text-[12px] font-semibold text-white ">
                {user?.email!}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default UserControllerPageHeader;
