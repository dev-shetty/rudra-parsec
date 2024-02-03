"use client"

import { getUser } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function JoinPot({
  searchParams,
}: {
  searchParams: { pot_code: string }
}) {
  const [pot, setPot] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [potMembers, setPotMembers] = useState<any[]>([])
  const { pot_code } = searchParams

  const fetchUser = async () => {
    const user = await getUser()
    if (!user) redirect("/login")
    setUser(user)
  }

  useEffect(() => {
    fetchUser()
    getPot()
  }, [])

  useEffect(() => {
    getMembers()
  }, [pot])

  const supabase = createClientComponentClient()

  async function getPot() {
    const { data, error } = await supabase
      .from("pot")
      .select("*")
      .eq("pot_code", pot_code)
      .single()
    setPot(data)

    if (error) {
      redirect("/pot")
    }
  }

  async function getMembers() {
    if (!pot) return
    const { data, error } = await supabase
      .from("user")
      .select()
      .in("auth_id", pot.members)

    setPotMembers(() => {
      return data?.map((user) => ({ name: user.name, email: user.email }))!
    })

    console.log(potMembers)
  }

  async function joinpot() {
    if (pot.members.includes(user.id)) {
      alert("You are already a member of this pot")
      return
    }
    await supabase.from("pot").update({ members: [...pot.members, user.id] })
    redirect("/pot/dashboard")
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
      <p>Total months: {pot.total_members}</p>
      {potMembers.map((member, i) => (
        <div key={i}>
          <p>{member.name}</p>
          <p>{member.email}</p>
        </div>
      ))}
      <p></p>
      <Button onClick={joinpot}>Join Pot</Button>
    </main>
  )
}
