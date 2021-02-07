import React from "react";
import Box from "./Box";

export const Flex = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    __variantsKey="common"
    __css={{
      display: "flex",
    }}
    {...props}
  />
));
