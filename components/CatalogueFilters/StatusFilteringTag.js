import React from "react";

export default function StatusFilteringTag({
  tagValue,
  tagText,
  selectedStatus,
  setSelectedStatus,
}) {
  const style = () => {
    const commonStyles = "rounded-[8px] px-3 py-1 mr-1 border h-fit mb-1 ";
    let customStyles;
    if (selectedStatus === tagValue) {
      customStyles =
        "bg-primary-100 text-primary-700 font-medium border-primary-100";
    } else {
      customStyles = "text-gray-400 border-gray-300";
    }
    return commonStyles + customStyles;
  };

  const handleOnClick = () => {
    if (tagValue === selectedStatus) {
      // unselect
      setSelectedStatus(undefined);
    } else {
      setSelectedStatus(tagValue);
    }
  };

  return (
    <button className={style()} onClick={() => handleOnClick()}>
      {tagText}
    </button>
  );
}

import PropTypes from "prop-types";

StatusFilteringTag.propTypes = {
  tagValue: PropTypes.string.isRequired,
  tagText: PropTypes.string.isRequired,
  selectedStatus: PropTypes.string,
  setSelectedStatus: PropTypes.func.isRequired,
};
