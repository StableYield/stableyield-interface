import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Span } from "../layout";

/**
 * @name EpochToRelativeDate
 * @param {*} props
 */
export const EpochToRelativeDate = ({ className, ...props }) => {
  const SecondsToMill = 1000;
  const [epoch] = useState(props.date);
  const [relative, setRelative] = useState(0);

  useEffect(() => {
    const DateFromMillis = DateTime.fromMillis(props.date * SecondsToMill);
    if (DateFromMillis.isValid) setRelative(DateFromMillis.toRelative());
  }, [epoch]);

  return relative ? <span className={className}>{relative}</span> : null;
};

export default EpochToRelativeDate;
