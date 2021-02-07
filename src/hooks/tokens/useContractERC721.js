import { utils } from "ethers";
import idx from "idx";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import ERC721_ABI from "../../../contracts/tokens/ERC721.json";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractDeployedAndSigner } from "../useContractDeployedAndSigner";

/**
 * @name useContractERC721
 * @param {*} address
 */
export function useContractERC721(address) {
  const [contract, isDeployed, isSigner] = useContractDeployedAndSigner(
    address,
    ERC721_ABI
  );
  return {
    contract,
    isDeployed,
    isSigner,
    // Read

    // Write
    approve: useContractTransactionLifecycle(idx(contract, (_) => _.approve)),
    safeTransferFrom: useContractTransactionLifecycle(
      idx(contract, (_) => _.safeTransferFrom)
    ),
  };
}
