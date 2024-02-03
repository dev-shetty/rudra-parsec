"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabase = createServerActionClient({ cookies })

export async function getUser() {
  const user = await supabase.auth.getUser()
  return user.data.user
}

export async function getUserById(id: string) {
  const user = await supabase.from("user").select().eq("id", id)
  return user.data
}

export async function createPot(formData: any) {
  const { data, error } = await supabase
    .from("pots")
    .insert([formData])
    .single()
  return { data, error }
}
