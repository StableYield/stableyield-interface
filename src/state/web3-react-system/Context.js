import { createContext } from "react";

/**
 * @name Context
 * @description Initialize the context.
 */
export const initialState = {
  currentNonce: 0,
  lastNonceSync: 0,
  lastBlockSync: 0,
  tokenList: {},
  walletType: undefined,
  makerVaults: 0,
  transaction: undefined,
};

const Context = createContext(initialState);

export default Context;
