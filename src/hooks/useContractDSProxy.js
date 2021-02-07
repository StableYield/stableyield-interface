import idx from "idx";
import MakerDSProxy_ABI from "../../contracts/maker/MakerDSProxy.json";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useState, useEffect } from "react";
/**
 * @name useContractDSProxy
 * @param {*} addressContract
 */
export function useContractDSProxy(addressContract) {
  const [isSigner, isSignerSet] = useState();
  const [isDeployed, isDeployedSet] = useState();
  const contract = useContract(addressContract, MakerDSProxy_ABI);

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
    execute: useContractTransactionLifecycle(idx(contract, (_) => _.execute)),
  };
}
