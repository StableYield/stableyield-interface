import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Span } from "../layout";

/**
 * @name EpochToCalendarDate
 * @param {*} props
 */
export const EpochToCalendarDate = ({ className, ...props }) => {
  const SecondsToMill = 1000;
  const [epoch] = useState(props.date);
  const [date, setDate] = useState(0);

  useEffect(() => {
    const DateFromMillis = DateTime.fromMillis(props.date * SecondsToMill);
    if (DateFromMillis.isValid)
      setDate(DateFromMillis.toLocaleString(DateTime.DATE_FULL));
  }, [epoch]);

  return date ? <span className={className}>{date}</span> : null;
};

export default EpochToCalendarDate;
