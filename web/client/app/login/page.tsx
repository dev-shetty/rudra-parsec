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
  return (
    <div className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex">
        <img
          // quality={100}
          // priority
          src="/grad1.jpg"
          className="relative bg-black object-cover w-full h-full z-20"
          width={500}
          height={500}
          alt="login-image"
        ></img>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
          <AuthForm />
          {/* <UserAuthForm /> */}
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default page;
