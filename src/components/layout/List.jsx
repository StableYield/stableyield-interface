import React from "react";
import Box from "./Box";

export const List = React.forwardRef((props, ref) => (
  <Box ref={ref} as="ul" variant="styles.list" {...props} __themeKey="list" />
));
