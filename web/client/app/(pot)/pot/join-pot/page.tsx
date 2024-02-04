"use client"

import { getUser } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect, useRouter } from "next/navigation"
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
  const router = useRouter()

  const fetchUser = async () => {
    const _user = await getUser()
    if (!_user) router.push("/login")
    setUser(_user)
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
      return data?.map((user) => ({
        name: user.name,
        email: user.email,
        isCreator: pot.creator === user.auth_id,
      }))!
    })
  }

  async function joinpot() {
    if (pot.members.includes(user.id)) {
      alert("You are already a member of this pot")
      return
    }
    await supabase.from("pot").update({ members: [...pot.members, user.id] })
    redirect("/pot/dashboard")
  }

  return !pot ? (
    <div className="my-16">Loading...</div>
  ) : (
    <div className="my-16 flex border rounded-lg p-4 gap-4 items-center justify-center">
      <div className="space-y-4 pr-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-center">
            Join pot - {pot_code}
          </h2>
        </div>
        <div className="space-y-2 pl-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Pot amount:</span>
            <span>₹{pot.goal_amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Pot amount per head:</span>
            <span>₹{pot.amount_per_head}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Pot description:</span>
            <span>{pot.purpose}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Members:</span>
            <span>{pot.total_members}</span>
          </div>
        </div>
        {potMembers.map((member, i) => (
          <div key={i} className="flex gap-2">
            {member.isCreator && <p>Creator: </p>}
            <p>{member.name}</p>
            <p>{member.email}</p>
          </div>
        ))}
        <div className="mt-4 w-full">
          <Button className="w-full" onClick={joinpot}>
            Join the pot
          </Button>
        </div>
      </div>
      <div className="w-1/2">
        <img
          alt="Pot Image"
          className="w-full h-full object-cover rounded-lg"
          height="500"
          src="/cash.jpg"
          style={{
            aspectRatio: "500/500",
            objectFit: "cover",
          }}
          width="500"
        />
      </div>
    </div>
  )
}
