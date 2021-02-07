import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Span } from "../layout";

const UTCToCalendarDate = (props) => {
  const [utc] = useState(props.utc);
  const [date, setDate] = useState(0);

  useEffect(() => {
    const DateFromMillis = DateTime.fromISO(utc);
    if (DateFromMillis.isValid)
      setDate(DateFromMillis.toLocaleString(DateTime.DATE_FULL));
  }, [utc]);

  return date ? <Span>{date}</Span> : null;
};

export default UTCToCalendarDate;
