import {useMemo} from "react";
import { Contract } from '@ethersproject/contracts'
import { useActiveWeb3React } from './index'
import { getContract } from "../lib/utils";
/**
 * @name useContract
 * @param {*} address
 * @param {*} ABI
 * @param {*} withSignerIfPossible
 */
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible: any = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}
