import React from "react";
import { useWeb3React } from "@web3-react/core";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../state/web3-react-system/lib/helpers";

/**
 * @name WalletNonce
 * @param {Object} props
 */
export const WalletNonce = ({ address, decimals, ...props }) => {
  const [count, setCount] = React.useState(0);
  const { account, library } = useWeb3React();
  React.useEffect(() => {
    if (account && library) {
      library.getTransactionCount(account).then((count) => {
        setCount(count);
      });
    } else {
      setCount("0");
    }
  }, [account]);

  return <span {...props}>{count}</span>;
};

export default WalletNonce;

WalletNonce.defaultProps = {
  decimals: 4,
  sx: {},
};
