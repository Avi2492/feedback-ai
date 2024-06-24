"use client";

import React from "react";
import messages from "@/messages.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const CarouselScreen = () => {
  return (
    <>
      <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-24">
        <section className="my-4 py-2">
          <h1 className="text-center font-bold text-3xl md:text-5xl mb-4 md:mb-8">
            Dive into the World of Anonymous Conversations
          </h1>
          <p className="text-center font-semibold text-orange-500 text-md md:text-lg mb-4 md:mb-8">
            Explore RepliBot - Where your identity remains private!
          </p>
        </section>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card>
                    <p className="text-center p-2 text-orange-500">
                      {message.title}
                    </p>
                    {/* <img src={message.src} alt="image-src" /> */}
                    <CardContent className="flex items-center justify-center p-6 gap-2">
                      <span className="text-lg font-semibold text-center">
                        {message.content}
                      </span>
                      <span>
                        <p className="text-green-500">{message.received}</p>
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};

export default CarouselScreen;
