import idx from "idx";
import { useMemo } from "react";
import { useCoinGecko } from "../../state/web3-react-system";
import {
  transformTokenToHuman,
  numberTrimDecimals,
  transformDecimalsToWad,
} from "../../helpers/blockchain";
/**
 * @name ERC20Price
 * @param {Object} props
 */
export const ERC20Price = ({ address, className }) => {
  const coingecko = useCoinGecko();

  const tokenPrice = coingecko.tokenPrice(address);

  console.log(tokenPrice, "tokenPrice");

  return useMemo(() => {
    if (tokenPrice.data) {
      return (
        <span className={className}>
          ${idx(tokenPrice, (_) => _.data["usd"])}
        </span>
      );
    } else {
      return null;
    }
  }, [tokenPrice]);
};
export default ERC20Price;
