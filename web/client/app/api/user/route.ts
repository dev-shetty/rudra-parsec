import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log(session)

  if (!session) {
    return NextResponse.json({
      success: false,
      message: "Please signin to continue",
    })
  }

  return NextResponse.json({
    success: true,
    user: {
      email: session.user.email,
      id: session.user.id,
      name: session.user.user_metadata.full_name,
      avatar: session.user.user_metadata.avatar_url,
    },
  })
}
