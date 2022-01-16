import React from "react";
import PropTypes from "prop-types";
import CatalogueResultsItem from "./CatalogueResultsItem";

export default function CatalogueResults({
  isLoading,
  isError,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  numLoadedResults,
  totalNumResults,
}) {
  const pluralChar = () => {
    if (numLoadedResults > 1) {
      return "s";
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="bg-gray-800 text-primary-100 rounded-[8px] pt-1.5 pb-2 px-6 w-fit m-0 m-auto mt-10">
        {isError && "Failed to load. Try reloading the page."}
        {isLoading && "Loading..."}
        {data &&
          numLoadedResults > 0 &&
          (totalNumResults
            ? `Displaying ${numLoadedResults} of ${totalNumResults} result${pluralChar()}`
            : `Displaying ${numLoadedResults} result${pluralChar()}`)}
        {data && numLoadedResults < 1 && "No results"}
      </div>

      {data && numLoadedResults > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {data.pages.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {page.results.map((tvShow) => (
                  <CatalogueResultsItem
                    key={tvShow.id}
                    voteAverage={tvShow.vote_average}
                    image={tvShow.poster_path}
                    firstAirDate={tvShow.first_air_date}
                    name={tvShow.name}
                    originalName={tvShow.original_name}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {data && numLoadedResults > 0 && hasNextPage && (
        <button
          className="bg-gray-800 text-primary-100 rounded-[8px] pt-1.5 pb-2 px-6 w-fit m-0 m-auto mt-10 block"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </>
  );
}

CatalogueResults.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  data: PropTypes.any,
  fetchNextPage: PropTypes.func,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  numLoadedResults: PropTypes.number,
  totalNumResults: PropTypes.number,
};
