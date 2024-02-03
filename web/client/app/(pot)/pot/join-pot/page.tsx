"use client"

import { getUser } from "@/app/actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function JoinPot({
  searchParams,
}: {
  searchParams: { pot_code: string }
}) {
  const [pot, setPot] = useState<any>(null)
  const [potMembers, setPotMembers] = useState<any[]>([])
  const { pot_code } = searchParams

  const fetchUser = async () => {
    const user = await getUser()
    if (!user) redirect("/login")
  }

  useEffect(() => {
    fetchUser()
    getPot()
  }, [])

  const supabase = createClientComponentClient()

  async function getPot() {
    const { data, error } = await supabase
      .from("pot")
      .select("*")
      .eq("pot_code", pot_code)
      .single()
    setPot(data)

    // const creatorInfo = await supabase.auth.

    // console.log(creatorInfo)

    if (error) {
      redirect("/pot")
    }
  }

  console.log({ pot })

  return !pot ? (
    <div>Loading...</div>
  ) : (
    <main>
      <h1>Join Pot</h1>
      <p>Joining pot {pot_code}</p>
      <p>Amount per head: {pot.amount_per_head}</p>
      <p>Goal Amount: {pot.goal_amount}</p>
      <p>Purpose: {pot.purpose}</p>
      <p></p>
      <div></div>
    </main>
  )
}
