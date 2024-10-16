import About from "@/components/About";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import Classes from "@/components/Classes";
import Hero from "@/components/Hero";
import Membership from "@/components/Membership";
import Team from "@/components/Team";
import Testimonial from "@/components/Testimonial";
import { db } from "./_lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
export default async function Home() {
  return (
    <main>
      <Header />
      <Hero />

      <About />
      <Classes />
      <Team />
      <Membership />
      <Testimonial />
      <Blog />
      <Brands />
      <Login />

      {/*temporary div*/}
      {/*<div className='h-[3000px]'></div>*/}
      <Footer />
    </main>
  );
}
