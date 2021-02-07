import idx from "idx";
import { utils } from "ethers";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import AaveProtocolDataProvider_ABI from "../../contracts/aave/AaveProtocolDataProvider";
import { useContractTransactionLifecycle } from "../state/web3-react-system";
import { useContractDeployedAndSigner } from "./useContractDeployedAndSigner";

/**
 * @name useContractAaveProtocolDataProvider
 * @param {*} addressContract
 */
export function useContractAaveProtocolDataProvider(addressContract) {
  const { account } = useWeb3React();
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    addressContract,
    AaveProtocolDataProvider_ABI
  );

  const getReserveTokensAddresses = useCallback(
    (asset) => {
      return useQuery(`aave-${asset}`, async () => {
        if (!contract && !asset) {
          throw new Error("Unset variable");
        } else {
          const data = await contract.getReserveTokensAddresses(
            utils.getAddress(asset)
          );
          return data;
        }
      });
    },
    [contract]
  );

  const getUserReserveData = useCallback(
    (asset, account) => {
      console.log(contract, "contract");
      return useQuery(`token-${addressContract}-data-${asset}`, async () => {
        if (!contract) return null;
        return await contract.getUserReserveData(asset, account);
      });
    },
    [account, contract]
  );

  return {
    contract,
    isDeployed,
    isSigner,
    // Read
    getUserReserveData,
    getReserveTokensAddresses: getReserveTokensAddresses,
    // Write
    exchange_underlying: useContractTransactionLifecycle(
      idx(contract, (_) => _.exchange_underlying)
    ),
    exchange: useContractTransactionLifecycle(idx(contract, (_) => _.exchange)),
    remove_liquidity: useContractTransactionLifecycle(
      idx(contract, (_) => _.remove_liquidity)
    ),
    remove_liquidity_imbalance: useContractTransactionLifecycle(
      idx(contract, (_) => _.remove_liquidity_imbalance)
    ),
  };
}
