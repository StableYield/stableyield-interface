import { useEffect } from "react";
import { useModal } from "react-modal-hook";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "../common/Modal";
import styles from "./WalletEnableModal.module.css";
import { useWeb3System } from "../../state/web3-react-system";
import {
  metamask,
  walletconnect,
  NETWORK,
  walletlink,
} from "../../connectors/index";
import {
  Address,
  WalletAddress,
  WalletBalance,
  WalletBlockie,
  WalletTypeIcon,
  WalletDisconnect,
  WalletNetwork,
} from "../index";

/**
 * @name WalletEnableModal
 */
export const WalletEnableModal = () => {
  const { active, activate, account, library } = useWeb3React();
  const { dispatch } = useWeb3System();
  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      handleActivateRequest();
    }
  }, []);

  const handleActivateRequest = (walletSelection) => {
    if (walletSelection) {
      switch (walletSelection) {
        case "metamask":
          activate(metamask);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "metamask",
          });
          break;
        case "walletconnect":
          activate(walletconnect);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "walletconnect",
          });
          break;
        case "walletlink":
          activate(walletlink);
          dispatch({
            type: "SET_WALLET_TYPE",
            payload: "walletlink",
          });
          break;
        case "network":
          activate(NETWORK);
          break;
        default:
          activate(NETWORK);
          break;
      }
    }
  };

  const options = [
    {
      label: "MetaMask",
      icon: "/wallets/metamask.png",
      value: "metamask",
    },
    {
      label: "WalletConnect",
      icon: "/wallets/walletconnect.svg",
      value: "walletconnect",
    },
    {
      label: "Coinbase Wallet",
      icon: "/wallets/walletlink.png",
      value: "walletlink",
    },
  ];

  const [showModal, hideModal] = useModal(() => {
    useEffect(() => {
      if (active) hideModal();
    }, [active]);

    return (
      <Modal hideModal={hideModal}>
        <div className={"card w-sm p-8"}>
          <div className={styles.main}>
            {active ? null : (
              // <div>
              //   <div className="relative">
              //     <WalletBlockie
              //       address={account}
              //       width={48}
              //       className="mb-3 shadow-md border-2 border-solid border-white rounded-full"
              //     />
              //     <Address address={account} trim={0} className="text-lg" />
              //   </div>
              // </div>
              <div>
                {options.map((wallet, index) => (
                  <WalletOption
                    {...wallet}
                    key={index}
                    handleActivateRequest={handleActivateRequest}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }, [active]);

  return (
    <>
      {active ? (
        <>
          <span className="mr-1 text-xs">
            <WalletBalance /> ETH |
          </span>
          <div className={styles.walletActiveButton}>
            <Address address={account} trim={7} className="text-xs" />
            <div className="ml-2 -mr-1">
              <WalletNetwork />
            </div>
            <div className="relative">
              <WalletBlockie width={30} className={styles.blockieActive} />
              <div className="absolute -top-2 -right-4 bg-white rounded-full p-1 w-6 h-6 shadow-md flex items-center justify-center">
                <WalletTypeIcon />
              </div>
            </div>
            <span className="ml-5">
              <WalletDisconnect className="cursor-pointer tag-red text-xs" />
            </span>
          </div>
        </>
      ) : (
        <button onClick={showModal} className="btn-indigo text-xs py-2">
          Connect Wallet
        </button>
      )}
    </>
  );
};

/**
 * @name WalletOption
 * @param {String} label
 * @param {String} icon
 * @param {String} value
 * @param {Function} handleActivateRequest
 */
const WalletOption = ({ label, icon, value, handleActivateRequest }) => {
  return (
    <div
      className={"card flex items-center justify-between mb-3"}
      onClick={() => handleActivateRequest(value)}
    >
      <span>{label}</span>
      <div>
        <img src={icon} width={32} />
      </div>
    </div>
  );
};
