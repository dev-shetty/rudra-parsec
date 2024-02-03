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
    <main className="hero flex px-8 justify-center items-center min-h-screen">
      <div className="mx-auto max-w-5xl">
        {/* <div className="mb-10 flex justify-center">
          <div className="relative rounded-full px-5 py-1 bg-foreground/10 text-sm leading-6 text-primary ring-1 ring-border">
            {"View public profiles ->"}
          </div>
        </div> */}
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
            <div className="text-6xl sm:text-8xl font-semibold">
              <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                Emerge <span className="magicText">Financially</span> Fulfilled.
              </motion.h1>
            </div>
            {/* <div className="mt-3 md:text-lg md:leading-8 leading-6 text-primary/50">
              <motion.p variants={FADE_DOWN_ANIMATION_VARIANTS}>
                Helping you make informed decisions for a brighter financial
                future.
              </motion.p>
            </div> */}
            {/* <div className="mt-5 flex items-center justify-center gap-x-6">
              <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <Link href="/login">
                  <Button>{"Get Started -> "}</Button>
                </Link>
              </motion.div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
