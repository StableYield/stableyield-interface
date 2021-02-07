import React from "react";
import { useWeb3React } from "@web3-react/core";
import { constants } from "ethers";
import makeBlockie from "ethereum-blockies-base64";

/**
 * @name WalletBlockie
 * @param {Object} props
 */
export const WalletBlockie = ({ address, width, sx, ...props }) => {
  const { account } = useWeb3React();
  const user = address ? address : account ? account : constants.AddressZero;
  return !user ? null : (
    <img src={makeBlockie(user)} width={width} {...props} />
  );
};

WalletBlockie.defaultProps = {
  width: 22,
};

export default WalletBlockie;
