// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React from "react";
// import Background from "./background";
// const page = () => {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <Background />
//   <form className="max-w-7xl flex flex-col gap-5">
//     <div>
//       <Input placeholder="Purpose" type="text" className="w-96"></Input>
//     </div>
//     <div>
//       <Input placeholder="Creator" type="text" className="w-96"></Input>
//     </div>
//     <div>
//       <Input
//         placeholder="Number of members"
//         type="number"
//         className="w-96"
//       ></Input>
//     </div>
//     <div>
//       <Input
//         placeholder="Goal Ammount"
//         type="number"
//         className="w-96"
//       ></Input>
//     </div>
//     <div>
//       <Input
//         placeholder="Ammount per head"
//         type="number"
//         className="w-96"
//       ></Input>
//     </div>
//     <Button className="w-full">Create POT</Button>
//   </form>
//     </div>
//   );
// };

// export default page;

// import AuthForm from "@/components/auth-form";

// export default function Login({
//   searchParams,
// }: {
//   searchParams: { message: string };
// }) {
//   return (
//     <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
//       <AuthForm />
//     </div>
//   );
// }

"use client";
import { motion, useInView } from "framer-motion";
import AuthForm from "@/components/auth-form";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";
const page = () => {
  const [loading, isLoading] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };
  return (
    <motion.div
      className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex">
          <img
            // quality={100}
            // priority
            src="/pot.png"
            className="relative bg-black object-cover w-full h-full z-20"
            width={500}
            height={500}
            alt="login-image"
          ></img>
        </div>
      </motion.h1>
      <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS}>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <form className="max-w-7xl flex flex-col gap-5">
              <h1 className="font-semibold text-2xl">Create Pot</h1>
              <div>
                <Input
                  placeholder="Purpose"
                  type="text"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Input
                  placeholder="Creator"
                  type="text"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Input
                  placeholder="Number of members"
                  type="number"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Input
                  placeholder="Goal Ammount"
                  type="number"
                  className="w-full"
                ></Input>
              </div>
              <div>
                <Input
                  placeholder="Ammount per head"
                  type="number"
                  className="w-full"
                ></Input>
              </div>
              <Button className="w-full">Create POT</Button>
            </form>
          </div>
        </div>
      </motion.h1>
    </motion.div>
  );
};

export default page;
