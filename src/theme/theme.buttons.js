export default {
  core: {
    gradient: "gray",
    color: "charcoal",
    cursor: "pointer",
    border: 0,
    padding: 2,
    borderRadius: 4,
    boxShadow: 0,
    p: 3,
    position: "relative",
    "&:hover": {
      boxShadow: 1,
      top: "-2px",
    },
    "&:active": {
      boxShadow: 0,
      top: "1px",
    },
  },

  xl: {
    fontSize: [2, 2, 3],
    px: 4,
    py: 3,
  },

  fill: {
    width: '100%'
  },

  curve: {
    borderRadius: 12,
  },
  rounded: {
    borderRadius: 12,
  },
  pill: {
    borderRadius: 32,
  },
  sm: {
    fontSize: 0,
    p: 2,
  },
  md: {
    fontSize: 2,
    p: "10px",
  },
  lg: {
    fontSize: 3,
    p: "12px",
    px: "16px",
  },
  primary: {
    bg: "primary",
    color: "white",
    transition: "0.2s all",
    position: 'relative',
      top: 0,
      '&:hover': {
        boxShadow: 1,
        top: '-2px',
      },
      '&:active': {
        boxShadow: 0,
        top: '1px',
      },
  },
  secondary: {
    bg: "secondary",
    color: "white",
  },
  white: {
    bg: "paper",
    border: "1px solid #e0e0e0",
    borderColor: "borderShadow",
    boxShadow: 0,
    borderRadius: 4,
    color: "text",
  },
  disabled: {
    bg: "muted",
    color: "text",
    boxShadow: "none",
    "&:hover": {
      boxShadow: 0,
      top: 0,
    },
    "&:active": {
      boxShadow: 0,
      top: 0,
    },
  },
  red: {
    bg: "red",
    color: "white",
  },
  blue: {
    bg: "blue",
    gradient: "blue",
    border: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    color: "white",
    transition: "0.2s all",
    color: "white",
    "&:hover": {
      bg: "white",
      color: "blue",
      borderColor: "blue",
      boxShadow: 0,
      top: 0,
    },
  },
  green: {
    bg: "green",
    color: "white",
    border: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    color: "white",
    transition: "0.2s all",
    color: "white",
    "&:hover": {
      bg: "white",
      color: "green",
      borderColor: "green",
      boxShadow: 0,
      top: 0,
    },
  },
  orange: {
    bg: "orange",
    color: "white",
  },
  purple: {
    bg: "purple",
    color: "white",
  },
  dark: {
    bg: "black",
    color: "white",
    border: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    color: "white",
    transition: "0.2s all",
    "&:hover": {
      bg: "white",
      color: "black",
      borderColor: "black",
      boxShadow: 0,
      top: 0,
    },
  },
  muted: {
    bg: "white",
    color: "charcoal",
    border: 2,
    borderColor: "solitude",
    borderStyle: "solid",
    transition: "0.2s all",
    "&:hover": {
      bg: "solitude",
      color: "black",
      borderColor: "solitude",
      top: 0,
    },
  },
};
