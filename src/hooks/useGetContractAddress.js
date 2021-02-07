import { useWeb3React } from "@web3-react/core";
const { useMemo } = require("react");

export const useGetContractAddress = (contractName) => {
  const { chainId } = useWeb3React();
  return useMemo(() => {
    if (chainId) {
      switch (contractName) {
        case "weth":
          switch (chainId) {
            case 1337:
              return process.env.NEXT_PUBLIC_WETH_LOCAL;
            case 1:
              return process.env.NEXT_PUBLIC_WETH_MAINNET;
            default:
              return process.env.NEXT_PUBLIC_WETH_TESTNET;
          }
        default:
          return null;
      }
    } else {
      return null;
    }
  }, [chainId, contractName]);
};
