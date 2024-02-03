import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/ConnectSupabaseSteps";
// import SignUpUserSteps from "@/components/SignUpUserSteps";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Cards from "@/components/Home/Cards";
import Description from "@/components/Home/Description";
import Footer from "@/components/Home/Footer";


export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <Hero />
      <Description />
      <Cards />
      <Footer />
    </div>
  );
}
