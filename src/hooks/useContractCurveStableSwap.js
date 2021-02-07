import idx from "idx";
import StableSwap_ABI from "../../contracts/curve/StableSwap.json";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useState, useEffect } from "react";
/**
 * @name useContractCurveStableSwap
 * @param {*} addressContract
 */
export function useContractCurveStableSwap(addressContract) {
  const [isSigner, isSignerSet] = useState();
  const [isDeployed, isDeployedSet] = useState();
  const contract = useContract(addressContract, StableSwap_ABI);

  useEffect(() => {
    if (contract)
      (async () => {
        try {
          await contract.deployed();
          isDeployedSet(true);
        } catch (error) {
          isDeployedSet(false);
        }
        isSignerSet(idx(contract, (_) => _.signer._isSigner));
      })();
  }, [contract]);

  return {
    isDeployed: isDeployed,
    isSigner: isSigner,
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
