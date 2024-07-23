"use client";
import { Button } from "@/components/ui/button";
import Logo from "../../components/Logo";
import Typewriter from "typewriter-effect";
import { RiArrowRightLine, RiMailLine } from "@remixicon/react";

import { useSession } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";

const HeroScreen = () => {
  const { data: session } = useSession();

  const user: User = session?.user;
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
            {session ? (
              <>
                <p className="text-xl">
                  Welcome,{" "}
                  <span className="text-orange-500 hover:underline">
                    {user?.username || user?.email || "Welcome!"}
                  </span>
                </p>
              </>
            ) : (
              <>
                <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl gap-1">
                  Get Started <RiArrowRightLine size={20} />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroScreen;
