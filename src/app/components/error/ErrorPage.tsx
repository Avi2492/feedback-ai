"use client";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
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
              <p className="mt-6 text-sm font-semibold text-black">404 error</p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                We can&apos;t find that page
              </h1>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for doesn&apos;t exist or has
                been moved.
              </p>
              <div className="mt-6 flex items-center space-x-3">
                <Link href={"/sign-up"}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Sign Up Please
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

export default ErrorPage;
