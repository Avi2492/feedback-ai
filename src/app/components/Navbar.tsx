"use client";
import { User } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";

import React from "react";
import Logo from "./Logo";
import { RiCloseLine, RiMenuFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { data: session } = useSession();

  const user: User = session?.user;

  return (
    <>
      <div className="relative w-full bg-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          {session && (
            <div className="hidden grow items-start lg:flex">
              <ul className="ml-12 inline-flex space-x-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="hidden space-x-2 lg:block">
            {session ? (
              <>
                <Link href={"/profile"}>
                  <span>{user?.username || user?.email || "Welcome!"}</span>
                </Link>
                <Button
                  onClick={() => signOut()}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href={"/sign-up"}>
                  <Button
                    type="button"
                    className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-orange-200"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Button
                  type="button"
                  className="rounded-md border px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-600"
                  onClick={() => signIn()}
                >
                  Log In
                </Button>
              </>
            )}
          </div>
          <div className="lg:hidden">
            <RiMenuFill
              onClick={toggleMenu}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <Logo />
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    {session && (
                      <nav className="grid gap-y-4">
                        {menuItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                          >
                            <span className="ml-3 text-base font-medium text-gray-900">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </nav>
                    )}
                  </div>
                  <div className="mt-2 space-y-2">
                    {session ? (
                      <>
                        <span>
                          {user?.username || user?.email || "Welcome!"}
                        </span>
                        <Button
                          onClick={() => signOut()}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href={"/sign-up"}>
                          <Button
                            type="button"
                            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-orange-200"
                          >
                            Sign Up
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          className="rounded-md border px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-600"
                          onClick={() => signIn()}
                        >
                          Log In
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
