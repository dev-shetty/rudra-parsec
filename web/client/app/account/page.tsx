"use client"

import { getUser } from "@/app/actions"
import Navbar from "@/components/Navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AccountPage() {
  const [user, setUser] = useState<any>()
  const [userData, setUserData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    age: "",
    address: "",
  })
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const fetchUser = async () => {
    const _user = await getUser()
    if (!_user) router.push("/login")
    setUser(_user)
  }

  async function getUserProfile() {
    if (!user) return

    const { data } = await supabase
      .from("user")
      .select()
      .eq("email", user.user_metadata.email)

    setUserData(data)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    getUserProfile()
  }, [user])

  useEffect(() => {
    if (!userData) return
    setData({
      name: userData.name,
      age: userData.age,
      address: userData.address,
    })
  }, [userData])

  async function updateUser(e: any) {
    e.preventDefault()
    setIsLoading(true)
    if (!user) return

    const userDataProps = {
      auth_id: user.id,
      name: data.name,
      age: Number(data.age),
      address: data.address,
      email: user.user_metadata.email,
      avatar: user.user_metadata.avatar_url,
    }

    const { data: userRes, error } = await supabase
      .from("user")
      .insert([userDataProps])

    setIsLoading(false)
    toast({
      title: "Data updated successfully",
      variant: "success",
    })
    router.push("/service")
  }

  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <main className="grid max-w-7xl md:my-20 my-36 gap-10 md:grid-cols-2 w-full">
        <Navbar />
        <div className="flex justify-center items-center lg:px-10 px-8">
          <section className="w-full">
            <Card className="w-full bg-black border-input">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateUser} className="gap-3 flex flex-col">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      disabled={isLoading}
                      placeholder="Enter your name"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      disabled={isLoading}
                      placeholder="Enter your age"
                      type="number"
                      value={data.age}
                      onChange={(e) =>
                        setData({ ...data, age: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      disabled={isLoading}
                      className="resize-none min-h-[100px]"
                      id="address"
                      placeholder="Enter your address"
                      value={data.address}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full my-4"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        Create
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="2"
                          >
                            <path
                              stroke-dasharray="60"
                              stroke-dashoffset="60"
                              stroke-opacity=".3"
                              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="1.3s"
                                values="60;0"
                              />
                            </path>
                            <path
                              stroke-dasharray="15"
                              stroke-dashoffset="15"
                              d="M12 3C16.9706 3 21 7.02944 21 12"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="0.3s"
                                values="15;0"
                              />
                              <animateTransform
                                attributeName="transform"
                                dur="1.5s"
                                repeatCount="indefinite"
                                type="rotate"
                                values="0 12 12;360 12 12"
                              />
                            </path>
                          </g>
                        </svg>
                      </div>
                    ) : (
                      <div>Create</div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>
        <div className="flex justify-center items-center lg:px-10 px-8">
          <section className="w-full">
            <Card className="w-full border-input bg-black">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      alt={user?.user_metadata.name}
                      src={user?.user_metadata.avatar_url}
                    />
                    <AvatarFallback>
                      {user?.user_metadata.name.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 text-xs">
                    <div className="font-medium">
                      {user?.user_metadata.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {user?.user_metadata.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
