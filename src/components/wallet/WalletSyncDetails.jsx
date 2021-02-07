import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useWeb3System } from "../../state/web3-react-system";
/**
 * @name WalletSyncDetails
 * @param {Object} props
 */
export const WalletSyncDetails = ({ label, ...props }) => {
  const { lastBlockSync, lastNonceSync } = useWeb3System();
  const { account, library, deactivate } = useWeb3React();

  const handleSyncBlockchain = () => {};

  return (
    <div {...props}>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className="text-md">{lastNonceSync}</span>
          <span className="text-xs">Nonce Sync</span>
        </div>
        <div className="ml-3 flex flex-col items-center">
          <span className="text-md">{lastBlockSync}</span>
          <span className="text-xs">BlockNumber Sync</span>
        </div>
        <span
          onClick={handleSyncBlockchain}
          className="cursor-pointer ml-4 transition-all duration-500 transform hover:rotate-360 origin-center position-relative"
        >
          🔄
        </span>
      </div>
    </div>
  );
};

export default WalletSyncDetails;

WalletSyncDetails.defaultProps = {
  label: "Disconnect",
  decimals: 4,
};
