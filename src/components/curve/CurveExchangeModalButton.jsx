import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { TransactionModal } from "../../components";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { FormCurveStableSwap } from "../../forms";
/**
 * @name CurveExchangeModalButton
 * @param {String} label
 * @param {Object} object
 */
export const CurveExchangeModalButton = ({
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
            <strong>Stablcoins</strong> - Exchange
          </h3>
          <FormCurveStableSwap defaultCollateral={defaultCollateral} />
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

CurveExchangeModalButton.defaultProps = {
  label: "Swap",
};
