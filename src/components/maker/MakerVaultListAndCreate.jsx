import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MakerVaultCreateModalButton } from "../index";
import { shortenAddress, numberTrimDecimals } from "../../helpers/blockchain";
import { useMakerManager } from "../../constants/maker";
import { FormMakerEthDeposit, FormMakerDaiDraw } from "../../forms";

import {
  MakerVaultWithdrawDaiModalButton,
  MakerVaultWithdrawEthModalButton,
} from "../../components";

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
          <div className="">
            <MakerVaultCreateModalButton className="btn-indigo" />
          </div>
          {proxy && (
            <div className="self-center tag-green">
              <span className="text-sm">{proxy}</span>
              <span className="text-sm ml-1"> :Vault Manager</span>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-3">
          <div className="">
            {vaults.map((vault, index) => (
              <Vault key={index} {...vault} vault={vault} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="card flex items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-3xl">No Active Vaults</h1>
        <div className="mt-3">
          <MakerVaultCreateModalButton className="btn-indigo mt-3" />
        </div>
        {proxy && (
          <div className="mt-6">
            <div>{shortenAddress(proxy)}</div>
            <span className="text-sm">Vault Manager</span>
          </div>
        )}
      </div>
    </div>
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
  useEffect(() => {
    console.log(vault, "VAULT");

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

  return (
    <div className="card w-full mb-4 p-6">
      <div className="flex items-center justify-between border-bottom pb-4">
        <div>
          <span className="text-3xl">{ilk}</span>
          <span className="text-3xl font-light ml-3">#{id}</span>
        </div>
        <div></div>
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
          <MakerVaultWithdrawEthModalButton
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
