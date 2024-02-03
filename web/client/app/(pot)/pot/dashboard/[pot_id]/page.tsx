"use client"
import { motion, useInView } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"

const Page = () => {
  const [members, setMembers] = useState([
    { name: "Srajan", rupees: 5000, role: "Creator" },
    { name: "Deveesh", rupees: 5000 },
    // Add more members as needed
  ])

  const [totalAmount, setTotalAmount] = useState(10000)
  const [rupeesPerMonth, setRupeesPerMonth] = useState(10000)
  const [monthsRemaining, setMonthsRemaining] = useState(5)
  const [nextPerson, setNextPerson] = useState("Srajan Kumar")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(13)

  const ref = React.useRef(null)
  const isInView = useInView(ref) as boolean

  useEffect(() => {
    const timer = setTimeout(() => setProgress(25), 500)
    return () => clearTimeout(timer)
  }, [])

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  }

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
  }

  return (
    <motion.div
      className="container lg:my-0 my-20 relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0"
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
              <form className="max-w-7xl flex flex-col gap-5">
                <h1 className="font-semibold text-2xl">Members on Pot</h1>

                {members.map((member, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <span>{index + 1}.</span>
                    <div className="py-2 px-3 w-full">{member.name}</div>
                    <Badge className="flex gap-1" variant="outline">
                      {member.rupees} <div>₹</div>
                    </Badge>
                    {member.role && (
                      <Badge variant="default">{member.role}</Badge>
                    )}
                  </div>
                ))}

                <div className="py-2 md:mb-0 mb-5 px-3 w-full border border-input flex justify-center items-center rounded-md">
                  Total Amount: {totalAmount} ₹
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
              {monthsRemaining} / 5 months
            </div>
          </div>

          <div className="relative my-10 flex justify-center items-center">
            <Progress value={progress} className="absolute" />
            <span className="absolute font-bold text-[2.5rem]">Filled 25%</span>
          </div>

          <div className="lg:grid flex flex-col-reverse grid-cols-3 gap-5">
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
  )
}

export default Page
