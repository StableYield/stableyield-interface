import idx from "idx";
import LendingPool_ABI from "../../contracts/aave/LendingPool.json";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { useContractDeployedAndSigner } from "./useContractDeployedAndSigner";
/**
 * @name useContractAaveLendingPool
 * @param {*} addressContract
 */
export function useContractAaveLendingPool(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    LendingPool_ABI
  );

  const getUserAccountData = useCallback(
    (account) => {
      return useQuery(`aave-user-reserve-data-${account}`, async () => {
        if (!contract) throw new Error("Contract undefined");
        return await contract.getUserAccountData(account);
      });
    },
    [contract]
  );

  return {
    contract,
    isDeployed,
    isSigner,

    // Read
    getUserAccountData,
    // Write
    deposit: useContractTransactionLifecycle(idx(contract, (_) => _.deposit)),
    deposit: useContractTransactionLifecycle(idx(contract, (_) => _.deposit)),
    withdraw: useContractTransactionLifecycle(idx(contract, (_) => _.withdraw)),
    borrow: useContractTransactionLifecycle(idx(contract, (_) => _.borrow)),
    repay: useContractTransactionLifecycle(idx(contract, (_) => _.repay)),
    swapBorrowRateMode: useContractTransactionLifecycle(
      idx(contract, (_) => _.swapBorrowRateMode)
    ),
    rebalanceStableBorrowRate: useContractTransactionLifecycle(
      idx(contract, (_) => _.rebalanceStableBorrowRate)
    ),
    setUserUseReserveAsCollateral: useContractTransactionLifecycle(
      idx(contract, (_) => _.setUserUseReserveAsCollateral)
    ),
    liquidationCall: useContractTransactionLifecycle(
      idx(contract, (_) => _.liquidationCall)
    ),
  };
}
