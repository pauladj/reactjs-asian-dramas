import React from "react";
import { useDiscoverDramasTMDB } from "../hooks/useTMDB";
import CatalogueResults from "./CatalogueResults";

import PropTypes from "prop-types";

export default function CatalogueDiscover({
  selectedLanguage,
  selectedAirDate,
  selectedStatus,
  selectedOrder,
}) {
  const [
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    numLoadedResults,
    totalNumResults,
  ] = useDiscoverDramasTMDB({
    selectedLanguage,
    selectedOrder,
    selectedStatus,
    selectedAirDate,
  });

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
        totalNumResults={totalNumResults}
      />
    </>
  );
}

CatalogueDiscover.propTypes = {
  selectedLanguage: PropTypes.string,
  selectedOrder: PropTypes.string,
  selectedAirDate: PropTypes.string,
  selectedStatus: PropTypes.string,
};
