import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { TransactionModal } from "../../components";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { FormStableYieldSwap } from "../../forms";
/**
 * @name StableYieldSwapModalButton
 * @param {String} label
 * @param {Object} object
 */
export const StableYieldSwapModalButton = ({
  defaultCollateral,
  label,
  ...props
}) => {
  const transaction = useContractTransactionLifecycle();

  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm p-10">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-5">
            <strong>StableYield</strong> - Swap Position
          </h3>
          <FormStableYieldSwap defaultCollateral={defaultCollateral} />
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

StableYieldSwapModalButton.defaultProps = {
  label: "Swap",
};
