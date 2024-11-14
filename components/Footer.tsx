"use client";
import Image from "next/image";
import Link from "next/link";
import { fadeIn } from "@/lib/variants";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
} from "react-icons/fa";

import CustomButton from "./CustomButton";
import { motion } from "framer-motion";

interface FooterProps {
  className?: string;
}
// Variantes de animação
const footerContainerVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      duration: 0.5,
      ease: "linear",
    },
  },
};

const footerItem = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
};

const Footer = ({ className }: FooterProps) => {
  return (
    <motion.footer
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.2 }}
      className={
        className ? `${className} bg-primary-200 pt-24` : "bg-primary-200 pt-24"
      }
      id="contato"
    >
      <div className="container mx-auto pb-24">
        <motion.div
          variants={footerContainerVariant}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          className="text-white grid grid-cols-1 xl:grid-cols-4 gap-y-12"
        >
          {/* Informações */}
          <motion.div variants={footerItem} className="flex flex-col gap-4">
            <Link href="#">
              <Image
                src={"/assets/img/logo.png"}
                width={117}
                height={55}
                alt="Logo"
              />
            </Link>
            <p className="max-w-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              porro iusto sed ipsa ratione enim?
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <FaMapMarkerAlt className="text-xl text-accent" />
                <span>Lincoln Park Chicago, Illinois</span>
              </li>
              <li>
                <FaPhoneAlt className="text-xl text-accent" />
                <span>(11) 93486 -7766</span>
              </li>
              <li>
                <Link className="flex items-center gap-4" href="#">
                  <FaEnvelope className="text-xl text-accent" />
                  <span>biduzao.bidu21@gmail.com</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          {/* Blog */}
          <motion.div variants={footerItem} className="">
            <h4 className="h4 text-accent mb-4">Posts Recentes no Blog</h4>
            {/* Post */}
            <div
              className="border-b border-dotted border-gray-400 flex flex-col
            gap-3 pb-3 mb-4"
            >
              <Link className="hover:text-accent transition-all" href="#">
                <h5 className="h5 leading-snug">
                  Como se manter motivado para todos os exercícios
                </h5>
                <p className="text-gray-400 text-[12px] tracking-[3px] uppercase">
                  22 de agosto de 2024
                </p>
              </Link>
            </div>
            {/* Post */}
            <div
              className="border-b border-dotted border-gray-400 flex flex-col
            gap-3 pb-3 mb-4"
            >
              <Link className="hover:text-accent transition-all" href="#">
                <h5 className="h5 leading-snug">
                  Como se manter motivado para todos os exercícios
                </h5>
                <p className="text-gray-400 text-[12px] tracking-[3px] uppercase">
                  22 de agosto de 2024
                </p>
              </Link>
            </div>
            {/* Post */}
            <div className="flex flex-col gap-3 pb-3 mb-4">
              <Link className="hover:text-accent transition-all" href="#">
                <h5 className="h5 leading-snug">
                  Como se manter motivado para todos os exercícios
                </h5>
                <p className="text-gray-400 text-[12px] tracking-[3px] uppercase">
                  22 de agosto de 2024
                </p>
              </Link>
            </div>
          </motion.div>
          {/* Galeria */}
          <motion.div variants={footerItem}>
            <h4 className="h4 text-accent mb-4">Galeria</h4>
            {/* Imagens da galeria */}
            <div className="flex flex-wrap gap-2">
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/david.jpg"}
                  width={100}
                  height={100}
                  alt="david trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/matt.jpg"}
                  width={100}
                  height={100}
                  alt="matt trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/rosy.jpg"}
                  width={100}
                  height={100}
                  alt="rosy trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/david.jpg"}
                  width={100}
                  height={100}
                  alt="david trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/sofia.jpg"}
                  width={100}
                  height={100}
                  alt="sofia trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/rosy.jpg"}
                  width={100}
                  height={100}
                  alt="rosy trainer"
                />
              </Link>
              <Link href="#">
                <Image
                  src={"/assets/img/trainers/david.jpg"}
                  width={100}
                  height={100}
                  alt="david trainer"
                />
              </Link>
            </div>
          </motion.div>
          {/* Newsletter */}
          <motion.div variants={footerItem} className="">
            <h4 className="h4 text-accent mb-4">Newsletter</h4>
            <div className="flex flex-col gap-4">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laboriosam voluptatibus quos adipisci.
              </p>
              <form className="flex items-center">
                <input
                  type="text"
                  placeholder="Seu endereço de email"
                  className="h-[50px] px-4 text-primary-300"
                />
                <CustomButton containerStyles="h-[50px] px-8" text="Enviar" />
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Direitos autorais */}
      <div className="text-white border-t border-white/20 py-12">
        <div className="container mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            <span>&copy; Direitos Autorais 2024 Fitphysique</span>
            <ul className="flex gap-4 text-xl">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-accent transition-all"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-accent transition-all"
                >
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-accent transition-all"
                >
                  <FaYoutube />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
