import axios from "axios";
import { useMemo } from "react";
/**
 * @name useEthplorer
 */
export const useEthplorer = () => {
  const api = useMemo(() => {
    return axios.create({ baseURL: "http://api.ethplorer.io/" });
  }, []);

  /**
   * @name getAddressInfo
   * @param {*} account
   * @param {*} config
   */
  const getAddressInfo = async (account, config = {}) => {
    return api.get(`getAddressInfo/${account}/`, {
      params: {
        apiKey: "freekey",
        ...config,
      },
    });
  };

  return {
    getAddressInfo,
  };
};
