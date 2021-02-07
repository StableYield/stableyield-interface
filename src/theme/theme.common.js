export default {
  borderThinLight: {
    border: 1,
    borderColor: "solitude",
    borderStyle: "solid",
  },
  borderTopThinLight: {
    borderTop: 1,
    borderTopStyle: "solid",
    borderTopColor: "solitude",
  },
  borderBottomThinLight: {
    borderBottom: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "solitude",
  },

  noBorder: {
    borderWidth: 0,
    borderColor: "transparent",
    borderStyle: "none",
  },

  bs0: {
    boxShadow: 0,
  },
  bs1: {
    boxShadow: 1,
  },
  bs2: {
    boxShadow: 2,
  },
  bs3: {
    boxShadow: 3,
  },
  bs4: {
    boxShadow: 4,
  },
  bsSmall: {
    boxShadow: "shadowSmall",
  },
  bsMedium: {
    boxShadow: "shadowMedium",
  },
  bsLarge: {
    boxShadow: "shadowLarge",
  },

  alignCenter: {
    alignItems: "center",
  },
  between: {
    justifyContent: "space-between",
  },
  evenly: {
    justifyContent: "space-evenly",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  gutter3: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& > *": {
      width: "30%",
      marginRright: "5%",
    },
    "& > *:nth-child(3n)": {
      width: "30%",
      marginRright: "5%",
    },
    "& > *:nth-child(n+4)": {
      marginTop: "50px",
    },
  },
  gutter4: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& > *": {
      width: "21%",
      marginRright: "4%",
    },
    "& > *:nth-child(4n)": {
      width: "21%",
      marginRright: "4%",
    },
    "& > *:nth-child(n+5)": {
      marginTop: "30px",
    },
  },

  paper: {
    bg: "paper",
    color: "text",
  },
  neutral: {
    bg: "neutral",
    color: "text",
  },
  soft: {
    borderRadius: 6,
  },
  curved: {
    borderRadius: 12,
  },
  rounded: {
    borderRadius: 32,
  },
  circle: {
    borderRadius: 9999,
  },
  raised: {
    boxShadow: 6,
  },
  pointer: {
    cursor: "pointer",
  },

  block: {
    display: "block",
  },
  inlinBlock: {
    display: "inline-block",
  },
  m0: {
    m: 0,
  },
  my0: {
    my: 0,
  },
  mx0: {
    mx: 0,
  },
  mt0: {
    mt: 0,
  },
  mb0: {
    mb: 0,
  },
  m1: {
    m: 1,
  },
  mt1: {
    mt: 1,
  },
  mb1: {
    mb: 1,
  },
  my1: {
    my: 1,
  },
  mx1: {
    mx: 1,
  },
  m2: {
    m: 1,
  },
  my2: {
    my: 2,
  },
  mt2: {
    mt: 2,
  },
  mb2: {
    mb: 2,
  },

  mx2: {
    mx: 2,
  },
  m3: {
    m: 1,
  },
  my3: {
    my: 3,
  },
  mt3: {
    mt: 3,
  },
  mb3: {
    mb: 3,
  },
  mx3: {
    mx: 3,
  },
  mr1: {
    mr: 1,
  },
  mr2: {
    mr: 2,
  },
  mr3: {
    mr: 3,
  },
  ml1: {
    ml: 1,
  },
  // Padding
  p1: {
    p: 1,
  },
  p2: {
    p: 2,
  },
  p3: {
    p: 3,
  },
  px1: {
    px: 1,
  },
  px2: {
    px: 2,
  },
  px3: {
    px: 3,
  },
  py1: {
    py: 1,
  },
  py2: {
    py: 2,
  },
  py3: {
    py: 3,
  },
  pb1: {
    py: 1,
  },
  pb2: {
    pb: 2,
  },
  pb3: {
    pb: 3,
  },

  widthFill: {
    width: "100%",
  },

  textCenter: {
    textAlign: "center",
  },

  // Tag
  card: {
    bg: "neutral",
    border: "1px solid #e0e0e0",
    borderColor: "borderShadow",
    boxShadow: 0,
    borderRadius: 4,
    color: "text",
    // my: 3,
    p: 3,
  },
  tag: {
    bg: "neutral",
    border: "1px solid #e0e0e0",
    borderColor: "borderShadow",
    boxShadow: 0,
    borderRadius: 8,
    color: "text",
    my: 1,
    p: 2,
  },
  gem: {
    bg: "neutral",
    border: "1px solid #e0e0e0",
    borderColor: "borderShadow",
    boxShadow: 0,
    borderRadius: "8px 22px 8px 14px",
    color: "text",
    my: 1,
    p: 2,
  },
};
