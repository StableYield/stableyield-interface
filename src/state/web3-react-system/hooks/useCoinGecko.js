import axios from "axios";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useMemo, useCallback } from "react";
export const useCoinGecko = () => {
  const api = useMemo(() => {
    return axios.create({ baseURL: "https://api.coingecko.com/api/v3/" });
  }, []);

  /**
   * @name tokenPrice
   * @param {*} account
   * @param {*} config
   */
  const tokenPrice = useCallback(
    (address, additionalParams) => {
      return useQuery(`token-price-${address}`, async () => {
        const { data } = await api.get("simple/token_price/ethereum", {
          params: {
            contract_addresses: address,
            vs_currencies: "usd",
            ...additionalParams,
          },
        });
        return data[address];
      });
    },
    [api]
  );

  /**
   * @name uniswapTokens
   * @param {*} account
   * @param {*} config
   */
  const uniswapTokens = async (token, additionalParams) => {
    return axios.get("https://tokens.coingecko.com/uniswap/all.json");
  };

  return {
    tokenPrice,
    uniswapTokens,
  };
};
