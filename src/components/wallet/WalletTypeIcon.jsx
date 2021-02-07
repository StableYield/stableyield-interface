import React, { useMemo } from "react";
import { useWeb3System } from "../../state/web3-react-system";

/**
 * @name WalletTypeIcon
 * @param {Object} props
 */
export const WalletTypeIcon = ({ ...props }) => {
  const { walletType } = useWeb3System();
  return useMemo(() => {
    if (walletType === "metamask") {
      return <img src="/wallets/metamask.png" width={22} {...props} />;
    }
    if (walletType === "walletconnect") {
      return <img src="/wallets/walletconnect.svg" width={22} {...props} />;
    }
    if (walletType === "walletlink") {
      return <img src="/wallets/walletlink.png" width={22} {...props} />;
    }
    return <img src="/icons/wallet-coin.svg" width={22} {...props} />;
  }, [walletType]);
};

WalletTypeIcon.defaultProps = {
  width: 22,
};

export default WalletTypeIcon;
