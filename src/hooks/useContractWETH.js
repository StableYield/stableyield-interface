import idx from "idx";
import WETH_ABI from "../../contracts/WETH.json";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useState, useEffect } from "react";
/**
 * @name useContractWETH
 * @param {*} addressContract
 */
export function useContractWETH(addressContract) {
  const [isSigner, isSignerSet] = useState();
  const [isDeployed, isDeployedSet] = useState();
  const contract = useContract(addressContract, WETH_ABI);

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
    deposit: useContractTransactionLifecycle(idx(contract, (_) => _.deposit)),
    withdraw: useContractTransactionLifecycle(idx(contract, (_) => _.withdraw)),
  };
}
