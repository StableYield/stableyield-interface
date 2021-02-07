import { useContractCreditLineERC721 } from "../../hooks";

/**
 * @name CreditLineRepayButton
 * @param {Object} props
 */
export const CreditLineRepayButton = ({
  className,
  label,
  manager,
  amount,
  ...props
}) => {
  const creditLineERC721 = useContractCreditLineERC721(manager);

  const handleActivateCreditLine = () => {
    creditLineERC721.repay.execute({
      inputs: [amount, false, false],
    });
  };

  return (
    <button className={className} onClick={handleActivateCreditLine}>
      {label}
    </button>
  );
};

CreditLineRepayButton.defaultProps = {
  label: "Repay Debt",
};

export default CreditLineRepayButton;
