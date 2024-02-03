import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <div className="fixed bottom-20 w-full flex justify-center items-center">
      <div className="bg-white/20 flex py-2 items-center justify-center backdrop-blur-md rounded-full px-5 max-w-7xl w-full mx-5">
        {/* <AuthButton /> */}
        <Link href="/create-pot">
          <Button variant={"link"} className="text-primary/50 hover:text-white">
            POTs
          </Button>
        </Link>
        <Link href="/login">
          <Button variant={"link"} className="text-primary/50 hover:text-white">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
