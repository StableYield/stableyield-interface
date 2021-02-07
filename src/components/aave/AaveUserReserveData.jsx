import { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { useContractAaveProtocolDataProvider } from "../../hooks/useContractAaveProtocolDataProvider";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";

import contracts from "../../constants/contracts";
import idx from "idx";

/*
Contract: AaveProtocolDataProvider
Method: getUserReserveData
  0: BigNumber {_hex: "0x021e1a67ace9dffce645", _isBigNumber: true}
  1: BigNumber {_hex: "0x00", _isBigNumber: true}
  2: BigNumber {_hex: "0x00", _isBigNumber: true}
  3: BigNumber {_hex: "0x00", _isBigNumber: true}
  4: BigNumber {_hex: "0x00", _isBigNumber: true}
  5: BigNumber {_hex: "0x00", _isBigNumber: true}
  6: BigNumber {_hex: "0x30dc46d7dfb839356278a0", _isBigNumber: true}
  7: 0
  8: true
  currentATokenBalance: BigNumber {_hex: "0x021e1a67ace9dffce645", _isBigNumber: true}
  currentStableDebt: BigNumber {_hex: "0x00", _isBigNumber: true}
  currentVariableDebt: BigNumber {_hex: "0x00", _isBigNumber: true}
  liquidityRate: BigNumber {_hex: "0x30dc46d7dfb839356278a0", _isBigNumber: true}
  principalStableDebt: BigNumber {_hex: "0x00", _isBigNumber: true}
  scaledVariableDebt: BigNumber {_hex: "0x00", _isBigNumber: true}
  stableBorrowRate: BigNumber {_hex: "0x00", _isBigNumber: true}
  stableRateLastUpdated: 0
  usageAsCollateralEnabled: true
 */

/**
 * @name AaveUserReserveData
 * @param {Object} props
 */
export const AaveUserReserveData = ({ asset, name, symbol, ...props }) => {
  const { account } = useWeb3React();
  const aaveProtocolDataProvider = useContractAaveProtocolDataProvider(
    contracts.aaveProtocolDataProvider
  );

  const userReserveData = aaveProtocolDataProvider.getUserReserveData(
    asset,
    account
  );

  useEffect(() => {
    console.log(userReserveData, "userReserveData");
  }, [userReserveData]);

  return useMemo(() => {
    if (process.browser) {
      console.log(typeof userReserveData.data, "typeof userReserveData.data");
      if (typeof userReserveData.data === "object") {
        console.log(userReserveData.data, "userReserveData.data");
        return (
          <div>
            <h3 className="text-3xl border-bottom pb-3">
              {name} ({symbol})
            </h3>
            <div className="flex items-center mt-3">
              <AccountStatistic
                label="Lent"
                value={
                  idx(userReserveData, (_) => _.data[0]) &&
                  userReserveData.data[1].toString()
                }
              />
              <AccountStatistic
                label="Stable Debt"
                value={
                  idx(userReserveData, (_) => _.data[1]) &&
                  userReserveData.data[1].toString()
                }
              />
              <AccountStatistic
                label="Variable Debt"
                value={
                  idx(userReserveData, (_) => _.data[2]) &&
                  userReserveData.data[2].toString()
                }
              />
            </div>
          </div>
        );
      }
      if (typeof userReserveData.data == undefined) {
        return (
          <div className="flex-center flex-col p-10">
            <span>
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#000"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="#000"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <h5 className="text-xl border-bottom pb-3">
              {name} ({symbol})
            </h5>
          </div>
        );
      }
      return null;
    } else {
      return null;
    }
  }, [userReserveData]);
};

AaveUserReserveData.defaultProps = {
  apy: "0.00",
  name: "US Dollar",
  symbol: "USD",
  image: "/tokens/dai.svg",
};

const AccountStatistic = ({ label, value, image }) => {
  return (
    <div className="ml-3 text-center">
      <h5 className="text-3xl font-bold">
        <span className="text-gray-500 bg-animate-fast">{value}</span>
      </h5>
      <div className={`flex items-center tag-green mt-3 inline-flex pr-3`}>
        <span className="ml-2 text-md">{label}</span>
      </div>
    </div>
  );
};

export default AaveUserReserveData;
