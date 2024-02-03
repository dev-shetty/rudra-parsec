"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const Hero = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <main className="hero flex px-8 justify-center items-center mt-40 mb-10">
      <div className="absolute top-0 left-0 right-0">
        <div className="absolute left-50 top-50 -z-10 overflow-visible opacity-20">
          <div className="-z-10 h-[600px] md:w-[500px] rounded-full bg-white/20 mix-blend-multiply blur-[128px]" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.div
            initial="hidden"
            ref={ref}
            animate={isInView ? "show" : "hidden"}
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <div className="md:text-7xl text-5xl font-semibold">
                Finvest<span className="magicText">.</span>
              </div>
            </motion.h1>
            <div className="md:text-5xl text-3xl mt-5 font-semibold">
              <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                Emerge Financially<span className="magicText"> Fulfilled</span>.
              </motion.h1>
            </div>
            <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Link href="/login">
                <Button className="mt-10">Get Started</Button>
              </Link>{" "}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
