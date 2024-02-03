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
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <AuthForm mode="signin" />
    </div>
  );
};

export default page;
