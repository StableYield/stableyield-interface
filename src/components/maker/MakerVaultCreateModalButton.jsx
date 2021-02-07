import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { TransactionModal, ERC20UnlockTransferFrom } from "../../components";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { FormMakerVaultCreate } from "../../forms";

/**
 * @name MakerVaultCreateModalButton
 * @param {String} label
 * @param {Object} object
 */
export const MakerVaultCreateModalButton = ({ label, ...props }) => {
  const transaction = useContractTransactionLifecycle();

  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-5">
            <strong>Vault</strong> - Personal Loan
          </h3>
          <FormMakerVaultCreate />
          <ERC20UnlockTransferFrom
            address="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            allowanceOf={"0x971aDB29660DDD565d53D2e3B7932b29e7b476B6"}
          >
            Unlock
          </ERC20UnlockTransferFrom>
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

MakerVaultCreateModalButton.defaultProps = {
  label: "Create Vault",
};
