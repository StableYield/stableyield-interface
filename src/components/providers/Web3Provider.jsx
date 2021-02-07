import React, { useEffect } from "react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import {
  Web3SystemProvider,
  useWeb3System,
} from "../../state/web3-react-system";
import {
  metamask,
  walletconnect,
  NETWORK,
  getErrorMessage,
  getLibrary,
} from "../../connectors";
import { useMakerManager } from "../../constants/maker";

/**
 * @name Web3Provider
 * @param {Object} props
 */
const Web3ProviderContext = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3SystemProvider>
        <Web3Bootup>{children}</Web3Bootup>
      </Web3SystemProvider>
    </Web3ReactProvider>
  );
};

export default Web3ProviderContext;

/**
 * @name Web3Bootup
 * @description Handle initial application Web3 bootup commands.
 * @param {Object} props
 */
const Web3Bootup = ({ children }) => {
  useMakerManager();
  const { dispatch } = useWeb3System();
  const { activate, account, error, library } = useWeb3React();

  const enableDefaultWallet = () => {
    const walletDefault = window.localStorage.getItem("wallet-default");
    if (walletDefault == null) {
      if (window.ethereum.isMetaMask) {
        localStorage.setItem("wallet-default", "metamask");
      }
    } else {
      // activate(NETWORK);
      switch (walletDefault) {
        case "metamask":
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "metamask",
          });
          activate(metamask);
          localStorage.setItem("wallet-default", "metamask");
          break;
        case "walletconnect":
          activate(walletconnect);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "walletconnect",
          });
          localStorage.setItem("wallet-default", "walletconnect");
          break;
        case "walletlink":
          activate(walletconnect);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "walletlink",
          });
          localStorage.setItem("wallet-default", "walletlink");
          break;
        default:
          activate(NETWORK);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: undefined,
          });
          break;
      }
    }
  };

  useEffect(() => {
    if (library) {
      // library.provider.send(
      //   {
      //     jsonrpc: "2.0",
      //     method: "evm_increaseTime",
      //     params: ["1641795893"],
      //     // id: new Date().getTime()
      //   },
      //   (err, result) => {
      //     if (err) {
      //       return reject(err);
      //     }
      //     return resolve(result);
      //   }
      // );
    }
  }, [library]);

  useEffect(() => {
    if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;
    if (window.ethereum && dispatch) {
      // Disable Metamask Deprecation Warnings
      window.ethereum._warnOfDeprecation = () => {};
      if (window.ethereum.selectedAddress) {
        enableDefaultWallet();
      }
    } else {
      setTimeout(() => {
        enableDefaultWallet();
      }, 3000);
    }
  }, [dispatch]);

  useEffect(() => {
    // console.log(error);
    getErrorMessage(error);
  }, [error]);

  return children;
};
