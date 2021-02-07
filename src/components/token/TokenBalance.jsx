import { useMemo } from "react";
import { Span } from "../layout";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../state/web3-react-system/lib/helpers";
/**
 * @name TokenBalance
 * @param {Object} props
 */
export const TokenBalance = ({ balance, decimals, sx, ...props }) => {
  return useMemo(() => {
    return (
      <div {...props}>
        {numberTrimDecimals(transformTokenToHuman(balance, decimals))}
      </div>
    );
  }, [balance]);
};
export default TokenBalance;

TokenBalance.defaultProps = {
  balance: "0",
  decimals: 4,
  // sx: {},
};
