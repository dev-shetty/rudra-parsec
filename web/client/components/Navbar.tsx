"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { useState, useEffect, ChangeEvent } from "react";

interface Profile {
  name: string;
  bio: string;
  imageUrl: string;
  links: string[];
  userOwner: string | null;
  username: string | null;
}

function Navbar() {
  const [existingProfile, setExistingProfile] = useState();

  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-md flex items-center py-5 px-8">
      <div className="flex lg:container items-center w-full justify-between">
        <Link className="flex items-center space-x-1" href="/service">
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
        {existingProfile ? (
          <Link href="/admin">
            <Button>My Face</Button>
          </Link>
        ) : (
          <div className="flex gap-x-3 border border-input rounded-md">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>
                      <ul className="grid gap-3 w-40">
                        <Link
                          href="/pot"
                          className="hover:bg-input w-full flex px-2 py-3"
                        >
                          Pots
                        </Link>
                        <Link
                          href="/news"
                          className="hover:bg-input w-full flex px-2 py-3"
                        >
                          News
                        </Link>
                        <Link
                          href="/educate"
                          className="hover:bg-input w-full flex px-2 py-3"
                        >
                          Education
                        </Link>
                        <Link
                          href="/news"
                          className="hover:bg-input w-full flex px-2 py-3"
                        >
                          Global
                        </Link>
                        <Link
                          href="/contracts"
                          className="hover:bg-input w-full flex px-2 py-3"
                        >
                          Contracts
                        </Link>
                      </ul>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
