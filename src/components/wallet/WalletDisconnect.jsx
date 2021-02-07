import React from "react";
import { useWeb3React } from "@web3-react/core";
/**
 * @name WalletDisconnect
 * @param {Object} props
 */
export const WalletDisconnect = ({ label, ...props }) => {
  const { deactivate } = useWeb3React();
  const handleDisconnect = () => deactivate();
  return (
    <span onClick={handleDisconnect} {...props}>
      {label}
    </span>
  );
};

export default WalletDisconnect;

WalletDisconnect.defaultProps = {
  label: "Disconnect",
  decimals: 4,
};
