import { useMemo } from "react";
import { useGraph } from "../index";

/**
 * @name useGetEndpoint
 * @description Request
 * @param {Object} id
 */
export const useGetEndpoint = (id) => {
  const { endpoints } = useGraph();

  return useMemo(() => {
    return endpoints[id];
  }, [id]);
};
