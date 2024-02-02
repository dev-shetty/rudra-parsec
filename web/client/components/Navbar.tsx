import AuthButton from "@/components/AuthButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-5 w-full flex justify-center items-center">
      <div className="bg-white/20 flex items-center justify-between backdrop-blur-md rounded-full px-5 max-w-7xl w-full mx-5">
        <AuthButton />
        <Link href="pot">Pot</Link>
      </div>
    </div>
  );
};

export default Navbar;
