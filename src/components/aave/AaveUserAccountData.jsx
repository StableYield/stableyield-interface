import classnames from "classnames";
import { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useContractBaseAaveLendingPool } from "../../hooks/useContractsBase";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";

/**
 * @name AaveUserAccountData
 * @param {Object} props
 */
export const AaveUserAccountData = ({
  classNameContainer,
  classNameItemContainer,
  ...props
}) => {
  const { account } = useWeb3React();
  const [userDetails, userDetailsSet] = useState(false);
  const lendingPoolAddress = process.env.NEXT_PUBLIC_AAVE_LENDING_POOL;
  const lendingPool = useContractBaseAaveLendingPool(lendingPoolAddress);

  const { data, isSuccess, refetch } = useQuery(
    `aave-user-${account}`,
    async () => {
      if (!lendingPool) return null;
      const data = await lendingPool.getUserAccountData(account);
      return data;
    }
  );

  useEffect(() => {
    if (lendingPool && !data) refetch();
  }, [lendingPool]);

  useEffect(() => {
    if (data && isSuccess) {
      (async () => {
        userDetailsSet({
          availableBorrowEth: numberTrimDecimals(
            transformTokenToHuman(data[0], 18)
          ),
          currentLiquidationThreshold: numberTrimDecimals(
            transformTokenToHuman(data[1], 18)
          ),
          healthFactor: numberTrimDecimals(transformTokenToHuman(data[2])),
          ltv: numberTrimDecimals(transformTokenToHuman(data[3])),
          totalCollateralETH: transformTokenToHuman(data[4]),
          totalDebtETH: transformTokenToHuman(data[5]),
        });
      })();
    }
  }, [data]);

  const classContainer = classnames("flex", classNameContainer);
  const classItem = classnames(
    "flex justify-between items-center",
    classNameItemContainer
  );

  return useMemo(() => {
    return (
      <div className={classContainer}>
        <AccountStatistic
          label="Borrowable ETH"
          value={userDetails.availableBorrowEth}
          classNameContainer={classItem}
        />
        <AccountStatistic
          label="Health Factor"
          value={userDetails.healthFactor}
          classNameContainer={classItem}
        />
        <AccountStatistic
          label="Loan Value"
          value={userDetails.ltv}
          classNameContainer={classItem}
        />
      </div>
    );
  }, [userDetails]);
};

AaveUserAccountData.defaultProps = {
  apy: "0.00",
  name: "US Dollar",
  symbol: "USD",
  image: "/tokens/dai.svg",
};

const AccountStatistic = ({ label, value, image, classNameContainer }) => {
  const classContainer = classnames("flex", classNameContainer);
  return (
    <div className={classContainer}>
      <span className=" tag-gree text-md">{label}:</span>
      <h5 className="text-xl font-bold">
        <span className="text-gray-500 bg-animate-fast">{value}</span>
      </h5>
    </div>
  );
};

export default AaveUserAccountData;
