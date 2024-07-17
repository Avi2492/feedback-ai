import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="h-screen">
      <div className="py-10 flex justify-center items-center mt-10">
        <div className="text-center">
          <p className="text-xl font-semibold text-black">This</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page is in Working Mode
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we {`Couldn't`} find the page {`you're`} looking for.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3">
            <Link href={"/dashboard"}>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <RiArrowLeftLine size={16} className="mr-2" />
                Go back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
