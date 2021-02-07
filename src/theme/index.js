import base from "./theme.base";
import button from "./theme.buttons";
import colors from "./theme.colors";
import common from "./theme.common";
import components from "./theme.components";
import effects from "./theme.effects";
import images from "./theme.images";
import styles from "./theme.style";
import shadows from "./theme.shadows";
import regions from "./theme.regions";
import text from "./theme.text";
import layout from "./theme.positioning";
import sections from "./theme.sections";
import backgrounds from "./theme.backgrounds";


export default {
  useLocalStorage: false,
  ...base,
  colors: colors,
  components,
  common,
  button,
  label: {
    color: "muted",
    fontSize: 1,
  },
  backgrounds,
  sections,
  styles,
  images,
  effects,
  shadows,
  regions,
  layout,
  text,
};
