import idx from "idx";
import { useWeb3React } from "@web3-react/core";
import {
  useContractAaveLendingPool,
  useContractAaveProtocolDataProvider,
  useContractAaveDebtToken,
} from "../../hooks";
import {
  transformTokenToHuman,
  numberTrimDecimals,
  transformDecimalsToWad,
} from "../../helpers/blockchain";

import contracts from "../../constants/contracts";

/**
 * @name AaveApproveCreditDelegationButton
 * @param {Object} props
 */
export const AaveApproveCreditDelegationButton = ({
  className,
  label,
  assetCollateral,
  delegatee,
  delegationAmount,
  debtType,
  ...props
}) => {
  const { getReserveTokensAddresses } = useContractAaveProtocolDataProvider(
    contracts.aaveProtocolDataProvider
  );

  const reserveToken = getReserveTokensAddresses(
    assetCollateral // collateral
  );
  const debtTokenStable = useContractAaveDebtToken(
    idx(reserveToken, (_) => _.data.stableDebtTokenAddress)
  );
  const debtTokenVariable = useContractAaveDebtToken(
    idx(reserveToken, (_) => _.data.variableDebtTokenAddress)
  );

  const handleApproveDelegation = () => {
    if (debtType == "stable") {
      console.log("stable delegation");
      debtTokenStable.approveDelegation.execute({
        inputs: [delegatee, delegationAmount],
        // inputs: [delegatee, transformDecimalsToWad("1000000", 18)],
      });
    }
    if (debtType == "variable") {
      debtTokenVariable.approveDelegation.execute({
        inputs: [delegatee, delegationAmount],
      });
    }
  };

  return (
    <button className={className} onClick={handleApproveDelegation}>
      {label}
    </button>
  );
};

AaveApproveCreditDelegationButton.defaultProps = {
  label: "Approve Credit Delegation",
};

export default AaveApproveCreditDelegationButton;
