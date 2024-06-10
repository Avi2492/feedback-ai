"use client";
import Logo from "./components/Logo";
import Typewriter from "typewriter-effect";

interface Props {}

const Home = (props: Props) => {
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
          <span className="text-orange-600 text-4xl md:text-8xl">
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
        </div>
      </div>
    </>
  );
};

export default Home;
