import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../state/web3-react-system/lib/helpers";

/**
 * @name WalletBalance
 * @param {Object} props
 */
export const WalletBalance = ({ address, decimals, ...props }) => {
  const [balance, setBalance] = React.useState("0.00");
  const { account, chainId, library } = useWeb3React();
  useEffect(() => {
    if (account && library) {
      library.getBalance(account).then((balance) => {
        setBalance(
          numberTrimDecimals(transformTokenToHuman(balance), decimals)
        );
      });
    } else {
      setBalance("0.00");
    }
  }, [account, chainId]);

  return <span {...props}>{balance}</span>;
};

export default WalletBalance;

WalletBalance.defaultProps = {
  decimals: 4,
  sx: {},
};
