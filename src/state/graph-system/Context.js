import { createContext } from "react";

/**
 * @name Context
 * @description Initialize the context.
 */
export const initialState = {
  endpoints: [],
};

const Context = createContext(initialState);

export default Context;
