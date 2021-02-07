/** @jsx jsx */
import { jsx } from "@emotion/core";
import idx from "idx";
import styled from "@emotion/styled";
import css, { get } from "@styled-system/css";
import { createShouldForwardProp } from "@styled-system/should-forward-prop";
import space from "@styled-system/space";
import color from "@styled-system/color";

/* --- Helpers --- */
const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
]);

const getGradient = (gradient, direction, theme) =>
  css({
    backgroundImage: `linear-gradient(${direction || 0}deg, ${get(
      theme,
      `gradients.${gradient}`
    )})`,
  });

/* --- Theme User Interface --- */
const base = (props) => css(props.__css)(props.theme);

const sx = (props) => {
  let styles = [];
  if (props.sx && props.sx.gradient) {
    styles.push(
      getGradient(props.sx.gradient, props.sx.direction, props.theme)
    );
  }
  styles.push(css(props.sx)(props.theme));
  return styles;
};

/**
 * @function variant
 * @description
 */
const variant = ({ theme, variant, __themeKey = "variants" }) =>
  css(get(theme, __themeKey + "." + variant, get(theme, variant)));
/**
 * @function variants
 * @description
 */
const variants = ({ theme, variants, __variantsKey = "effects", ...props }) => {
  let styles = [];
  let variantList;
  Array.isArray(variants)
    ? variants.map((variant) => {
        variantList = get(theme, variant);
        if (variantList) {
          Object.keys(variantList).forEach((vr) => {
            if (vr === "gradient") {
              styles.push(
                getGradient(
                  variantList["gradient"],
                  idx(props, (_) => _.sx.direction) || variantList["direction"],
                  theme
                )
              );
            }
          });
        }
        styles.push(
          css(get(theme, __variantsKey + "." + variant, get(theme, variant)))
        );
      })
    : null;

  return styles;
};
/**
 * @function variantsShorthand
 * @description
 */
const shorthand = ({ theme, __effectKey = "common", ...props }) =>
  Object.keys(props).map((selector) => {
    return props[selector]
      ? css(get(theme, `${__effectKey}.${selector}`))
      : null;
  });

export const Box = styled("div", {
  shouldForwardProp,
})(
  {
    boxSizing: "border-box",
    position: "relative",
  },
  variants,
  variant,
  shorthand,
  space,
  color,
  base,
  sx,
  (props) => props.css
);

export default Box;
