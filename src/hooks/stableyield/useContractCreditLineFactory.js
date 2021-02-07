import { utils } from "ethers";
import idx from "idx";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import CreditLineFactory_ABI from "../../../contracts/stableyield/CreditLineFactory.json";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";

/**
 * @name useContractCreditLineFactory
 * @param {*} address
 */
export function useContractCreditLineFactory(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    CreditLineFactory_ABI
  );

  const creditLines = useCallback(() => {
    return useQuery(`aave-credit-allowance-${delegatee}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.creditLines();
        return data;
      }
    });
  }, [contract]);
  const getLastCreditLine = useCallback(() => {
    return useQuery(`aave-credit-allowance-${delegatee}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.getLastCreditLine();
        return data;
      }
    });
  }, [contract]);
  const getCreditLineCount = useCallback(() => {
    return useQuery(`aave-credit-allowance-${delegatee}`, async () => {
      if (!contract) {
        throw new Error("Contract not initialized");
      } else {
        const data = await contract.getCreditLineCount();
        return data;
      }
    });
  }, [contract]);

  return {
    contract,
    isDeployed,
    isSigner,
    // Read
    creditLines,
    getLastCreditLine,
    getCreditLineCount,
    // Write
    createCreditLineERC20: useContractTransactionLifecycle(
      idx(contract, (_) => _.createCreditLineERC20)
    ),
    createCreditLineERC721: useContractTransactionLifecycle(
      idx(contract, (_) => _.createCreditLineERC721)
    ),
  };
}
