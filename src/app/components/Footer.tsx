"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { RiHeartFill } from "@remixicon/react";

export function Footer() {
  return (
    <section className="relative overflow-hidden bg-white py-4">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link href={"/"}>
            <div className="inline-flex items-center">
              <Logo />
            </div>
          </Link>

          <div className="flex justify-center items-center py-4 gap-1">
            Made with <RiHeartFill color="red" size={20} />{" "}
            {new Date().getFullYear()} by{" "}
            <span className="text-xl  font-bold">
              spheri<span className="text-orange-600">soft</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
