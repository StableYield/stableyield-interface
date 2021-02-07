import { Contract } from '@ethersproject/contracts'
import { useContract } from '../state/web3-react-system'
import { useActiveWeb3React } from '../state/web3-react-system'
import ERC20_ABI from '../../contracts/ERC20.json'
import WETH_ABI from '../../contracts/WETH.json'
import IUniswapV2Pair_ABI from '../../contracts/UniswapV2Pair.json'
import IUniswapV2Router_ABI from '../../contracts/UniswapV2Router.json'
import IUniswapFactory_ABI from '../../contracts/UniswapFactory.json'


import StableYieldVaultWithCreditDelegation_ABI from '../../contracts/stableyield/StableYieldVaultWithCreditDelegation.json'

// Aaave
import IAaveLendingPool from '../../contracts/aave/LendingPool.json'
import AaveProtocolDataProvider_ABI from "../../contracts/aave/AaveProtocolDataProvider.json";
// MakerDAO
import MakerDsProxy from '../../contracts/maker/MakerDSProxy.json'
import MakerDsProxyActions from '../../contracts/maker/MakerDSProxyActions.json'
import MakerDsProxyFactory from '../../contracts/maker/MakerDSProxyFactory.json'
import MakerProxyRegistry from '../../contracts/maker/MakerProxyRegistry.json'

// Curve
import CurveStableSwap_ABI from '../../contracts/curve/StableSwap.json'
import CurveExchangeRegistry_ABI from '../../contracts/curve/CurveExchangeRegistry.json'


const WETH = {
  1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  2: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  3: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  4: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  5: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  42: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  1337: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  31337: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
}

export function useContractBaseERC20(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useContractBaseWETH(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId] : undefined, WETH_ABI, withSignerIfPossible)
}

export function useContractBaseStableYieldVault(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, StableYieldVaultWithCreditDelegation_ABI, withSignerIfPossible)
}

// Uniswap
export function useContractBaseUniswapFactory(routerAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(routerAddress, IUniswapFactory_ABI, withSignerIfPossible)
}
export function useContractBaseUniswapPair(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2Pair_ABI, withSignerIfPossible)
}
export function useContractBaseUniswapV2Router(routerAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(routerAddress, IUniswapV2Router_ABI, withSignerIfPossible)
}


// Aave
export function useContractBaseAaveLendingPool(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, IAaveLendingPool, withSignerIfPossible)
}
export function useContractBaseAaveProtocolDataProvider(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, AaveProtocolDataProvider_ABI, withSignerIfPossible)
}

// MakerDAO
export function useContractBaseMakerDSProxy(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, MakerDsProxy, withSignerIfPossible)
}
export function useContractBaseMakerDSProxyActions(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, MakerDsProxyActions, withSignerIfPossible)
}
export function useContractBaseMakerDSProxyFactory(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, MakerDsProxyFactory, withSignerIfPossible)
}
export function useContractBaseMakerDSProxyRegistry(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, MakerProxyRegistry, withSignerIfPossible)
}

// Curve
export function useContractBaseCurveStableSwap(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, CurveStableSwap_ABI, withSignerIfPossible)
}
export function useContractBaseCurveExchangeRegistry(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, CurveExchangeRegistry_ABI, withSignerIfPossible)
}