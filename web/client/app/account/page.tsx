import Navbar from "@/components/Pots/Navbar";
import React from "react";
const user = "srajan";
const page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="font-semibold text-3xl">Hello {user}</div>
      <Navbar />
    </div>
  );
};

export default page;
