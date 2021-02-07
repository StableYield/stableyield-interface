/* --- Global --- */
import React, { useReducer } from "react";
import Context, { initialState } from "./Context";
import reducer from "./lib/reducer";

/**
 * @function Provider
 * @param {Array<React.Component>} children
 * @param {String} url
 * @param {String} token
 */
const Provider = ({ children, endpoints }) => {
  const [state, dispatch] = useReducer(reducer, { endpoints });

  React.useEffect(() => {}, []);

  console.log(state, "graphh sysem");

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
