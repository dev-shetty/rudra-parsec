import AuthForm from "@/components/auth-form"

export const metadata = {
  title: "Register"
}

export default function Login() {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <AuthForm mode="signup" />
    </div>
  )
}
