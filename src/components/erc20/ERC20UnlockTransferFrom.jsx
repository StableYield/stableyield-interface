/* --- Global --- */
import { PropTypes } from "prop-types";
import { utils, BigNumber } from "ethers";

/* --- Local --- */
import { useContractERC20 } from "../../hooks/useContractERC20";
import {
  transformTokenToHuman,
  numberTrimDecimals,
  transformDecimalsToWad,
} from "../../helpers/blockchain";
import { useEffect, useMemo, useState } from "react";

/**
 * @name ERC20UnlockTransferFrom
 * @param {Object} props
 */
export const ERC20UnlockTransferFrom = ({
  address,
  allowanceOf,
  label,
  children,
}) => {
  const [allowanceStatusPrev, allowanceStatusPrevSet] = useState(0);
  const [allowanceStatus, allowanceStatusSet] = useState(0);
  const infiniteApproveAmount = BigNumber.from(10).pow(18).mul(1000000000000);

  // ERC20 Contract
  // console.log(address, "address");
  const contractToken = useContractERC20(address);
  const balance = contractToken.balanceOf();
  const targetAllowance = contractToken.allowance(allowanceOf);

  useEffect(() => {
    // console.log(balance, "balancebalance");
  }, [contractToken]);

  useEffect(() => {
    // console.log(balance, "balancebalance");
  }, [balance]);

  /**
   * @name EffectDeterimineAllowanceStatus
   * @description Checks the balanceOf and allowance status of target contract.
   */
  useEffect(() => {
    if (
      BigNumber.isBigNumber(targetAllowance.data) &&
      BigNumber.isBigNumber(balance.data)
    ) {
      if (balance.data.gt("0")) {
        if (targetAllowance.data.gt("0")) {
          if (targetAllowance.data.lt(balance.data)) allowanceStatusSet(2);
          if (targetAllowance.data.gte(balance.data)) allowanceStatusSet(3);
        }
        if (targetAllowance.data.eq("0")) {
          allowanceStatusSet(0);
        }
      } else {
        allowanceStatusSet(4);
      }
    }
  }, [balance.isFetching, targetAllowance.isFetching]);

  const allowanceFormatted = useMemo(() => {
    if (
      targetAllowance.isSuccess &&
      targetAllowance.data &&
      targetAllowance.data.gt("0")
    ) {
      return numberTrimDecimals(transformTokenToHuman(targetAllowance.data));
    }
  }, [targetAllowance]);

  /**
   * @name EffectDeterimineAllowanceStatus
   * @description Tracks the approve transaction status.
   */
  useEffect(() => {
    if (contractToken.approve.isConfirmed) {
      // allowanceStatusSet(false);
      balance.refetch();
      targetAllowance.refetch();
    }
  }, [contractToken.approve]);

  // Handlers
  const handleToggleProp = () => {
    allowanceStatusSet(1);
  };

  const handleCancel = () => {
    allowanceStatusPrevSet(allowanceStatus);
    allowanceStatusSet(allowanceStatusPrev);
  };
  const handleIncreaseAllowance = () => {
    allowanceStatusPrevSet(allowanceStatus);
    allowanceStatusSet(1);
  };

  const decimals = contractToken.decimals();
  const handleApproveAction = async (amount) => {
    contractToken.approve.execute({
      inputs: [allowanceOf, transformDecimalsToWad(amount, decimals.data)],
    });
  };

  if (allowanceStatus === 0) {
    return (
      <button
        type="button"
        className="btn-green w-full"
        onClick={handleToggleProp}
      >
        {label}
      </button>
    );
  }

  if (allowanceStatus === 1)
    return (
      <>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="btn-indigo w-1/2"
            onClick={() => handleApproveAction(balance.data.toString())}
          >
            Unlock Balance
          </button>
          <button
            type="button"
            className="btn-green w-1/2 ml-3"
            onClick={() =>
              handleApproveAction(infiniteApproveAmount.toString())
            }
          >
            Infinite Unlock
          </button>
          <div className="text-right ml-2 self-center">
            <span onClick={handleCancel} className="cursor-pointer tag-red">
              Cancel
            </span>
          </div>
        </div>
      </>
    );

  if (allowanceStatus === 2) {
    return (
      <>
        <div className="flex-1">{children}</div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-gray-500">
            <strong>Allowance: </strong>
            {allowanceFormatted}
          </span>
          <span className="tag-green" onClick={handleIncreaseAllowance}>
            Increase Allowance
          </span>
        </div>
      </>
    );
  }

  if (allowanceStatus === 3) {
    return children;
  }
  if (allowanceStatus === 4) {
    return <button className="btn-gray w-full">0.00 Balance</button>;
  }
  return null;
};

ERC20UnlockTransferFrom.defaultProps = {
  label: "Unlock Token 🔐",
};
ERC20UnlockTransferFrom.propTypes = {
  label: PropTypes.string,
};

export default ERC20UnlockTransferFrom;
