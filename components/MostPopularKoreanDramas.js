import React from "react";
import Image from "next/image";
import fallbackImage from "../public/img/fallback-popular-image.jpg";
import PropTypes from "prop-types";
import Link from "next/link";

export default function MostPopularKoreanDramas({ hasError, dramas }) {
  // the most popular one is in the middle
  if (dramas && dramas.length > 4) {
    dramas = [...dramas.slice(1, 3), dramas[0], ...dramas.slice(3, 5)];
  }

  return (
    <>
      <h2 className="text-sm font-medium text-gray-300 pb-3.5">
        Most Popular Korean Dramas
      </h2>
      {hasError && <span>Error loading</span>}

      {!hasError && (
        <div className="flex justify-between items-center">
          {dramas.map((show, index) => {
            return (
              <div
                key={show.id}
                className={
                  "relative hover:scale-105 transition-transform duration-500 " +
                  (index === 2 ? "w-1/5 xl:h-96 h-72" : "w-2/12 xl:h-80 h-60")
                }
              >
                <Link href={"/" + show.id}>
                  <a>
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
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

MostPopularKoreanDramas.propTypes = {
  hasError: PropTypes.bool.isRequired,
  dramas: PropTypes.array,
};
