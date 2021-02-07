import axios from "axios";
import { useMemo } from "react";
/**
 * @name useEtherscan
 */
export const useEtherscan = () => {
  const api = useMemo(() => {
    return axios.create({ baseURL: "https://api.etherscan.io/" });
  }, []);

  /**
   * @name balance
   * @param {*} account
   * @param {*} config
   */
  const balance = async (account, config = {}) => {
    return api.get("api", {
      params: {
        module: "account",
        action: "balance",
        address: account,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        ...config,
      },
    });
  };
  /**
   * @name transactions
   * @param {*} account
   * @param {*} config
   */
  const transactions = async (account, config = {}) => {
    return api.get("api", {
      params: {
        module: "account",
        action: "txlist",
        address: account,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        startblock: 0,
        endblock: 9999999,
        ...config,
      },
    });
  };
  /**
   * @name internalTansactions
   * @param {*} account
   * @param {*} config
   */
  const internalTansactions = async (account, config = {}) => {
    return api.get("api", {
      params: {
        module: "account",
        action: "txlistinternal",
        address: account,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        ...config,
      },
    });
  };

  /**
   * @name tokenERC20Transfers
   * @param {*} account
   * @param {*} config
   */
  const tokenERC20Transfers = async (account, config = {}) => {
    return api.get("api", {
      params: {
        module: "account",
        action: "tokentx",
        address: account,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        ...config,
      },
    });
  };
  /**
   * @name tokenERC721Transfers
   * @param {*} account
   * @param {*} config
   */
  const tokenERC721Transfers = async (account, config = {}) => {
    return api.get("api", {
      params: {
        module: "account",
        action: "tokennfttx",
        address: account,
        apikey: process.env.NEXT_PUBLIC_ETHERSCAN_API,
        ...config,
      },
    });
  };

  return {
    balance,
    transactions,
    internalTansactions,
    tokenERC20Transfers,
    tokenERC721Transfers,
  };
};
