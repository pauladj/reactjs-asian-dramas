import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "../public/img/arrow-left-icon.svg";

export default function DramaHeader() {
  return (
    <>
      <header className="w-4/5 m-0 m-auto max-w-screen-xl pt-10 ">
        <Link href="/">
          <a>
            <div className="w-full">
              <Image
                src={arrowLeft}
                alt="Go back icon"
                width={20}
                height={20}
              />
            </div>
          </a>
        </Link>
      </header>
    </>
  );
}
