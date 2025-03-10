export default {
  body: {
    backgroundColor: "white",
  },
  root: {
    fontFamily: "body",
    lineHeight: "body",
    fontWeight: "body",
  },
  a: {
    color: "blue",
    "&:hover": {
      color: "inherit",
      // opacity: 0.1,
    },
  },
  img: {
    maxWidth: 40,
  },
  h1: {
    fontFamily:
      "Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 5,
  },
  h2: {
    fontFamily:
      "Graphik, -apple-system, BlinkMacSystemFont, Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 2,
  },
  h3: {
    fontFamily:
      "Graphik, -apple-system, BlinkMacSystemFont, Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 3,
  },
  h4: {
    fontFamily:
      "Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 2,
  },
  h5: {
    fontFamily:
      "Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 1,
  },
  h6: {
    fontFamily:
      "Roboto,-apple-system,BlinkMacSystemFont,'Segoe UI', Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
    lineHeight: "normal",
    fontWeight: "normal",
    fontSize: 0,
  },
  pre: {
    fontFamily: "monospace",
    overflowX: "auto",
    code: {
      color: "inherit",
    },
  },
  code: {
    fontFamily: "monospace",
    fontSize: "inherit",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  th: {
    textAlign: "left",
    borderBottomStyle: "solid",
  },
  td: {
    textAlign: "left",
    borderBottomStyle: "solid",
  },
  blockquote: {
    fontSize: [0, 0, 1],
    fontFamily: "monospace",
    "&:before": {
      // content: '""',
      content: "Read this:",
      display: "block",
      width: 32,
      height: 32,
      backgroundColor: "tomato",
    },
  },
};
