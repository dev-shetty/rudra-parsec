// "use client";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-scroll";
// import Linkk from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// const Navbar: React.FC = () => {
//   const [isNavVisible, setIsNavVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const isVisible = scrollPosition > 100; // Adjust this value based on when you want the navbar to appear

//       setIsNavVisible(isVisible);
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup the event listener when the component unmounts
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={`fixed select-none z-50 flex justify-center w-full items-center py-4 md:px-5 transition-opacity duration-300 `}
//     >
//       <div className="container flex justify-between items-center rounded-full bg-background/70 border border-input py-4 backdrop-blur-md">
//         <Linkk href="/">
//           {/* <Image src="/icon.svg" width={50} height={50} alt="codeblaze" /> */}
//           <p className="flex text-lg font-bold justify-center items-center gap-1">
//             Finvest
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="25"
//               height="25"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fill="currentColor"
//                 d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64"
//               />
//             </svg>
//           </p>
//         </Linkk>
//         <ul className="flex tracking-wider justify-end">
//           <li className="mr-6 cursor-pointer hover:underline underline-offset-4">
//             <Linkk href="/pot/dashboard">Pots</Linkk>
//           </li>
//           <li className="mr-6 cursor-pointer hover:underline underline-offset-4">
//             <Linkk href="/news">News</Linkk>
//           </li>
//           <li className="mr-6 cursor-pointer hover:underline underline-offset-4">
//             <Linkk href="/education">Education</Linkk>
//           </li>
//           <li className="mr-6 cursor-pointer hover:underline underline-offset-4">
//             <Linkk href="/login">Login</Linkk>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

import { getUser } from "@/app/actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

interface Profile {
  name: string
  bio: string
  imageUrl: string
  links: string[]
  userOwner: string | null
  username: string | null
}

export default function Navbar() {
  const [existingProfile, setExistingProfile] = useState()

  const [user, setUser] = useState<any>(null)

  const fetchUser = async () => {
    const user = await getUser()
    if (!user) setUser(null)
    setUser(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const supabase = createClientComponentClient()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md flex items-center top-0 py-5 px-8">
      <div className="flex lg:container items-center w-full justify-between">
        <Link className="flex items-center space-x-1" href="/">
          {/* <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-background via-[#8ebec0] to-[#f8914c]"></div> */}
          <p className="flex text-lg font-bold justify-center items-center gap-1">
            Finvest
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64"
              />
            </svg>
          </p>
        </Link>
        {user ? (
          <Button onClick={signOut}>Sign out</Button>
        ) : (
          <div className="flex gap-x-3">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
