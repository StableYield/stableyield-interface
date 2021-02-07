import { utils } from 'ethers'
import { ContractInterface } from '@ethersproject/contracts'
import MakerDsProxyActions from '../../contracts/maker/MakerDSProxyActions.json'

export function useContractInterfaceMakerDSProxyActions(withSignerIfPossible?: boolean): ContractInterface | null {
  return new utils.Interface(MakerDsProxyActions)
}