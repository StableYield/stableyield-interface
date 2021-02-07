import idx from "idx";
import StableYield_ABI from "../../contracts/StableYield.json";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useState, useEffect } from "react";
/**
 * @name useContractStableYield
 * @param {*} addressContract
 */
export function useContractStableYield(addressContract) {
  const [isSigner, isSignerSet] = useState();
  const [isDeployed, isDeployedSet] = useState();
  const contract = useContract(addressContract, StableYield_ABI);

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
    swapATokens: useContractTransactionLifecycle(
      idx(contract, (_) => _.swapATokens)
    ),
  };
}
