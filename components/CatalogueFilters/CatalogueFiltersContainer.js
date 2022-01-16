import React from "react";
import "@reach/dialog/styles.css";
import styles from "../../styles/buttons.module.css";
import { LANGUAGES, ORDERS } from "../../utils/constants";

import PropTypes from "prop-types";
import AdvancedResponsiveFilters from "./AdvancedResponsiveFilters";

export default function CatalogueFiltersContainer({
  setSearchTerm,
  searchTerm,
  selectedLanguage,
  setSelectedLanguage,
  selectedAirDate,
  setSelectedAirDate,
  selectedStatus,
  setSelectedStatus,
  selectedOrder,
  setSelectedOrder,
}) {
  const handleClickReset = () => {
    setSelectedAirDate("");
    setSelectedStatus("");
    setSelectedLanguage("ko");
    setSearchTerm("");
  };

  const optionStyle = "bg-white text-gray-900";

  return (
    <section>
      <input
        className="bg-transparent bg-[url('/img/magnifying-glass-icon.svg')] bg-no-repeat bg-[.75rem_center] border-gray-700 border-2 rounded-[8px] w-full pl-12 p-[.60rem] text-left sm:bg-[length:14px_14px] md:w-fit md:mr-4 md:pl-10 md:py-[.45rem]"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className={
          "mt-2 bg-gray-700 bg-[url('/img/language-icon.svg'),url('/img/arrow-down-icon.svg')] bg-no-repeat bg-[length:18px_18px,12px_12px] border-gray-700 border-2 rounded-[8px] w-full pl-12 pr-12 p-[.60rem] text-left md:w-fit md:pl-10 md:py-[.45rem] md:mr-4 cursor-pointer " +
          styles.two_icons_position
        }
        name="language"
        id="language"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {LANGUAGES.map((oneLanguage) => (
          <option
            key={oneLanguage.value}
            value={oneLanguage.value}
            className={optionStyle}
          >
            Language: {oneLanguage.name}
          </option>
        ))}
      </select>
      <AdvancedResponsiveFilters
        selectedAirDate={selectedAirDate}
        setSelectedAirDate={setSelectedAirDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      ‍
      <button
        onClick={() => handleClickReset()}
        className="text-primary-400 absolute top-0 right-0 lg:static"
      >
        Reset Filters
      </button>
      <div className="text-body-sm mt-6">
        Order by
        <select
          name="order"
          id="order"
          value={selectedOrder}
          className="bg-transparent text-body-sm border-none py-0 pl-0 ml-2 cursor-pointer"
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          {ORDERS.map((order) => (
            <option
              key={order.value}
              value={order.value}
              className={optionStyle}
            >
              {order.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

CatalogueFiltersContainer.propTypes = {
  searchTerm: PropTypes.string,
  selectedLanguage: PropTypes.string,
  selectedOrder: PropTypes.string,
  selectedAirDate: PropTypes.string,
  selectedStatus: PropTypes.string,
  setSearchTerm: PropTypes.func.isRequired,
  setSelectedLanguage: PropTypes.func.isRequired,
  setSelectedAirDate: PropTypes.func.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  setSelectedOrder: PropTypes.func.isRequired,
};
