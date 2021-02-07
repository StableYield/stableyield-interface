import idx from "idx";
import { useQuery } from "react-query";
import Token from "../../contracts/ERC20.json";
import { useWeb3React } from "@web3-react/core";
import {
  useContract,
  useContractTransactionLifecycle,
} from "../state/web3-react-system";
import { useCallback } from "react";
/**
 * @name useContractERC20
 * @param {*} addressContract
 */
export function useContractERC20(addressContract) {
  const { account } = useWeb3React();
  const contract = useContract(addressContract, Token);

  // console.log(contract, addressContract, "addressContract");

  // Contract Reads
  // ==============
  const name = useCallback(() => {
    return useQuery(`token-${addressContract}-name`, async () => {
      if (!contract) throw new Error();
      return await contract.name();
    });
  }, [contract]);

  const decimalsQuery = useCallback(() => {
    return useQuery(`token-${addressContract}-decimals`, async () => {
      if (!contract) throw new Error();
      return await contract.decimals();
    });
  }, [contract]);

  const symbol = () =>
    useCallback(() => {
      return useQuery(`token-${addressContract}-symbol`, async () => {
        if (!contract) throw new Error();
        return await contract.symbol();
      });
    }, [contract]);

  const balanceOf = useCallback(
    (address) => {
      return useQuery(
        `token-${addressContract}-balance-${address}`,
        async (parms, vs) => {
          if (!contract) throw new Error();
          const user = address ? address : account;
          return await contract.balanceOf(user);
        }
      );
    },
    [contract]
  );

  const allowance = useCallback(
    (spender, address) => {
      return useQuery(
        `token-${addressContract}-allowance-${spender}`,
        async () => {
          if (!contract) throw new Error();
          const user = address ? address : account;
          const data = await contract.allowance(user, spender);
          return data;
        }
      );
    },
    [contract]
  );
  return {
    account,
    // contract,
    approve: useContractTransactionLifecycle(idx(contract, (_) => _.approve)),
    transfer: useContractTransactionLifecycle(idx(contract, (_) => _.transfer)),
    transferFrom: useContractTransactionLifecycle(
      idx(contract, (_) => _.transferFrom)
    ),
    allowance,
    decimals: decimalsQuery,
    balanceOf,
    symbol,
    name,
  };
}
