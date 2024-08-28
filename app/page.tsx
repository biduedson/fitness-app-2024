import About from "@/components/About";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import Classes from "@/components/Classes";
import Hero from "@/components/Hero";
import Membership from "@/components/Membership";
import Team from "@/components/Team";
import Testimonial from "@/components/Testimonial";
import Exercices from "@/components/Exercices";
import { db } from "./_lib/prisma";
import MyExercises from "@/components/MyExercises";

export default async function Home() {
  const categories = await db.exerciseCategory.findMany({
    include: {
      exercises: {
        include: {
          category: true,
          favoriteByStudents: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const favoriteExercises = await db.favoriteExercise.findMany({
    include: {
      student: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <main>
      <Hero />
      <About />
      <Classes />
      <Team />
      <Membership />
      <Testimonial />
      <MyExercises />
      <Blog />
      <Brands />
      <Exercices categoryExercises={categories} />
      {/*temporary div*/}
      {/*<div className='h-[3000px]'></div>*/}
    </main>
  );
}
