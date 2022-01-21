import React from "react";
import Link from "next/link";

export default function Button({ link, customClasses, children }) {
  return (
    <Link href={link}>
      <a
        className={
          customClasses +
          " mt-10 text-primary-100 bg-primary-700 rounded-[8px] block py-3 text-[1.12rem] text-center hover:bg-primary-950 transition-colors duration-500 md:w-fit md:px-14"
        }
      >
        {children}
      </a>
    </Link>
  );
}
