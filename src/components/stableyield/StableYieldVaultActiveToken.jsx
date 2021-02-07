import { useMemo, useState, useEffect } from "react";

import contracts from "../../constants/contracts";
import { useContractBaseStableYieldVault } from "../../hooks/useContractsBase";
import { useContractStableYieldVault } from "../../hooks";
import { commifyTokenBalance } from "../../helpers/blockchain";
import {
  Address,
  ERC20Balance,
  TokenBalance,
  TokenImage,
  ERC20Name,
  ERC20Symbol,
  EpochToCalendarDate,
  EpochToRelativeDate,
  LoadingBox,
  AaveTokenAPY,
} from "../../components";

/**
 * @name StableYieldVaultActiveToken
 * @param {Object} props
 */
export const StableYieldVaultActiveToken = ({ className, defaultValue }) => {
  const contractVault = useContractBaseStableYieldVault(
    contracts.stableYieldVault
  );
  const contract = useContractStableYieldVault(contracts.stableYieldVault);
  const { data } = contract.balanceOf();
  const [approvedToken, approvedTokenSet] = useState();
  useEffect(() => {
    if (contractVault && !approvedToken) {
      (async () => {
        const activeToken = await contractVault.token();
        const activeAToken = await contractVault.aToken();
        approvedTokenSet(activeToken);
      })();
    }
  }, [contract]);

  return useMemo(() => {
    if (approvedToken) {
      return (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <TokenImage address={approvedToken} width={48} />
            <span className="text-4xl font-black ml-4">
              <ERC20Name address={approvedToken} />
            </span>
            {/* <span className="block">Active Token</span> */}
          </div>
          <span className="text-4xl">
            <AaveTokenAPY
              primary
              address={approvedToken}
              classNameAPY="text-4xl font-black"
            />
          </span>
        </div>
      );
      return <span className={className}>{approvedToken}</span>;
    } else {
      return <span className={className}>{defaultValue}</span>;
    }
  }, [approvedToken]);
};

StableYieldVaultActiveToken.defaultProps = {
  defaultValue: "Loading...",
};

export default StableYieldVaultActiveToken;
