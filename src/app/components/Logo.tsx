import { RiMessage3Fill } from "@remixicon/react";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <div className="flex items-center mb-4 justify-center">
      <RiMessage3Fill size={60} className="text-orange-500 font-medium" />
      <h2 className="text-4xl font-extrabold m-2 p-2">RepliBot</h2>
    </div>
  );
};

export default Logo;
