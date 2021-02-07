import { utils } from "ethers";
import idx from "idx";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import ICreditDelegationToken_ABI from "../../contracts/aave/ICreditDelegationToken.json";
import { useContractTransactionLifecycle } from "../state/web3-react-system";
import { useContractDeployedAndSigner } from "./useContractDeployedAndSigner";

/**
 * @name useContractAaveDebtToken
 * @param {*} addressContract
 */
export function useContractAaveDebtToken(addressContract) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    addressContract,
    ICreditDelegationToken_ABI
  );

  const borrowAllowance = useCallback(
    (delegator, delegatee) => {
      return useQuery(`aave-credit-allowance-${delegatee}`, async () => {
        if (!contract && !delegator && !delegatee) {
          throw new Error("Unset variable");
        } else {
          const data = await contract.borrowAllowance(delegator, delegatee);
          return data;
        }
      });
    },
    [contract]
  );

  return {
    contract,
    isDeployed,
    isSigner,
    // Read
    borrowAllowance: borrowAllowance,
    // Write
    approveDelegation: useContractTransactionLifecycle(
      idx(contract, (_) => _.approveDelegation)
    ),
  };
}
