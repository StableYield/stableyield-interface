import idx from "idx";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { numberTrimDecimals } from "../helpers/blockchain";
import { useMakerManager } from "../constants/maker";

import {
  MakerVaultCreateModalButton,
  MakerVaultWithdrawDaiModalButton,
  MakerVaultWithdrawEthModalButton,
  MakerVaultDepositEthModalButton,
} from "../components";
import Link from "next/link";

/**
 * @name MakerVaultListAndCreate
 * @param {Object} props
 */
export const MakerVaultListAndCreate = (props) => {
  const [proxy, proxySet] = useState(false);
  const [vaults, vaultsSet] = useState(false);
  const { account } = useWeb3React();

  const { maker, makerManager } = useMakerManager();
  useEffect(() => {
    if (maker && makerManager && account) {
      (async () => {
        const proxyAddress = await maker.service("proxy").currentProxy();
        if (proxyAddress) {
          const data = await makerManager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects
          if (data.length > 0) {
            const vaults = data.map((vault) => {
              return makerManager.getCdp(vault.id);
            });
            Promise.all(vaults).then((res) => {
              vaultsSet(res);
            });
            proxySet(proxyAddress);
          }
        }
      })();
    }
  }, [maker, makerManager]);

  if (vaults.length > 0) {
    return (
      <>
        <div className="flex items-center justify-between">
          <span className="tag-greens text-lg">
            <strong>Vault Count:</strong> {vaults.length}
          </span>
          <div className="flex items-center">
            <Link href="/article/personal-loan">
              <a className="text-gray-600">Learn More</a>
            </Link>
            <MakerVaultCreateModalButton className="btn-indigo ml-4" />
          </div>
        </div>
        <div className="flex flex-col mt-5">
          {vaults.map((vault, index) => (
            <Vault key={index} {...vault} vault={vault} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="tag-greens text-lg">
          <strong>Vault Count:</strong> 0
        </span>
        <div className="flex items-center">
          <Link href="/article/personal-loan">
            <a className="text-gray-600">Learn More</a>
          </Link>
          <MakerVaultCreateModalButton className="btn-indigo ml-4" />
        </div>
      </div>
      <div className="card p-10 text-center mt-5">
        <h2 className="text-3xl font-light">No Active Vaults</h2>
      </div>
    </>
  );
};

/**
 * @name Vault
 * @param {*} props
 */
const Vault = ({ id, ilk, vault, ...props }) => {
  const [collateralAvailable, collateralAvailableSet] = useState();
  const [collateralAmount, collateralAmountSet] = useState();
  const [daiAvailable, daiAvailableSet] = useState();
  const [debtValue, debtValueSet] = useState();
  const [vaultDetails, vaultDetailsSet] = useState();

  useEffect(() => {
    console.log(vault, "VAULT");

    console.log(
      vault.collateralizationRatio._amount.lt(2.0),
      "vault.collateralizationRatio._amount"
    );
    vaultDetailsSet({
      ratioStatusBelow2: vault.collateralizationRatio._amount.lt(2.0),
      collateralizationRatio: numberTrimDecimals(
        vault.collateralizationRatio._amount.toString()
      ),
      liquidationPrice: numberTrimDecimals(
        vault.liquidationPrice._amount.toString()
      ),
      minSafeCollateralAmount: numberTrimDecimals(
        vault.minSafeCollateralAmount._amount.toString()
      ),
      isSafe: vault.isSafe,
    });

    // Collateral
    collateralAmountSet(
      numberTrimDecimals(vault.collateralAmount._amount.toString())
    );
    collateralAvailableSet(
      numberTrimDecimals(vault.collateralAvailable._amount.toString())
    );

    // DAI
    daiAvailableSet(numberTrimDecimals(vault.daiAvailable._amount.toString()));
    debtValueSet(numberTrimDecimals(vault.debtValue._amount.toString()));
  }, []);

  const ratioClassName = classnames(
    "text-right ml-3 tag-green flex flex-col px-6 py-2",
    {
      "tag-orange": idx(vaultDetails, (_) => _.ratioStatusBelow2),
    }
  );
  const ratioClassNameLabel = classnames("font-black text-xs", {
    "text-yellow-700": idx(vaultDetails, (_) => _.ratioStatusBelow2),
  });
  const ratioClassNameValue = classnames("block text-xl text-center", {
    "text-yellow-600": idx(vaultDetails, (_) => _.ratioStatusBelow2),
  });

  return (
    <div className="card w-full mb-4 p-6">
      <div className="flex items-center justify-between border-bottom pb-4">
        <div>
          <span className="text-3xl">{ilk}</span>
          <span className="text-3xl font-light ml-3">#{id}</span>
          <div>
            <Link href={`/dashboard/maker/vault/${id}`}>
              <a className="text-blue-500 hover:text-blue-600">
                Full Vault Details
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-4 text-center">
            <span className="block text-lg">
              {idx(vaultDetails, (_) => _.minSafeCollateralAmount)} Ξ
            </span>
            <span className="font-black text-xs text-gray-500">
              Min ETH Amount
            </span>
          </div>
          <div className="ml-4 text-center">
            <span className="block text-lg">
              {idx(vaultDetails, (_) => _.liquidationPrice)} USD
            </span>
            <span className="font-black text-xs text-gray-500">
              Liquidation Price
            </span>
          </div>
          <div className={ratioClassName}>
            <span className={ratioClassNameValue}>
              {idx(vaultDetails, (_) => _.collateralizationRatio)} %
            </span>
            <span className={ratioClassNameLabel}>Collateralization</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-2 md:gap-x-10 md:gap-y-6 w-full mt-4">
        {/* DAI Available : Begin */}
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-2xl">
              {daiAvailable} {vault.daiAvailable.symbol}
            </span>
            <span className="text-sm font-bold uppercase text-gray-400">
              Available DAI
            </span>
          </div>
          <MakerVaultWithdrawDaiModalButton
            className="btn-green btn-sm"
            cdpID={id}
          />
        </div>
        {/* Available : End */}
        {/* Debt : Begin */}
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-xl">
              {debtValue} {vault.debtValue.symbol}
            </span>
            <span className="text-sm font-bold uppercase text-gray-400">
              DAI Debt
            </span>
          </div>
          <MakerVaultWithdrawDaiModalButton
            className="btn-indigo btn-sm"
            cdpID={id}
            label="DAI Deposit"
          />
        </div>
        {/* Debt : End */}
        {/* Collateral Available : Begin */}
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-xl">
              {collateralAmount} {vault.collateralAmount.symbol}
            </span>
            <span className="text-sm font-bold uppercase text-gray-400">
              Deposited/Locked
            </span>
          </div>
          <MakerVaultDepositEthModalButton
            className="btn-gray btn-sm"
            cdpID={id}
            label="Deposit ETH"
          />
        </div>
        {/* Collateral Available : End */}
        {/* Collateral Available : Begin */}
        <div className="flex justify-between items-center">
          <div>
            <span className="block text-xl">
              {collateralAvailable} {vault.collateralAvailable.symbol}
            </span>
            <span className="text-sm font-bold uppercase text-gray-400">
              Available to Withdraw
            </span>
          </div>
          <MakerVaultWithdrawEthModalButton
            className="btn-gray btn-sm"
            cdpID={id}
          />
        </div>
        {/* Collateral Available : End */}
      </div>
    </div>
  );
};

export default MakerVaultListAndCreate;
