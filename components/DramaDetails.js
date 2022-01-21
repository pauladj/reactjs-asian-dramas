import React from "react";
import RatingCircle from "./RatingCircle";
import PropTypes from "prop-types";
import Button from "./Button";

export default function DramaDetails({
  name,
  countries,
  episodeCount,
  genres,
  voteAverage,
  firstAirDate,
  plot,
  watchLink,
}) {
  return (
    <>
      <h1
        className="text-[2.25rem] leading-[2.5rem] md:text-xl font-bold text-gray-25
                 pt-10"
      >
        {name}
      </h1>

      <p className="text-[1.12rem] mt-4 text-gray-50">
        <span>{firstAirDate}</span>
        <span className="px-2">|</span>
        {countries?.map((country, index) => {
          const separator = index === countries.length - 1 ? "" : ", ";
          return (
            <span key={index}>
              <span>{country}</span>
              {separator}
            </span>
          );
        })}
        <span className="px-2">|</span>
        Episodes {episodeCount !== undefined ? episodeCount : "?"}
      </p>

      <p className="text-[1.12rem] text-gray-400 mt-1">
        {genres?.map((genre, index) => {
          const separator = index === genres.length - 1 ? "" : ", ";
          return (
            <span key={genre.id}>
              <span>{genre.name}</span>
              {separator}
            </span>
          );
        })}
      </p>
      {voteAverage ? (
        <div className="mt-4">
          <RatingCircle rating={voteAverage} />
        </div>
      ) : (
        ""
      )}

      <h2 className="text-gray-50 mt-10 font-bold text-sm">The Story</h2>
      <p className="text-gray-50 mt-4 md:w-9/12 md:mx-0 whitespace-pre-line">
        {plot}
      </p>
      <Button link={watchLink} newTab={true}>
        Watch Now
      </Button>
    </>
  );
}

DramaDetails.propTypes = {
  name: PropTypes.string.isRequired,
  countries: PropTypes.array,
  episodeCount: PropTypes.number,
  genres: PropTypes.array,
  voteAverage: PropTypes.number,
  firstAirDate: PropTypes.string,
  plot: PropTypes.string,
  watchLink: PropTypes.string,
};

DramaDetails.defaultProps = {
  plot: "No plot found",
  firstAirDate: "Unknown air date",
  countries: ["Unknown country"],
};
