// import React from "react";
// import Box from "./Box";

// export const Link = React.forwardRef((props, ref) => (
//   <Box ref={ref} as="a" variant="styles.a" {...props} __themeKey="link" />
// ));

import React from "react";
import Box from "./Box";
import NextLink from "next/link";

export const Link = ({ href, ...props }) => (
  <NextLink href={href}>
    <Box as="a" {...props} variant="styles.a" __themeKey="link"></Box>
  </NextLink>
);
