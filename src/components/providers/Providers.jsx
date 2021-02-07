import { useMemo } from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ModalProvider } from "react-modal-hook";

import Web3Provider from "./Web3Provider";
import { GraphProvider } from "../../state/graph-system";

/**
 * @name ProviderPrimary
 * @param {*} props
 */
export const ProviderPrimary = ({ children }) => {
  const cache = useMemo(() => new QueryCache(), []);

  return (
    <GraphProvider
      endpoints={{
        uniswap: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        stableyield: "http://localhost:8000/subgraphs/name/StableYield/v0",
      }}
    >
      <ReactQueryCacheProvider queryCache={cache}>
        <Web3Provider>
          <ModalProvider>{children}</ModalProvider>
        </Web3Provider>
      </ReactQueryCacheProvider>
    </GraphProvider>
  );
};

export default ProviderPrimary;
