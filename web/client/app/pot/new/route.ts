import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })

    const supabase = createClient(cookieStore);
}
