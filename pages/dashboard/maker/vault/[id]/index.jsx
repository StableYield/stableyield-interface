import idx from "idx";
import Link from "next/link";
import classnames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { useMakerManager } from "../../../../../src/constants/maker";
import { numberTrimDecimals } from "../../../../../src/helpers/blockchain";
import {
  MakerVaultCreateModalButton,
  MakerVaultWithdrawDaiModalButton,
  MakerVaultWithdrawEthModalButton,
  MakerVaultDepositEthModalButton,
  LoadingBox,
} from "../../../../../src/components";

/**
 * @name VaultPage
 * @param {Object} props
 */
export const VaultPage = (props) => {
  const router = useRouter();
  const { maker, makerManager } = useMakerManager();
  const [vault, vaultSet] = useState();
  const [vaultDetails, vaultDetailsSet] = useState();

  console.log(router, props, "router");
  useEffect(() => {
    if (maker && makerManager) {
      (async () => {
        const vault = await makerManager.getCdp(Number(router.query.id));
        vaultSet(vault);
      })();
    }
  }, [maker, makerManager]);

  useEffect(() => {
    console.log(vault, "vault");
  }, [vault]);

  useEffect(() => {
    if (vault) {
      console.log(vault, "VAULT");

      console.log(
        vault.collateralizationRatio._amount.lt(2.0),
        "vault.collateralizationRatio._amount"
      );
      vaultDetailsSet({
        id: vault.id,
        ilk: vault.ilk,
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
        collateralAmount: numberTrimDecimals(
          vault.collateralAmount._amount.toString()
        ),
        collateralAvailable: numberTrimDecimals(
          vault.collateralAvailable._amount.toString()
        ),

        // DAI
        daiAvailable: numberTrimDecimals(vault.daiAvailable._amount.toString()),
        debtValue: numberTrimDecimals(vault.debtValue._amount.toString()),
      });

      // Collateral
    }
  }, [vault]);

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

  return useMemo(() => {
    if (vaultDetails) {
      return (
        <div className="card w-full mb-4 p-6">
          <div className="flex items-center justify-between border-bottom pb-4">
            <div>
              <span className="text-3xl">{vaultDetails.ilk}</span>
              <span className="text-3xl font-light ml-3">
                #{vaultDetails.id}
              </span>
              <div>
                <Link href={`/dashboard/maker/vault/${vaultDetails.id}`}>
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
                  {vaultDetails.daiAvailable}
                  {/* {vaultDetails.daiAvailable.symbol} */}
                </span>
                <span className="text-sm font-bold uppercase text-gray-400">
                  Available DAI
                </span>
              </div>
              <MakerVaultWithdrawDaiModalButton
                className="btn-green btn-sm"
                cdpID={vaultDetails.id}
              />
            </div>
            {/* Available : End */}
            {/* Debt : Begin */}
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-xl">
                  {/* {vaultDetails.debtValue} {vaultDetails.debtValue.symbol} */}
                </span>
                <span className="text-sm font-bold uppercase text-gray-400">
                  DAI Debt
                </span>
              </div>
              <MakerVaultWithdrawDaiModalButton
                className="btn-indigo btn-sm"
                cdpID={vaultDetails.id}
                label="DAI Deposit"
              />
            </div>
            {/* Debt : End */}
            {/* Collateral Available : Begin */}
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-xl">
                  {vaultDetails.collateralAmount}
                  {/* {vaultDetails.collateralAmount.symbol} */}
                </span>
                <span className="text-sm font-bold uppercase text-gray-400">
                  Deposited/Locked
                </span>
              </div>
              <MakerVaultDepositEthModalButton
                className="btn-gray btn-sm"
                cdpID={vaultDetails.id}
                label="Deposit ETH"
              />
            </div>
            {/* Collateral Available : End */}
            {/* Collateral Available : Begin */}
            <div className="flex justify-between items-center">
              <div>
                <span className="block text-xl">
                  {vaultDetails.collateralAvailable}
                  {/* {vaultDetails.collateralAvailable.symbol} */}
                </span>
                <span className="text-sm font-bold uppercase text-gray-400">
                  Available to Withdraw
                </span>
              </div>
              <MakerVaultWithdrawEthModalButton
                className="btn-gray btn-sm"
                cdpID={vaultDetails.id}
              />
            </div>
            {/* Collateral Available : End */}
          </div>
        </div>
      );
    } else {
      return (
        <LoadingBox
          label="Loading Vault Details"
          classNameContainer="mx-auto w-full"
        />
      );
    }
  }, [vaultDetails]);
};
export default VaultPage;
