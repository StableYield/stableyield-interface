import _ from "lodash";
import { useMemo } from "react";
import { utils } from "ethers";
import { useQuery } from "react-query";
import { request } from "graphql-request";

import { VAULT_VOTES_QUERY } from "../lib/graphql/queries.stableyield";
import { useGetEndpoint } from "./useGetEndpoint";

/**
 * @name useGraphStableYieldVaultVotes
 * @description Request
 * @param {Object} id
 */
export const useGraphStableYieldVaultVotes = (parameters = {}) => {
  const endpoint = useGetEndpoint("stableyield");

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `stableyield-vault-votes-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const { votes } = await request(endpoint, VAULT_VOTES_QUERY, parameters);
    return votes;
  });
};
