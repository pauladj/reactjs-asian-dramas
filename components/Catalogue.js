import React, { useEffect, useState } from "react";
import CatalogueFiltersContainer from "./CatalogueFilters/CatalogueFiltersContainer";
import CatalogueDiscover from "./CatalogueDiscover";
import CatalogueSearch from "./CatalogueSearch";

export default function Catalogue() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSearchTerm, setApiSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ko");
  const [selectedAirDate, setSelectedAirDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("popularity.desc");

  useEffect(() => {
    let timerId;

    if (searchTerm) {
      timerId = setTimeout(() => {
        // Api Throttling
        // If the user hasn't written anything in 700ms
        // make a request to the api
        setApiSearchTerm(searchTerm);
      }, 700);
    } else {
      setApiSearchTerm("");
    }

    // cleanup
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    // Go back from search to filters page
    setSearchTerm("");
    setApiSearchTerm("");
  }, [selectedLanguage, selectedAirDate, selectedStatus, selectedOrder]);

  return (
    <>
      <h2 className="text-primary-50 text-sm font-medium mb-6 md:text-2md md:mb-14 md:mt-24 lg:text-xl lg:mt-28">
        Catalogue
      </h2>
      <CatalogueFiltersContainer
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedAirDate={selectedAirDate}
        setSelectedAirDate={setSelectedAirDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />

      <section>
        {apiSearchTerm ? (
          <CatalogueSearch searchTerm={apiSearchTerm} />
        ) : (
          <CatalogueDiscover
            selectedLanguage={selectedLanguage}
            selectedAirDate={selectedAirDate}
            selectedStatus={selectedStatus}
            selectedOrder={selectedOrder}
          />
        )}
      </section>
    </>
  );
}
