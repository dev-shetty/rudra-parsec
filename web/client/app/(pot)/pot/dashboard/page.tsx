"use client"
import { getUser } from "@/app/actions"
import Navbar from "@/components/Navbar"
import { Badge } from "@/components/ui/badge"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"

export const metadata = {
  title: "Pot Dashboard"
}

const page = () => {
  const [user, setUser] = useState<any>();
  const [pots, setPots] = useState<any[]>([]);
  const supabase = createClientComponentClient();

  const fetchUser = async () => {
    const user = await getUser();
    if (!user) redirect("/login");
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    getPots();
  }, [user]);

  async function getPots() {
    if (!user) return;
    const { data, error } = await supabase
      .from("pot")
      .select()
      .contains("members", [user.id]);

    console.log({ data, error });
    setPots(data!);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, #ffffff18, transparent)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = "#d1f2f900";
  };

  return (
    <div className="py-36 min-h-screen">
      <Navbar />
      <div className="font-semibold md:text-5xl text-4xl text-center mb-10">
        My Pots
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-5 max-w-7xl p-5">
        {pots ? (
          pots.map((pot) => (
            <Link
              href={`/pot/dashboard/${pot.pot_code}`}
              key={pot.id}
              className="relative w-80 min-h-96 overflow-hidden"
              style={{
                height: `calc(${pot.members.length * 30}px)`, // Adjust the factor (40px) as needed
              }}
            >
              <div className="absolute h-full inset-0 bg-gradient-to-br from-blue-500 via-[#f6cbc5] to-[#df8175] rounded-3xl p-1 z-5">
                <div className="bg-black w-full rounded-[1.25rem] h-full">
                  <div
                    className="rounded-2xl flex flex-col justify-center items-center p-5 h-full"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p className="flex mb-3">{pot.pot_code}</p>
                    <div className="flex items-center flex-col gap-1 mb-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11 5v3h2V5zM4.91 7.5L3.5 8.91l1.77 1.77l1.41-1.41zm14.18 0l-1.77 1.77l1.41 1.41l1.77-1.77zM4 12c0 2.86 1.5 5.5 4 6.93s5.5 1.43 8 0s4-4.07 4-6.93z"
                        />
                      </svg>
                      <div className="text-xl font-bold">{pot.purpose}</div>
                    </div>
                    <div className="flex justify-center items-center flex-wrap gap-2 text-lg mb-3">
                      <Badge className="text-xl">₹{pot.goal_amount}</Badge>
                    </div>
                    <div className="flex items-center flex-col gap-1 mt-1">
                      Months remaining: {pot.amount_paid / pot.total_members} /{" "}
                      {pot.total_members}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center text-center col-span-full">
            <p className="text-2xl text-center font-bold">No Pots Available!</p>
            <p>
              Create a{" "}
              <Link href="/create-pot" className="underline">
                Pot
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
