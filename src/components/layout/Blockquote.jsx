import Box from "./Box";

export const Blockquote = ({ as, sx, children, ...props }) => {
  return (
    <Box
      as="blockquote"
      variant="styles.blockquote"
      sx={{
        zIndex: 10,
        ...sx
      }}
      {...props}
      children={children}
    />
  );
};
