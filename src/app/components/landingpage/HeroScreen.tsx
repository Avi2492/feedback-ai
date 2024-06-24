"use client";
import { Button } from "@/components/ui/button";
import Logo from "../../components/Logo";
import Typewriter from "typewriter-effect";
import { RiMailLine } from "@remixicon/react";
import Link from "next/link";

const HeroScreen = () => {
  return (
    <>
      <div className="flex h-screen w-full justify-center items-center">
        <div className="md:text-8xl text-6xl font-bold text-center m-4">
          <span className="mb-4 py-4">
            <Logo />
            <p className="md:text-8xl text-4xl mb-6">
              Transforming Feedback with AI-Driven Insights
            </p>
          </span>
          <span className="text-orange-500 text-4xl md:text-8xl">
            <Typewriter
              options={{
                strings: [
                  "Improve Together",
                  "Share Without Fear",
                  "Speak Freely",
                  "Space for Feedback",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
          <div className="mt-6">
            <Link href={"/sign-in"}>
              <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl">
                <RiMailLine className="mr-2 h-4 w-4" /> Login with Email
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroScreen;
