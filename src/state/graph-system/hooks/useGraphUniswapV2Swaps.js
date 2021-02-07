import _ from "lodash";
import { useQuery } from "react-query";
import { request } from "graphql-request";
import { SWAPS_QUERY } from "../lib/graphql/queries.uniswap";
import { useGetEndpoint } from "./useGetEndpoint";
import { useMemo } from "react";
import useLocalDatabase from "../../../data/localDatabase";
import { utils } from "ethers";
import { create } from "domain";

/**
 * @name useGraphUniswapV2Swaps
 * @description Request
 * @param {Object} id
 */
export const useGraphUniswapV2Swaps = (parameters = {}) => {
  const endpoint = useGetEndpoint("uniswap");
  const localDatabase = useLocalDatabase();

  const queryName = useMemo(() => {
    const hash = utils.id(JSON.stringify(parameters));
    return `uniswap-swaps-${hash}`;
  }, [parameters]);

  return useQuery(queryName, async () => {
    const localData = await localDatabase.getItem(queryName);
    if (!localData) {
      let list = [];
      const data = await requestAllData(
        endpoint,
        SWAPS_QUERY,
        parameters,
        list
      );
      return data;
    } else {
      return localData;
    }
  });
};

const requestAllData = async (endpoint, query, parameters, list) => {
  let newList = list;
  let nextParam = parameters;
  let limit = 10;
  const data = await requestData(endpoint, query, parameters);
  return data;
  nextParam = createNextParam(nextParam, data);
  console.log(nextParam, "nextParam1");
  newList = [...newList, ...data];
  for (let index = 0; index < limit; index++) {
    const dataNext = await requestData(endpoint, query, nextParam, newList);
    nextParam = createNextParam(nextParam, dataNext);
    newList = [...newList, ...dataNext];
  }
  return newList;
};

const requestData = async (endpoint, query, parameters) => {
  const { swaps } = await request(endpoint, query, parameters);
  return swaps;
};

const createNextParam = (param, data) => {
  return {
    ...param,
    first: 50,
    where: {
      ...param.where,
      id_not_in: param.where.id_not_in
        ? _.uniqBy(
            [...param.where.id_not_in, ...data.map((i) => i.id)],
            (i) => i
          )
        : data.map((i) => i.id),
      // timestamp_gte: data[data.length - 1]
      //   ? data[data.length - 1].timestamp
      //   : "9999999999999",
    },
  };
};
