import { useState, useEffect } from "react";
import { useModal } from "react-modal-hook";

/**
 * @name TransactionModal
 * @param {Object} props
 */
export const TransactionModal = ({ transaction, ...props }) => {
  const [showModal, hideModal] = useModal(() => {
    return (
      <div className={"absolute bottom-5 right-5 z-200"}>
        {transaction.isRequesting && (
          <div className="notification-green">
            <strong>Transaction: </strong>{" "}
            <span className="ml-2">Requesting Signature</span>
          </div>
        )}
        {transaction.isRejected && (
          <div className="notification-red">
            <strong>Transaction: </strong>{" "}
            <span className="ml-2">Signature Rejected</span>
          </div>
        )}
        {transaction.isBroadcast && !transaction.isConfirmed && (
          <div className="notification-yellow">
            <strong>Transaction: </strong>{" "}
            <span className="ml-2">Broadcast</span>
          </div>
        )}
        {transaction.isBroadcast && transaction.isConfirmed && (
          <div className="notification-green">
            <strong>Transaction: </strong>{" "}
            <span className="ml-2">Confirmed</span>
          </div>
        )}
        {transaction.isError && (
          <div className="notification-red">
            <strong>Transaction Error: </strong>{" "}
            <span className="ml-2">{transaction.broadcastErrorCode}</span>
          </div>
        )}
      </div>
    );
  }, [transaction]);

  useEffect(() => {
    if (transaction.isActive) {
      showModal();
    } else {
      if (
        transaction.isRejected ||
        transaction.isError ||
        (transaction.isBroadcast && transaction.isConfirmed)
      ) {
        setTimeout(() => {
          hideModal();
        }, 3000);
      }
    }
  }, [transaction.isActive]);

  return null;
};
export default TransactionModal;
