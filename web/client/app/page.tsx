import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <Hero />
      <Hero />
    </div>
  );
}
