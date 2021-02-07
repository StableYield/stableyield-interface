import _ from "lodash";
import { useMemo } from "react";
import { utils } from "ethers";
import { useQuery } from "react-query";
import { request } from "graphql-request";

import { VAULT_USERS_QUERY } from "../lib/graphql/queries.stableyield";
import { useGetEndpoint } from "./useGetEndpoint";

/**
 * @name useGraphStableYieldVaultUsers
 * @description Request
 * @param {Object} id
 */
export const useGraphStableYieldVaultUsers = (parameters = {}) => {
  const endpoint = useGetEndpoint("stableyield");

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `stableyield-vault-users-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const { users } = await request(endpoint, VAULT_USERS_QUERY, parameters);
    return users;
  });
};
