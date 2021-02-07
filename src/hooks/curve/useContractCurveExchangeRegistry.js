import idx from "idx";
import { useCallback } from "react";
import { useQuery } from "react-query";

import CurveExchangeRegistry_ABI from "../../../contracts/curve/CurveExchangeRegistry.json";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";
/**
 * @name useContractCurveExchangeRegistry
 * @param {*} address
 */
export function useContractCurveExchangeRegistry(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    CurveExchangeRegistry_ABI
  );

  return {
    contract,
    isDeployed,
    isSigner,
    // Read

    // Write
    exchange: useContractTransactionLifecycle(
      idx(
        contract,
        (_) => _["exchange(address,address,address,uint256,uint256)"]
      )
    ),
  };
}
