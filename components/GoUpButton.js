import React from "react";
import arrowUpIcon from "../public/img/arrow-up-icon.svg";
import Image from "next/image";

export default function GoUpButton() {
  const scrollToTheTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      className="fixed bg-white w-14 h-14 bottom-5 right-5 rounded-full flex justify-center items-center cursor-pointer z-50"
      onClick={scrollToTheTop}
    >
      <Image src={arrowUpIcon} alt="Go Up icon" width={30} height={30} />
    </button>
  );
}
