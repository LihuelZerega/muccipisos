"use client";
import { motion } from "framer-motion";
import LogoBlanco from "@/images/logo-blanco.png";
import HeroHome from "@/images/hero-home.png";
import HeroHomeMobile from "@/images/hero-home-mobile.png";

const Hero = () => {
  return (
    <div className="h-[80vh] md:h-[90vh] w-full relative overflow-hidden">
      <img src={HeroHome.src} alt="" className="hidden lg:block object-cover" />
      <img
        src={HeroHomeMobile.src}
        alt=""
        className="block lg:hidden object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="hs-carousel relative overflow-hidden w-full h-[36rem] md:h-[calc(100vh-106px)]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mt-auto max-w-5xl mx-auto"
          >
            <motion.img src={LogoBlanco.src} alt="Banner Image" className="mx-auto h-36 w-36 mb-8 mt-0 lg:mt-12 2xl:mt-40 " />
            <motion.h1
              className="text-white text-4xl md:text-5xl pb-4 font-poppins font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              EMBELLECÉ TUS ESPACIOS CON NUESTRAS SOLUCIONES EN PISOS
            </motion.h1>

            <motion.span
              className="text-base md:text-lg pb-4 font-poppins font-normal text-neutral-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Transformamos tus superficies en ambientes estéticamente agradables y funcionales a tus necesidades
            </motion.span>

            <div className="mt-4 flex flex-col md:flex-row items-center space-x-4 mx-auto justify-center">
              <motion.a
                whileHover="hover"
                href="#servicios"
                className="bg-mucci-marron hover:bg-yellow-950 text-white font-poppins font-normal px-3.5 py-2.5 text-center rounded-md transition delay-50 duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Nuestros servicios
              </motion.a>

              <motion.a
                whileHover="hover"
                href="https://wa.me/5491124609514"
                className="py-2 pr-3 text-white flex items-center transition delay-50 duration-300 ease-in-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Contactanos!
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
