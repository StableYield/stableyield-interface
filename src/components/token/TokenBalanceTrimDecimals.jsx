import { useMemo } from "react";
import { Span } from "../layout";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../state/web3-react-system/lib/helpers";
/**
 * @name TokenBalanceTrimDecimals
 * @param {Object} props
 */
export const TokenBalanceTrimDecimals = ({
  balance,
  decimals,
  sx,
  ...props
}) => {
  return useMemo(() => {
    return <Span sx={sx}>{numberTrimDecimals(balance, decimals)}</Span>;
  }, [balance]);
};
export default TokenBalanceTrimDecimals;

TokenBalanceTrimDecimals.defaultProps = {
  balance: "0",
  decimals: 4,
  // sx: {},
};
