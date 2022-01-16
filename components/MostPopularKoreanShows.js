import React from "react";
import Image from "next/image";
import fallbackImage from "../public/img/fallback-popular-image.jpg";
import PropTypes from "prop-types";

export default function MostPopularKoreanShows({ hasError, tvShows }) {
  // the most popular one is in the middle
  if (tvShows && tvShows.length > 4) {
    tvShows = [...tvShows.slice(1, 3), tvShows[0], ...tvShows.slice(3, 5)];
  }

  return (
    <>
      <h2 className="text-sm font-medium text-gray-300 pb-3.5">
        Korean Most Popular
      </h2>
      {hasError && <span>Error loading Korean most popular TV Shows</span>}

      {!hasError && (
        <div className="flex justify-between items-center">
          {tvShows.map((show, index) => {
            return (
              <div
                key={show.id}
                className={
                  "relative hover:scale-105 transition-transform duration-500 cursor-pointer " +
                  (index === 2 ? "w-1/5 h-96" : "w-2/12 h-80")
                }
              >
                <Image
                  src={
                    show.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + show.poster_path
                      : fallbackImage
                  }
                  alt={show.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl shadow-lg"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

MostPopularKoreanShows.propTypes = {
  hasError: PropTypes.bool.isRequired,
  tvShows: PropTypes.array,
};
