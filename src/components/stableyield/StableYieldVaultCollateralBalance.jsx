import { useMemo } from "react";

import contracts from "../../constants/contracts";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVault } from "../../hooks";
import { commifyTokenBalance } from "../../helpers/blockchain";

/**
 * @name StableYieldVaultCollateralBalance
 * @param {Object} props
 */
export const StableYieldVaultCollateralBalance = ({
  className,
  defaultValue,
  aTok,
}) => {
  const contract = useContractStableYieldVault(contracts.stableYieldVault);
  const aToken = contract.aTokenAddress();

  const erc20 = useContractERC20(aToken.data);
  const { data } = erc20.balanceOf(contracts.stableYieldVault);
  return useMemo(() => {
    if (data) {
      const dataFormatted = commifyTokenBalance(data);
      return <span className={className}>{dataFormatted}</span>;
    } else {
      return <span className={className}>{defaultValue}</span>;
    }
  }, [data]);
};

StableYieldVaultCollateralBalance.defaultProps = {
  defaultValue: "0.00",
};

export default StableYieldVaultCollateralBalance;
