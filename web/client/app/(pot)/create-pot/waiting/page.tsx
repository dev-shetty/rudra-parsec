"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, useInView } from "framer-motion";
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const potCode = searchParams.get("pot_code");
  const ref = useRef(null);
  const isInView = useInView(ref) as boolean;
  const { toast } = useToast();

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  };

  const handleCopyId = () => {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = potCode ?? "";
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toast({
      title: "ID Copied",
      variant: "success",
    });
  };

  return (
    <motion.div
      className="container bg-black relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
      <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS}>
        <div className="lg:p-8">
          <div className="fixed top-0 left-0 m-5 z-50">
            <Link href="/create-pot">
              <Button variant={"ghost"}>Back</Button>
            </Link>
          </div>
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div className="max-w-7xl flex flex-col gap-5">
              <h1 className="font-semibold text-3xl">POT Created!</h1>
              {/* Display the generated unique ID */}

              <div className="flex relative items-center">
                <div className="py-2 min-h-10 px-3 w-full border border-input rounded-md">
                  {potCode}
                </div>
                <Button
                  variant={"ghost"}
                  onClick={handleCopyId}
                  className="w-10 p-3 absolute right-0"
                >
                  <Copy className="w-10 h-10" />
                </Button>
              </div>

              <p className="text-sm text-primary/50">
                Share the POT ID to add other members
              </p>

              <Link href="/pot/dashboard" className="flex gap-5">
                <Button className="w-full">Proceed to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.h1>
      <div className="relative hidden h-full bg-black flex-col text-white lg:flex">
        <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
          <Image
            quality={100}
            priority
            src="/pot.png"
            className="relative bg-black object-cover w-full h-full z-20"
            width={500}
            height={500}
            alt="login-image"
          ></Image>
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Page;
