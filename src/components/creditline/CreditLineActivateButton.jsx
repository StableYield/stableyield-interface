import idx from "idx";
import { useContractCreditLineERC721 } from "../../hooks";

/**
 * @name CreditLineActivateButton
 * @param {Object} props
 */
export const CreditLineActivateButton = ({
  className,
  label,
  assetCollateral,
  manager,
  delegationAmount,
  debtType,
  ...props
}) => {
  const creditLineERC721 = useContractCreditLineERC721(manager);

  const handleActivateCreditLine = () => {
    console.log("activating", creditLineERC721);
    creditLineERC721.creditLineActivate.execute({
      inputs: [],
    });
  };

  return (
    <button className={className} onClick={handleActivateCreditLine}>
      {label}
    </button>
  );
};

CreditLineActivateButton.defaultProps = {
  label: "Activate Credit Line",
};

export default CreditLineActivateButton;
