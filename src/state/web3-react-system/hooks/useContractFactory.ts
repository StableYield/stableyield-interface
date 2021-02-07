import {useMemo} from "react";
import { ContractFactory } from '@ethersproject/contracts'
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from './index'
import { getContractFactory } from "../lib/utils";
/**
 * @name useContractFactory
 * @param {*} address
 * @param {*} ABI
 * @param {*} withSignerIfPossible
 */
export function useContractFactory( ABI: any, BYTECODE: string | undefined, withSignerIfPossible: any = true): ContractFactory | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!BYTECODE || !ABI || !library) return null
    try {
      return getContractFactory(ABI, BYTECODE, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to creata contract factory', error)
      return null
    }
  }, [BYTECODE, ABI, library, withSignerIfPossible, account])
}
