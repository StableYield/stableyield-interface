import React from "react";
import { useWeb3React } from "@web3-react/core";
import styles from "./WalletNetwork.module.css";

/**
 * @name WalletNetwork
 * @param {Object} props
 */
export const WalletNetwork = ({ address, isLink, sx, trim, ...props }) => {
  const { chainId } = useWeb3React();

  if (chainId === 1) return <span className={styles.mainnet} {...props} />;

  return <span className={styles.testnet} {...props} />;
};

export default WalletNetwork;

WalletNetwork.defaultProps = {
  sx: {},
};
