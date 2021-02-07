import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { TransactionModal } from "../../components";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { FormMakerDaiDraw } from "../../forms";
import { useState } from "react";

/**
 * @name MakerVaultWithdrawEthModalButton
 * @param {String} label
 * @param {Object} object
 */
export const MakerVaultWithdrawEthModalButton = ({
  cdpID,
  label,
  ...props
}) => {
  const [transactionForm, transactionFormSet] = useState();
  const transaction = useContractTransactionLifecycle();

  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-5">
            <strong>Vault</strong> - Withdraw DAI
          </h3>
          <FormMakerDaiDraw
            transactionFormSet={transactionFormSet}
            cdpID={cdpID}
          />
        </div>
      </Modal>
    );
  }, []);

  // ActionHandler : Component
  return (
    <>
      <button onClick={showModal} {...props}>
        {label}
      </button>
      <TransactionModal transaction={transaction} className={"z-200"} />
    </>
  );
};

MakerVaultWithdrawEthModalButton.defaultProps = {
  label: "Withdraw ETH",
};
