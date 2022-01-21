import React from "react";
import PropTypes from "prop-types";

export default function RatingCircle({ rating }) {
  const roundedRating = Math.round(rating * 10) / 10;
  const endArcDegree = ratingToDegree(roundedRating);
  const arcPath = describeArc(20, 20, 16, 0, endArcDegree);

  function arcColor(degree) {
    if (degree < 90) {
      return "stroke-error-dark";
    } else if (degree <= 180) {
      return "stroke-warning-medium";
    } else {
      return "stroke-success-dark";
    }
  }

  function ratingToDegree(rating) {
    const minDegree = 0;
    const maxDegree = 359;
    const maxRating = 10;
    const minRating = 0;

    if (rating <= minRating) {
      return minDegree;
    } else if (rating >= maxRating) {
      return maxDegree;
    }

    return (rating * maxDegree) / maxRating;
  }

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }

  return (
    <svg width="40" height="40">
      <path
        className={arcColor(endArcDegree)}
        d={arcPath}
        fill="none"
        strokeWidth="3"
      />
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-300 text-body-xs"
      >
        {roundedRating}
      </text>
    </svg>
  );
}

RatingCircle.propTypes = {
  rating: PropTypes.number.isRequired,
};
