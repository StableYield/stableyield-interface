module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // height: {
    //   "42rem": "42rem",
    //   "50rems": "50rem",
    //   "62rem": "62rem",
    //   "h-full": "62rem",
    // },
    extend: {
      height: {
        "42rem": "42rem",
        "50rem": "50rem",
        "62rem": "62rem",
      },
      backgroundImage: (theme) => ({
        "uni-token": "url('/tokens/uni.svg')",
      }),
      rotate: {
        360: "360deg",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
