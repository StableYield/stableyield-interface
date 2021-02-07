import idx from "idx";
import { useEffect, useMemo, useState } from "react";
import { useCoinGecko } from "../../state/web3-react-system";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { BigNumber, utils, BigInt } from "ethers";
/**
 * @name ERC20Value
 * @param {Object} props
 */
export const ERC20Value = ({ address, className }) => {
  const coingecko = useCoinGecko();
  const erc20 = useContractERC20(address);
  const tokenPrice = coingecko.tokenPrice(address);
  const balance = erc20.balanceOf();
  const decimals = erc20.decimals();
  const [value, valueSet] = useState();

  useEffect(() => {
    if (
      tokenPrice.isSuccess &&
      tokenPrice.data &&
      balance.isSuccess &&
      balance.data &&
      decimals.isSuccess &&
      decimals.data
      // decimals.data.lte(18)
    ) {
      const balanceFormatted = utils.formatUnits(
        balance.data.toString(),
        decimals.data.toString()
      );
      valueSet(balanceFormatted * tokenPrice.data["usd"]);
    }
  }, [tokenPrice, balance, decimals]);

  return useMemo(() => {
    if (value) {
      return <span className={className}>${value}</span>;
    } else {
      return "$0.00";
    }
  }, [value]);
};
export default ERC20Value;
