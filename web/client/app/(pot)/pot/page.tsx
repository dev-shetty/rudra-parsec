import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"
const page = () => {
  
  return (
    <div className="container relative min-h-[100dvh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex">
        <img
          // quality={100}
          // priority
          src="/grad.jpg"
          className="relative bg-black object-cover w-full h-full z-20"
          width={500}
          height={500}
          alt="login-image"
        ></img>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">POTs</h1>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Join an existing POT</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter the code"
                    className="w-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-white"
                  />
                  <Button>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link href="/create-pot">
            <Button className="w-full">Create a new POT</Button>
          </Link>

          {/* <UserAuthForm /> */}
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default page
