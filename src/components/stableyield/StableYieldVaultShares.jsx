import { useMemo } from "react";

import contracts from "../../constants/contracts";
import { useContractStableYieldVault } from "../../hooks";
import { commifyTokenBalance } from "../../helpers/blockchain";

/**
 * @name StableYieldVaultShares
 * @param {Object} props
 */
export const StableYieldVaultShares = ({ className, defaultValue }) => {
  const contract = useContractStableYieldVault(contracts.stableYieldVault);
  const { data } = contract.balanceOf();
  return useMemo(() => {
    if (data) {
      const dataFormatted = commifyTokenBalance(data);
      return <span className={className}>{dataFormatted}</span>;
    } else {
      return <span className={className}>{defaultValue}</span>;
    }
  }, [data]);
};

StableYieldVaultShares.defaultProps = {
  defaultValue: "0.00",
};

export default StableYieldVaultShares;
