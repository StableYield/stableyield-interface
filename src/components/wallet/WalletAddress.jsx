import React from "react";
import { useWeb3React } from "@web3-react/core";
import { constants } from "ethers";
import { Address } from "../index";

/**
 * @name WalletAddress
 * @param {Object} props
 */
export const WalletAddress = ({ ...props }) => {
  const { account } = useWeb3React();
  return <Address address={account || constants.AddressZero} {...props} />;
};

WalletAddress.defaultProps = {
  width: 22,
};

export default WalletAddress;
