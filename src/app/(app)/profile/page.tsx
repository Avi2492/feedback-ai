/* eslint-disable @next/next/no-img-element */
"use client";

import ErrorPage from "@/app/components/error/ErrorPage";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  const { username } = session?.user as User;
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
        <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <img
              src="https://illustrations.popsy.co/white/resistance-band.svg"
              alt="question-mark"
              className="h-[300px] w-auto"
            />
            <div>
              <p className="mt-6 text-2xl font-semibold text-black">
                Welcome,{" "}
                <span className="text-orange-500 font-bold animate-pulse text-4xl">
                  {username}
                </span>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                Page is in working mode 😊
              </h1>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for is in working mode.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <Link href={"/dashboard"}>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <RiArrowLeftLine size={16} className="mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href={"/edit-profile"}>
                  <Button variant="outline">
                    Edit Profile
                    <RiArrowRightLine size={16} className="mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default ProfilePage;
