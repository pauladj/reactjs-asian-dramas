import React from "react";
import Link from "next/link";
import BackgroundDecorations from "./BackgroundDecorations";

export default function HeroHeader() {
  return (
    <>
      <header className="bg-hero-background bg-top bg-[length:1200px] lg:bg-cover sm:relative">
        {/* decorations */}
        <BackgroundDecorations />
        {/* end */}

        <Link href="/">
          <a>
            <h1
              className="text-lg md:text-[5.25rem] md:leading-[5rem] lg:text-2xl font-bold text-center text-white
                 container mx-auto pt-36 md:pt-48 pb-24 md:pb-34 lg:pt-52 lg:pb-48"
            >
              Discover Asian
              <span className="text-primary-400 block">Dramas</span>
            </h1>
          </a>
        </Link>
      </header>
    </>
  );
}
