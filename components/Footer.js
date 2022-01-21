import React from "react";
import Image from "next/image";
import tmdbLogo from "../public/img/tmdb-logo.png";

export default function Footer() {
  return (
    <footer className="mt-20 text-center bg-gray-800 text-primary-25">
      <div className="mt-8 pt-6 pb-4">
        Made with 🤹‍♀️ by{" "}
        <a
          className="text-primary-300"
          href="https://github.com/pauladj"
          target="_blank"
          rel="noopener noreferrer"
        >
          @pauladj
        </a>
      </div>
      <span className="flex justify-center pb-6">
        <a
          className="block"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data from
          <span className="ml-1">
            <Image src={tmdbLogo} alt="TMDB Logo" width={102} height={16} />
          </span>
        </a>
      </span>
    </footer>
  );
}
