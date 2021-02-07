import { utils } from "ethers";
import idx from "idx";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import CreditLineFactory_ABI from "../../../contracts/stableyield/CreditLineFactory.json";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";

/**
 * @name useContractCreditLineERC20
 * @param {*} address
 */
export function useContractCreditLineERC20(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    CreditLineFactory_ABI
  );

  const assetToBorrow = useCallback(() => {
    return useQuery(`credit-line-asset-${address}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.assetToBorrow();
        return data;
      }
    });
  }, [contract]);
  const amountToBorrow = useCallback(() => {
    return useQuery(`credit-line-amount-${address}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.amountToBorrow();
        return data;
      }
    });
  }, [contract]);
  const creditLineActive = useCallback(() => {
    return useQuery(`credit-line-is-active-${address}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.creditLineActive();
        return data;
      }
    });
  }, [contract]);

  return {
    contract,
    isDeployed,
    isSigner,
    // Read
    assetToBorrow,
    amountToBorrow,
    creditLineActive,
    // Write
    creditLineActivated: useContractTransactionLifecycle(
      idx(contract, (_) => _.creditLineActivated)
    ),
    claimCollateral: useContractTransactionLifecycle(
      idx(contract, (_) => _.claimCollateral)
    ),
    borrow: useContractTransactionLifecycle(idx(contract, (_) => _.borrow)),
    repay: useContractTransactionLifecycle(idx(contract, (_) => _.repay)),
    reclaimCollateral: useContractTransactionLifecycle(
      idx(contract, (_) => _.reclaimCollateral)
    ),
    terminate: useContractTransactionLifecycle(
      idx(contract, (_) => _.terminate)
    ),
  };
}
