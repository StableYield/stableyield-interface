import { useWeb3SystemContext } from "../useContext";
import { SET_TOKEN_LIST } from "../lib/types";
import tokenList from "../../../data/tokenList";
import useLocalDatabase from "../../../data/localDatabase";

export const useTokenList = () => {
  let localDatabase;
  const { dispatch } = useWeb3SystemContext();
  if (process.browser) {
    localDatabase = useLocalDatabase();
  }

  const set = async (name) => {
    const data = await fetch(tokenList[name].url);
    const dataParsed = await data.json();
    localDatabase.setItem("tokens", dataParsed.tokens);

    dispatch({
      type: SET_TOKEN_LIST,
      payload: {
        name,
        url: tokenList[name].url,
        // data: json,
      },
    });
  };
  const reset = (name, url) => {
    dispatch({
      type: SET_TOKEN_LIST,
      payload: {
        name: "uniswap",
        url: tokenList["uniswap"],
      },
    });
  };

  const retrieve = async (filter) => {
    if (process.browser) {
      const tokens = await localDatabase.getItem("tokens");
      return tokens;
      return [];
    } else {
      return [];
    }
  };

  return {
    set,
    reset,
    retrieve,
  };
};
