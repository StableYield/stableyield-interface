import idx from "idx";
import { useWeb3React } from "@web3-react/core";
import {
  useContractAaveLendingPool,
  useContractAaveProtocolDataProvider,
  useContractAaveDebtToken,
  useContractERC721,
} from "../../hooks";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";

import contracts from "../../constants/contracts";

/**
 * @name ERC721ApproveAmountButton
 * @param {Object} props
 */
export const ERC721ApproveAmountButton = ({
  className,
  label,
  address,
  amount,
  approveTo,
  approveId,
  ...props
}) => {
  const { approve } = useContractERC721(address);

  const handleERC721ApproveAmount = () => {
    console.log("approving ", address, amount, approveTo, approveId);
    approve.execute({
      inputs: [approveTo, approveId],
    });
  };

  return (
    <button className={className} onClick={handleERC721ApproveAmount}>
      {label}
    </button>
  );
};

ERC721ApproveAmountButton.defaultProps = {
  label: "Approve ERC721 Spending",
};

export default ERC721ApproveAmountButton;
