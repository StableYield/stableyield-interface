import _ from "lodash";
import { useMemo } from "react";
import { utils } from "ethers";
import { useQuery } from "react-query";
import { request } from "graphql-request";

import { VAULT_SWAPS_QUERY } from "../lib/graphql/queries.stableyield";
import { useGetEndpoint } from "./useGetEndpoint";

/**
 * @name useGraphStableYieldVaultSwaps
 * @description Request
 * @param {Object} id
 */
export const useGraphStableYieldVaultSwaps = (parameters = {}) => {
  const endpoint = useGetEndpoint("stableyield");

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `stableyield-vault-swaps-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const { swaps } = await request(endpoint, VAULT_SWAPS_QUERY, parameters);
    return swaps;
  });
};
