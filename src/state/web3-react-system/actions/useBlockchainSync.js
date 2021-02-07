import { useWeb3SystemContext } from "../useContext";
import { SET_BLOCKNUMBER_SYNC, SET_NONCE_SYNC } from "../lib/types";

export const useBlockchainSync = () => {
  const { dispatch } = useWeb3SystemContext();
  const setBlockNumberSync = async (blocknumberSyc) => {
    dispatch({
      type: SET_BLOCKNUMBER_SYNC,
      payload: blocknumberSyc,
    });
  };
  const setNonceSync = async (nonceSyc) => {
    dispatch({
      type: SET_NONCE_SYNC,
      payload: nonceSyc,
    });
  };
  return {
    setBlockNumberSync,
    setNonceSync,
  };
};
