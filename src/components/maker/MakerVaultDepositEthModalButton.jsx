import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { TransactionModal } from "../../components";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { FormMakerEthDeposit } from "../../forms";
import { useState } from "react";

/**
 * @name MakerVaultDepositEthModalButton
 * @param {String} label
 * @param {Object} object
 */
export const MakerVaultDepositEthModalButton = ({ cdpID, label, ...props }) => {
  const [transactionForm, transactionFormSet] = useState();
  const transaction = useContractTransactionLifecycle();

  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm p-10">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-2">
            <strong>Vault</strong> - Deposit ETH
          </h3>
          <FormMakerEthDeposit
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

MakerVaultDepositEthModalButton.defaultProps = {
  label: "Withdraw ETH",
};
