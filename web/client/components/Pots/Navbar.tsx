import AuthButton from "@/components/AuthButton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import Details from "./Details"
const Navbar = () => {
  return (
    <nav className="fixed bottom-20 w-full flex justify-center items-center">
      <div className="bg-white/20 flex py-2 items-center justify-center backdrop-blur-md rounded-full px-5 max-w-7xl w-full mx-5">
        {/* <AuthButton /> */}
        <Link href="/pot">
          <Button variant={"link"} className="text-primary/50 hover:text-white">
            POTs
          </Button>
        </Link>
        <div className="text-primary/50 hover:text-white">
          <AlertDialog>
            <AlertDialogTrigger>Your Details</AlertDialogTrigger>
            <AlertDialogContent>
              <Details />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
