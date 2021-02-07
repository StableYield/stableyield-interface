import { useEffect, useMemo, useState } from "react";
import Maker from "@makerdao/dai";
import { useWeb3React } from "@web3-react/core";
import { McdPlugin, ETH, DAI } from "@makerdao/dai-plugin-mcd";
import { useWeb3System } from "../state/web3-react-system";

export const useMakerManager = () => {
  const { dispatch } = useWeb3System();
  const { account, library } = useWeb3React();
  const [maker, makerSet] = useState();
  const [makerManager, makerManagerSet] = useState();

  useEffect(() => {
    if (library) {
      (async () => {
        try {
          const maker = await Maker.create("browser", {
            plugins: [McdPlugin],
          });
          const makerManager = await maker.service("mcd:cdpManager");
          makerSet(maker);
          makerManagerSet(makerManager);
          const proxyAddress = await maker.service("proxy").currentProxy();
          console.log(proxyAddress, "proxyAddressproxyAddress");
          if (proxyAddress) {
            const data = await makerManager.getCdpIds(proxyAddress); // returns list of { id, ilk } objects
            if (data.length > 0) {
              dispatch({
                type: "SET_MAKER_VAULT_COUNT",
                payload: data.length,
              });
            } else {
              dispatch({
                type: "SET_MAKER_VAULT_COUNT",
                payload: 0,
              });
            }
          } else {
            dispatch({
              type: "SET_MAKER_VAULT_COUNT",
              payload: 0,
            });
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [account]);

  return useMemo(() => {
    return { maker, makerManager };
  }, [maker, makerManager]);
};
