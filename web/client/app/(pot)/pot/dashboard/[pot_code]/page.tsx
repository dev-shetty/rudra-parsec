"use client";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { getUser } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Pot"
}

const Page = ({ params }: { params: { pot_code: string } }) => {
  const { pot_code } = params;

  const [pot, setPot] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [potMembers, setPotMembers] = useState<any[]>([]);

  const fetchUser = async () => {
    const _user = await getUser();
    if (!_user) redirect("/login");
    setUser(_user);
  };

  useEffect(() => {
    fetchUser();
    getPot();
  }, []);

  useEffect(() => {
    getMembers();
  }, [pot]);

  const supabase = createClientComponentClient();

  async function getPot() {
    const { data, error } = await supabase
      .from("pot")
      .select("*")
      .eq("pot_code", pot_code)
      .single();
    setPot(data);

    if (error) {
      redirect("/pot");
    }
  }

  async function getMembers() {
    if (!pot) return;
    const { data, error } = await supabase
      .from("user")
      .select()
      .in("auth_id", pot.members);

    setPotMembers(() => {
      return data?.map((user) => ({
        name: user.name,
        email: user.email,
        isCreator: pot.creator === user.auth_id,
      }))!;
    });
  }
  console.log({ pot, potMembers });

  const [rupeesPerMonth, setRupeesPerMonth] = useState(1000);
  const [potCode, setPotCode] = useState("");
  const [potPurpose, setPotPurpose] = useState("");
  const [monthsRemaining, setMonthsRemaining] = useState(5);
  const [totalMembers, setTotalMembers] = useState(5);
  const [nextPerson, setNextPerson] = useState("Srajan Kumar");
  const [goalAmount, setGoalAmount] = useState(10000);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    if (!pot) return;
    setRupeesPerMonth(pot.amount_per_head);
    setMonthsRemaining(Number(pot.amount_paid / pot.total_members));
    setTotalMembers(pot.total_members);
    setGoalAmount(pot.goal_amount);
    setProgress(50);
    setPotCode(pot.pot_code);
    setPotPurpose(pot.purpose);
  }, [pot]);

  useEffect(() => {
    if (!pot || !potMembers) return;
    setNextPerson(potMembers[0].name ?? "");
  }, [potMembers]);

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
    <div className="flex justify-center items-center min-h-[100dvh]">
      <Navbar />
      <motion.div
        className="container max-w-7xl w-full lg:my-0 my-20 relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
          <div className="relative h-full flex-col text-white flex">
            <div className="lg:p-8">
              <div className="mx-auto flex flex-col justify-center space-y-6 w-[500px]">
                <h1 className="text-3xl font-bold">
                  {potPurpose} - {potCode}
                </h1>
                <form className="max-w-7xl flex flex-col gap-5">
                  <h2 className="font-semibold text-2xl border-b pb-2 mt-8">
                    Members on Pot
                  </h2>

                  {potMembers.map((member, index) => (
                    <div className="flex items-center gap-3" key={index}>
                      <span>{index + 1}.</span>
                      <div className="py-2 px-3 w-full">{member.name}</div>
                      <Badge className="flex gap-1" variant="outline">
                        <div>₹{rupeesPerMonth}</div>
                      </Badge>
                      {member.isCreator && (
                        <Badge variant="default">Creator</Badge>
                      )}
                    </div>
                  ))}

                  <Link href={`/pot/join-pot/pot_code=${potCode}`}>
                    Add + {totalMembers - potMembers.length} members
                  </Link>

                  <div className="py-2 md:mb-0 mb-5 px-3 w-full border border-input flex justify-center items-center rounded-md">
                    Goal Amount: ₹{goalAmount}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.h1>
        <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS}>
          <div className="lg:p-8 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="py-2 px-3 w-full border border-input flex justify-center items-center rounded-md">
                ₹ {rupeesPerMonth} / month
              </div>
              <div className="py-2 bg-muted px-3 w-full border border-input flex justify-center items-center rounded-md">
                {monthsRemaining} / {totalMembers} months
              </div>
            </div>

            <div className="relative my-10 flex justify-center items-center">
              <Progress value={progress} className="absolute" />
              <span className="absolute font-bold text-[2.5rem]">
                Filled {progress}%
              </span>
            </div>

            <div className="lg:grid flex flex-col-reverse grid-cols-3">
              <div className="flex md:mb-0 mb-10 items-center border border-input rounded-md flex-col w-full text-xl justify-center font-semibold">
                <p>Next Payment</p>
                <span className="magicText">{nextPerson}</span>
              </div>
              <div className="flex col-span-2 flex-col w-full text-2xl justify-center items-center gap-1 font-semibold my-5">
                <p>Payment Due</p>
                <Calendar mode="single" selected={date} />
              </div>
            </div>
          </div>
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Page;
