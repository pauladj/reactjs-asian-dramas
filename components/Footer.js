import React from "react";
import Image from "next/image";
import tmdbLogo from "../public/img/tmdb-logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-center mt-10 pb-6">
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Data from
        <span className="ml-1">
          <Image src={tmdbLogo} alt="TMDB Logo" width={102} height={16} />
        </span>
      </a>
    </footer>
  );
}
