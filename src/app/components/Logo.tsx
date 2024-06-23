import { RiMessage3Fill } from "@remixicon/react";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <RiMessage3Fill size={40} className="text-orange-500 font-medium" />
      <h2 className="text-2xl font-extrabold">RepliBot</h2>
    </div>
  );
};

export default Logo;
