import classnames from "classnames";
import { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";

import contracts from "../constants/contracts";
import { useContractBaseAaveLendingPool } from "../hooks/useContractsBase";
import { useContractAaveLendingPool } from "../hooks/useContractAaveLendingPool";
import { useContractAaveProtocolDataProvider } from "../hooks/useContractAaveProtocolDataProvider";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../helpers/blockchain";

/**
 * @name MakerUserAccountData
 * @param {Object} props
 */
export const MakerUserAccountData = ({
  classNameContainer,
  classNameGrid,
  classItemContainer,
  classNameLabel,
  classNameValue,
  label,
  ...props
}) => {
  const { account } = useWeb3React();
  const [userDetails, userDetailsSet] = useState(false);
  const lendingPoolAddress = process.env.NEXT_PUBLIC_AAVE_LENDING_POOL;
  const lendingPool = useContractBaseAaveLendingPool(lendingPoolAddress);

  const aaveLendingPool = useContractAaveLendingPool(lendingPoolAddress);
  const aaveProtocolDataProvider = useContractAaveProtocolDataProvider(
    contracts.aaveProtocolDataProvider
  );

  const { data, isSuccess, refetch } = aaveLendingPool.getUserAccountData(
    account
  );

  useEffect(() => {
    console.log(data, "userDatauserData");
  }, [data]);
  const defaultHealthFactory =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  useEffect(() => {
    if (data && isSuccess) {
      (async () => {
        userDetailsSet({
          totalCollateralETH: numberTrimDecimals(
            transformTokenToHuman(data[0])
          ),
          totalDebtETH: numberTrimDecimals(transformTokenToHuman(data[1])),
          availableBorrowEth: numberTrimDecimals(
            transformTokenToHuman(data[2], 18)
          ),
          currentLiquidationThreshold: numberTrimDecimals(
            transformTokenToHuman(data[3], 18)
          ),
          ltv: numberTrimDecimals(transformTokenToHuman(data[4])),
          healthFactor:
            data[5]._hex == defaultHealthFactory
              ? "0"
              : numberTrimDecimals(transformTokenToHuman(data[5])),
        });
      })();
    }
  }, [data]);

  const classContainer = classnames(`relative`, classNameContainer);
  const classGridContainer = classnames(
    `grid grid-cols-2 gap-y-5 space-x-2 
    md:grid md:grid-cols-5 md:gap-x-1 md:gap-y-5 md:space-y-0 max-h-64 
    overflow-auto relative`,
    classNameGrid
  );
  const classNameItemContainer = classnames("flex px-3", classItemContainer);

  return useMemo(() => {
    return (
      <div className={classContainer}>
        <div className={classGridContainer}>
          <AccountStatistic
            label="Active Vaults"
            value={userDetails.healthFactor}
            className={classNameItemContainer}
            classNameLabel={classNameLabel}
            classNameValue={classNameValue}
          />
          <AccountStatistic
            label="Collateration"
            value={"0.00%"}
            className={classNameItemContainer}
            classNameLabel={classNameLabel}
            classNameValue={classNameValue}
          />
          <AccountStatistic
            label="Debt"
            value={`${userDetails.totalCollateralETH} DAI`}
            className={classNameItemContainer}
            classNameLabel={classNameLabel}
            classNameValue={classNameValue}
          />
          <AccountStatistic
            label="Mintable"
            value={`${userDetails.availableBorrowEth} DAI`}
            className={classNameItemContainer}
            classNameLabel={classNameLabel}
            classNameValue={classNameValue}
          />
          <AccountStatistic
            label="Withdrawable"
            value={`${userDetails.totalDebtETH} ETH`}
            className={classNameItemContainer}
            classNameLabel={classNameLabel}
            classNameValue={classNameValue}
          />
        </div>
        {label && (
          <span className="absolute -top-3 -right-4 tag-green shadow-md border-2 border-solid border-white">
            {label} <img src="/dapps/maker.svg" width={15} className="ml-2" />
          </span>
        )}
      </div>
    );
  }, [userDetails]);
};

MakerUserAccountData.defaultProps = {
  label: undefined,
};

const AccountStatistic = ({
  label,
  value,
  image,
  className,
  classNameLabel,
  classNameValue,
}) => {
  const classContainer = classnames("flex", className);
  const classValue = classnames("text-xl font-bold", classNameLabel);
  const classLabel = classnames("text-md", classNameValue);
  return (
    <div className={classContainer}>
      <h5 className={classValue}>{value}</h5>
      <span className={classLabel}>{label}</span>
    </div>
  );
};

export default MakerUserAccountData;
