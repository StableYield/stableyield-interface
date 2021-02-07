import { WalletBalance } from "../components";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3System } from "../state/web3-react-system";
import Link from "next/link";

/**
 * @name PurchaseEthOrGenerateStablecoin
 * @param {Object} props
 */
export const PurchaseEthOrGenerateStablecoin = (props) => {
  const [balance, setBalance] = useState(undefined);

  const { account, library } = useWeb3React();
  useEffect(() => {
    if (account && library) {
      library.getBalance(account).then((balance) => {
        if (balance.gt(0)) {
          setBalance(true);
        } else {
          setBalance(false);
        }
      });
    } else {
      setBalance("0.00");
    }
  }, [account]);

  return useMemo(() => {
    if (typeof balance == "undefined") return <span>Loading</span>;
    if (balance) return <OpenVaultAndWithdrawStablecoin />;
    if (!balance) return <CryptocurrencyPurchaseCard />;
  }, [balance]);
};

const OpenVaultAndWithdrawStablecoin = (props) => {
  const { makerVaults } = useWeb3System();

  // console.log(makerVaults, "makerVaultsmakerVaults");

  if (!makerVaults) {
    return (
      <div className="card gradient-blue text-white flex justify-between p-10">
        <div>
          <h3 className="text-4xl font-bold text-shadow-md">
            Mint Stablecoins (Keep ETH Exposure)
          </h3>
          <p className="mt-0 p-0 font-light text-shadow-md">
            <span className="font-light">
              Open a personal lending vault, deposit/lock ETH and mint
              stablecoins.
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <Link href="/article/maker-vaults">
            <a>
              <span>Learn More</span>
            </a>
          </Link>
          <Link href="/dashboard/maker/vaults">
            <a>
              <button className="btn-green ml-3">Open Stablecoin Vault</button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

const CryptocurrencyPurchaseCard = (props) => {
  return (
    <div className="card mt-5 flex items-center justify-between p-6">
      <div className="flex items-center">
        <button className="btn-blue mr-3">Purchase Cryptocurrency</button>
        <span>Earn Cryptocurrency</span>
      </div>
      <div className="text-right">
        <span className="block text-4xl">
          <WalletBalance /> Ξ
        </span>
        <span className="tag-green rounded-md mt-1">ETH Balance</span>
      </div>
    </div>
  );
};

export default PurchaseEthOrGenerateStablecoin;
