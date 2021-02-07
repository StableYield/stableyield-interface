import idx from "idx";
import { useContract } from "../state/web3-react-system";
import { useState, useEffect, useMemo } from "react";
/**
 * @name useContractDeployedAndSigner
 * @param {String} address
 * @param {Object} abi
 */
export function useContractDeployedAndSigner(address, abi) {
  const [isSigner, isSignerSet] = useState();
  const [isDeployed, isDeployedSet] = useState();
  const contract = useContract(address, abi);

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

  return useMemo(() => {
    return [contract, isDeployed, isSigner];
  }, [contract, isSigner, isDeployed]);
}
