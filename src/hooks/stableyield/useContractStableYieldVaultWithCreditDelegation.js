import idx from "idx";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";

import StableYieldVaultWithCreditDelegation_ABI from "../../../contracts/stableyield/StableYieldVaultWithCreditDelegation.json";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";

/**
 * @name useContractStableYieldVaultWithCreditDelegation
 * @param {*} addressContract
 */
export function useContractStableYieldVaultWithCreditDelegation(address) {
  const { account } = useWeb3React();
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    StableYieldVaultWithCreditDelegation_ABI
  );

  const name = useCallback(() => {
    return useQuery(`stableyieldvault-name`, async () => {
      if (!contract) throw new Error("Contract undefined");
      return await contract.name();
    });
  }, [contract]);
  const symbol = useCallback(() => {
    return useQuery(`stableyieldvault-symbol`, async () => {
      if (!contract) throw new Error("Contract undefined");
      return await contract.symbol();
    });
  }, [contract]);
  const balanceOf = useCallback(
    (address) => {
      return useQuery(`stableyieldvault-symbol`, async () => {
        try {
          if (!contract && (account || address))
            throw new Error("Contract or User undefined");
          const user = address ? address : account;
          const balance = await contract.balanceOf(user);
          return balance;
        } catch (error) {}
      });
    },
    [contract]
  );
  const allowance = useCallback(
    (address, spender) => {
      return useQuery(`stableyieldvault-symbol`, async () => {
        if (!contract && (account || address))
          throw new Error("Contract or User undefined");
        const user = address ? address : account;
        return await contract.allowance(user, spender);
      });
    },
    [contract]
  );

  const calculateShare = useCallback(
    (account) => {
      return useQuery(
        `stableyieldvault-calculate-share-${account}`,
        async () => {
          if (!contract) throw new Error("Contract undefined");
          return await contract.calculateShare(account);
        }
      );
    },
    [contract]
  );
  const getPricePerFullShare = useCallback(() => {
    return useQuery(`stableyieldvault-price-per-share`, async () => {
      if (!contract) throw new Error("Contract undefined");
      return await contract.getPricePerFullShare();
    });
  }, [contract]);

  const vaultBalance = useCallback(
    (account) => {
      return useQuery(`stableyieldvault-vault-balance`, async () => {
        if (!contract) throw new Error("Contract undefined");
        return await contract.vaultBalance();
      });
    },
    [contract]
  );

  const aTokenAddress = useCallback(() => {
    return useQuery(`stableyieldvault-atoken`, async () => {
      if (!contract) throw new Error("Contract undefined");
      return await contract.aTokenAddress();
    });
  }, [contract]);

  return {
    contract,
    isDeployed,
    isSigner,

    // Read
    name,
    symbol,
    balanceOf,
    allowance,
    calculateShare,
    getPricePerFullShare,
    vaultBalance,
    aTokenAddress,

    // Write
    depositCollateral: useContractTransactionLifecycle(
      idx(contract, (_) => _.depositCollateral)
    ),
    withdrawCollateral: useContractTransactionLifecycle(
      idx(contract, (_) => _.withdrawCollateral)
    ),
    approve: useContractTransactionLifecycle(idx(contract, (_) => _.approve)),
    transfer: useContractTransactionLifecycle(idx(contract, (_) => _.transfer)),
    transferFrom: useContractTransactionLifecycle(
      idx(contract, (_) => _.transferFrom)
    ),
    swapLendingPosition: useContractTransactionLifecycle(
      idx(contract, (_) => _.swapLendingPosition)
    ),

    // Governance
    submitProposal: useContractTransactionLifecycle(
      idx(contract, (_) => _.submitProposal)
    ),
    sponsorProposal: useContractTransactionLifecycle(
      idx(contract, (_) => _.sponsorProposal)
    ),
    voteOnProposal: useContractTransactionLifecycle(
      idx(contract, (_) => _.voteOnProposal)
    ),
    processProposal: useContractTransactionLifecycle(
      idx(contract, (_) => _.processProposal)
    ),
    processLoanRepayment: useContractTransactionLifecycle(
      idx(contract, (_) => _.processLoanRepayment)
    ),
    borrowCredit: useContractTransactionLifecycle(
      idx(contract, (_) => _.borrowCredit)
    ),
    repayCredit: useContractTransactionLifecycle(
      idx(contract, (_) => _.repayCredit)
    ),
  };
}
