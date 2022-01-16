import React from "react";
import fallbackImage from "../public/img/fallback-popular-image.jpg";

export default function CatalogueResultsItem({
  voteAverage,
  image,
  firstAirDate,
  name,
  originalName,
}) {
  return (
    <div className="mt-7 pb-4">
      <div className="relative w-full h-48 lg:h-56 hover:scale-105 transition-transform duration-500 cursor-pointer">
        <Image
          src={
            image ? "https://image.tmdb.org/t/p/w500" + image : fallbackImage
          }
          alt={name + " cover"}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl shadow-lg"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm font-medium text-primary-50">{name}</h3>
          <p className="text-body-sm text-primary-50 mt-1">{originalName}</p>
          <p className="text-body-sm text-gray-400">Aired on {firstAirDate}</p>
        </div>
        <div className="-mt-1">
          {voteAverage ? <RatingCircle rating={voteAverage} /> : ""}
        </div>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";
import Image from "next/image";
import RatingCircle from "./RatingCircle";

CatalogueResultsItem.propTypes = {
  voteAverage: PropTypes.number,
  image: PropTypes.string,
  firstAirDate: PropTypes.string,
  name: PropTypes.string,
  originalName: PropTypes.string,
};

CatalogueResultsItem.defaultProps = {
  firstAirDate: "undefined",
  name: "No name found",
  originalName: "No original name found",
};
