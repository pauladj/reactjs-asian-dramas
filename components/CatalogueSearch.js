import React from "react";
import { useSearchDramasTMDB } from "../hooks/useTMDB";
import CatalogueResults from "./CatalogueResults";
import PropTypes from "prop-types";

export default function CatalogueSearch({ searchTerm }) {
  const [
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    numLoadedResults,
  ] = useSearchDramasTMDB({ searchTerm });

  return (
    <>
      <CatalogueResults
        isLoading={isLoading}
        isError={isError}
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        numLoadedResults={numLoadedResults}
      />
    </>
  );
}

CatalogueSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
