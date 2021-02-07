/* --- Global --- */
import React, { useEffect, useReducer } from "react";
import { useWeb3React } from "@web3-react/core";
import Context, { initialState } from "./Context";
import reducer from "./lib/reducer";

export const withCache = (reducer) => (s, a) => {
  const newS = reducer(s, a);
  localStorage.setItem("state", JSON.stringify(newS));
  return newS;
};

const getSavedState = () => {
  if (process.browser) {
    return JSON.parse(window.localStorage.getItem("state")) || initialState;
  } else {
    initialState;
  }
};

/**
 * @function Provider
 * @param {Array<React.Component>} children
 * @param {String} url
 * @param {String} token
 */
const Provider = ({ children }) => {
  const { account } = useWeb3React();
  const [state, dispatch] = useReducer(reducer, getSavedState());
  // const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // if (!account)
    //   dispatch({
    //     type: "SET_WALLET_TYPE",
    //     payload: undefined,
    //   });
  }, [account]);

  React.useEffect(() => {
    console.log(state, "Web3System");
  }, [state]);

  return (
    <Context.Provider
      value={{
        dispatch,
        ...state,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
