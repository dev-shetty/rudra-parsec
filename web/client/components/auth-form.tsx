"use client"
import { Database } from "@/utils/supabase/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeMinimal } from "@supabase/auth-ui-shared"

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const supabase = createClientComponentClient<Database>()

  const view = mode === "signin" ? "sign_in" : "sign_up"

  return (
    <Auth
      supabaseClient={supabase}
      view={view}
      appearance={{ theme: ThemeMinimal }}
      theme="dark"
      showLinks={false}
      providers={["google"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  )
}
