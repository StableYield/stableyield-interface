import { useCallback } from "react";
import { useQuery } from "react-query";

import CurveRegistry_ABI from "../../../contracts/curve/CurveRegistry.json";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";

/**
 * @name useContractCurveRegistry
 * @param {*} address
 */
export function useContractCurveRegistry(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    CurveRegistry_ABI
  );

  console.log(contract, "contract");

  const find_pool_for_coins = useCallback(
    (token1, token2) => {
      return useQuery(`stableyieldvault-symbol`, async () => {
        if (!contract) throw new Error("Contract undefined");
        const user = address ? address : account;
        return await contract.find_pool_for_coins(token1, token2);
      });
    },
    [contract]
  );
  const get_coin_indices = useCallback(
    (pool, token1, token2) => {
      return useQuery(`stableyieldvault-symbol`, async () => {
        if (!contract) throw new Error("Contract undefined");
        return await contract.get_coin_indices(pool, token1, token2);
      });
    },
    [contract]
  );

  return {
    contract,
    isDeployed,
    isSigner,
    // Read
    find_pool_for_coins,
    get_coin_indices,
  };
}
