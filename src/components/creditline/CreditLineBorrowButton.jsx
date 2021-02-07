import { useContractCreditLineERC721 } from "../../hooks";
import { transformDecimalsToWad } from "../../helpers/blockchain";
/**
 * @name CreditLineBorrowButton
 * @param {Object} props
 */
export const CreditLineBorrowButton = ({
  className,
  label,
  address,
  manager,
  ...props
}) => {
  const creditLineERC721 = useContractCreditLineERC721(manager);

  const CreditLineBorrowButton = () => {
    creditLineERC721.borrow.execute({
      inputs: [transformDecimalsToWad("1000")],
    });
  };

  return (
    <button className={className} onClick={CreditLineBorrowButton}>
      {label}
    </button>
  );
};

CreditLineBorrowButton.defaultProps = {
  label: "Borrow Full Amount",
};

export default CreditLineBorrowButton;
