import { useInfiniteQuery } from "react-query";
import { LANGUAGES } from "../utils/constants";
import { useEffect, useRef } from "react";
import { stringifyUrlParams } from "../utils/requests";

const calculateLoadedResultsNum = (data) => {
  if (data && data.pages) {
    return data.pages.reduce(
      (total, currentPage) => total + currentPage.results?.length || 0,
      0
    );
  }
  return 0;
};

const calculateTotalNumResultNum = (data) => {
  if (data && data.pages && data.pages.length > 0) {
    return data.pages[0].total_results;
  }
  return 0;
};

function baseTMDBFetch(url, urlParams, pageParam) {
  return fetch(
    `${url}?page=${pageParam}&${stringifyUrlParams(urlParams)}`
  ).then((res) => {
    if (res.status !== 200) {
      // raise react query error
      throw new Error(`Invalid request ${res.status}`);
    }
    return res.json();
  });
}

export function useDiscoverTVShowsTMDB({
  selectedLanguage,
  selectedOrder,
  selectedStatus,
  selectedAirDate,
}) {
  const urlParams = {
    with_type: 4,
    language: "en-US",
    with_original_language: selectedLanguage,
    sort_by: selectedOrder,
    with_status: selectedStatus,
    first_air_date_year: selectedAirDate,
  };

  const url = "api/discover";

  const queryKeys = [
    "discover",
    selectedLanguage,
    selectedStatus,
    selectedOrder,
    selectedAirDate,
  ];

  const fetchTVShows = ({ pageParam = 1 }) => {
    return baseTMDBFetch(url, urlParams, pageParam);
  };

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([...queryKeys], fetchTVShows, {
    getNextPageParam: (lastPage) => {
      const logicalNextPage = lastPage.page + 1;
      return logicalNextPage <= lastPage.total_pages
        ? logicalNextPage
        : undefined;
    },
  });

  const numLoadedResults = calculateLoadedResultsNum(data);
  const totalNumResults = calculateTotalNumResultNum(data);

  return [
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    numLoadedResults,
    totalNumResults,
  ];
}

export function useSearchTVShowsTMDB({ searchTerm }) {
  const urlParams = {
    query: searchTerm,
    language: "en-US",
  };
  const url = "api/search";
  const queryKeys = ["search", searchTerm];

  const fetchTVShows = ({ pageParam = 1 }) => {
    return baseTMDBFetch(url, urlParams, pageParam).then((data) => {
      // The API doesn't let us search & filter
      // so we have to filter manually after searching
      // We modify the cache so we don't have to filter
      // twice the same search results
      return filterNonAsianResults(data);
    });
  };

  const filterNonAsianResults = (data) => {
    const filteredResults =
      data.results?.filter((tvShow) => isAllowedLanguage(tvShow)) || [];
    return { ...data, results: filteredResults };
  };

  const automaticLoadingPageCount = useRef(0);

  const isAllowedLanguage = (tvShow) => {
    const language = tvShow.original_language || "";
    const acceptedLanguages = LANGUAGES.flatMap((language) => language.value);

    return acceptedLanguages.includes(language);
  };

  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(queryKeys, fetchTVShows, {
    getNextPageParam: (lastPage) => {
      const logicalNextPage = lastPage.page + 1;
      return logicalNextPage <= lastPage.total_pages
        ? logicalNextPage
        : undefined;
    },
  });

  useEffect(() => {
    // We don't want to show 4 results after searching if the first page
    // only has 4 asian dramas. We want to show more results.
    if (data?.pages?.length > 0 && hasNextPage && !isFetchingNextPage) {
      // Get the number of results in the last page
      const lastPageResultsCount =
        data.pages[data.pages.length - 1].results.length;
      // If it's less than four then try asking for the next page
      // only if we haven't already done this 3 times
      if (lastPageResultsCount < 4 && automaticLoadingPageCount.current < 3) {
        automaticLoadingPageCount.current += 1;
        fetchNextPage();
      } else {
        automaticLoadingPageCount.current = 0;
      }
    }
  }, [data, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const numLoadedResults = calculateLoadedResultsNum(data);

  return [
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    numLoadedResults,
  ];
}
