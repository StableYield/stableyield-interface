import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Span } from "../layout";

const UTCToRelativeDate = (props) => {
  const [date] = useState(props.date);
  const [relative, setRelative] = useState(0);

  useEffect(() => {
    const DateFromMillis = DateTime.fromISO(date);
    if (DateFromMillis.isValid) setRelative(DateFromMillis.toRelative());
  }, [date]);

  return relative ? <Span sx={props.sx}>{relative}</Span> : null;
};

export default UTCToRelativeDate;
