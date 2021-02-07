import _ from "lodash";
import { useMemo } from "react";
import { utils } from "ethers";
import { useQuery } from "react-query";
import { request } from "graphql-request";

import { VAULT_LOANS_QUERY } from "../lib/graphql/queries.stableyield";
import { useGetEndpoint } from "./useGetEndpoint";

/**
 * @name useGraphStableYieldVaultLoans
 * @description Request
 * @param {Object} id
 */
export const useGraphStableYieldVaultLoans = (parameters = {}) => {
  const endpoint = useGetEndpoint("stableyield");

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `stableyield-vault-loans-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const { loans } = await request(endpoint, VAULT_LOANS_QUERY, parameters);
    return loans;
  });
};
