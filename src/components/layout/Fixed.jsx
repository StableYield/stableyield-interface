import { jsx } from "@emotion/core";
import { useLocationEffect } from "./effects";

export const Fixed = ({ as, sx, children, ...props }) => {
  const location = useLocationEffect(props);
  return (
    <div
      sx={{
        position: "fixed",
        ...location,
        ...sx,
      }}
      children={children}
      {...props}
    />
  );
};
