import _ from "lodash";
import { useMemo } from "react";
import { utils } from "ethers";
import { useQuery } from "react-query";
import { request } from "graphql-request";

import { VAULT_PROPOSALS_QUERY } from "../lib/graphql/queries.stableyield";
import { useGetEndpoint } from "./useGetEndpoint";

/**
 * @name useGraphStableYieldVaultProposals
 * @description Request
 * @param {Object} id
 */
export const useGraphStableYieldVaultProposals = (parameters = {}) => {
  const endpoint = useGetEndpoint("stableyield");

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `stableyield-vault-proposals-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const { proposals } = await request(
      endpoint,
      VAULT_PROPOSALS_QUERY,
      parameters
    );
    return proposals;
  });
};
