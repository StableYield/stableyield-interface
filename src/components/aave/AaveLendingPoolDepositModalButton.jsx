import { useModal } from "react-modal-hook";
import Modal from "../common/Modal";
import { FormAaveCollateralDeposit } from "../../forms";
/**
 * @name AaveLendingPoolDepositModalButton
 * @param {String} label
 * @param {Object} object
 */
export const AaveLendingPoolDepositModalButton = ({
  defaultCollateral,
  label,
  ...props
}) => {
  // Modal : Component
  const [showModal, hideModal] = useModal(() => {
    return (
      <Modal hideModal={hideModal}>
        <div className="card w-sm p-10">
          <h3 className="text-2xl border-bottom pb-3 block w-full mb-5">
            <strong>Aave</strong> - Collateral Deposit
          </h3>

          <FormAaveCollateralDeposit
            address={defaultCollateral}
            defaultCollateral={defaultCollateral}
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
      {/* <TransactionModal transaction={transaction} className={"z-200"} /> */}
    </>
  );
};

AaveLendingPoolDepositModalButton.defaultProps = {
  label: "Lend",
};
