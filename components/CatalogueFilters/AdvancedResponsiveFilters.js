import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import StatusFilterTag from "./StatusFilteringTag";
import Dialog from "@reach/dialog";
import styles from "../../styles/buttons.module.css";
import { STATUS } from "../../utils/constants";

import PropTypes from "prop-types";

export default function AdvancedResponsiveFilters({
  selectedStatus,
  selectedAirDate,
  setSelectedStatus,
  setSelectedAirDate,
}) {
  const dropdownRef = useRef(undefined);
  const modalRef = useRef(undefined);
  const buttonRef = useRef(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const modalResponsiveBreakpoint = 765;
  const { windowWidth } = useWindowDimensions();

  useEffect(() => {
    const handleClick = (event) => {
      const isDropdownClicked =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const isModalClicked =
        modalRef.current && modalRef.current.contains(event.target);
      const isButtonClicked =
        buttonRef.current && buttonRef.current.contains(event.target);

      if (isDropdownClicked || isModalClicked || isButtonClicked) {
        // Do nothing if the user clicks inside the modal or dropdown
        return;
      }

      // Or else close the menu.
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  const isAdvancedFilterSelected = () => {
    return selectedStatus || selectedAirDate ? true : false;
  };

  const handleClearAllAdvancedFilters = () => {
    setSelectedAirDate("");
    setSelectedStatus("");
  };

  const responsiveContent = (
    <>
      <header className="flex justify-between mb-7">
        <h3 className="text-sm font-medium">Filters</h3>
        <button
          className="text-primary-700"
          onClick={() => handleClearAllAdvancedFilters()}
        >
          Clear all
        </button>
      </header>

      <label htmlFor="air-date">Air Date</label>
      <input
        className="block mt-2 mb-5 border border-gray-300 rounded-[8px] w-full"
        id="air-date"
        type="number"
        min="1900"
        step="1"
        placeholder="2021"
        value={selectedAirDate}
        onChange={(e) => setSelectedAirDate(e.target.value)}
      />

      <label htmlFor="status">Status</label>
      <div className="mt-2" id="status">
        {STATUS.map((oneStatus) => (
          <StatusFilterTag
            key={oneStatus.value}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            tagValue={oneStatus.value}
            tagText={oneStatus.name}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="relative inline">
      <button
        ref={buttonRef}
        className={
          "mt-2 relative bg-gray-700 bg-[url('/img/filter-icon.svg'),url('/img/arrow-down-icon.svg')] bg-no-repeat bg-[length:15px_15px,12px_12px] border-gray-700 border-2 rounded-[8px] w-full pl-12 pr-12 p-[.60rem] text-left md:w-fit md:pl-10 md:py-[.45rem] md:mr-4 " +
          styles.two_icons_position
        }
        name="language"
        id="language"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Selected bubble */}
        <div
          className={
            "top-[6px] left-[22px] bg-primary-400 border " +
            "border-gray-700 rounded-full w-[14px] h-[14px] " +
            (isAdvancedFilterSelected() ? "absolute" : "hidden")
          }
        />
        Filters
      </button>

      {isOpen && windowWidth >= modalResponsiveBreakpoint && (
        <DropDown ref={dropdownRef}>{responsiveContent}</DropDown>
      )}

      {isOpen && windowWidth < modalResponsiveBreakpoint && (
        <Modal ref={modalRef} isOpen={isOpen}>
          {responsiveContent}
        </Modal>
      )}
    </div>
  );
}

AdvancedResponsiveFilters.propTypes = {
  selectedStatus: PropTypes.string,
  selectedAirDate: PropTypes.string,
  setSelectedStatus: PropTypes.func.isRequired,
  setSelectedAirDate: PropTypes.func.isRequired,
};

const DropDown = React.forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    className="absolute bg-white z-50 text-gray-800 rounded-[8px] p-8 pt-2 w-72 mt-1 left-0"
  >
    ‍ {children}
  </div>
));
DropDown.displayName = "DropDown";

const Modal = React.forwardRef(({ children, isOpen }, ref) => (
  <Dialog
    ref={ref}
    isOpen={isOpen}
    className="w-[90vw] text-gray-800 rounded-[8px] pb-10"
    aria-label="modal window"
  >
    {children}
  </Dialog>
));
Modal.displayName = "Modal";
