import { useMemo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useContractBaseAaveLendingPool } from "../../hooks/useContractsBase";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../helpers/blockchain";

/**
 * @name AaveTokenAPY
 * @param {Object} props
 */
export const AaveTokenAPY = ({
  address,
  name,
  symbol,
  image,
  primary,
  classNameAPY,
}) => {
  const tagColor = primary ? "tag-green" : "tag-blue";
  const [currentLiquidityRate, currentLiquidityRateSet] = useState(false);
  const lendingPoolAddress = process.env.NEXT_PUBLIC_AAVE_LENDING_POOL;
  const lendingPool = useContractBaseAaveLendingPool(lendingPoolAddress);

  const { data, isSuccess, refetch } = useQuery(
    `aave-reserve-${address}`,
    async () => {
      if (!lendingPool) return null;
      const data = await lendingPool.getReserveData(address);
      return data;
    }
  );

  useEffect(() => {
    if (lendingPool && !data) refetch();
  }, [lendingPool]);

  useEffect(() => {
    if (data && isSuccess) {
      (async () => {
        currentLiquidityRateSet(
          numberTrimDecimals(transformTokenToHuman(data[3], 25), 2)
        );
      })();
    }
  }, [data]);

  return useMemo(() => {
    return (
      <div>
        <span className={classNameAPY}>
          {currentLiquidityRate ? (
            <span className="text-gray-600">{currentLiquidityRate}% APY</span>
          ) : (
            <span className="text-gradient gradient-gray-md bg-animate-fast">
              0.00 % APY
            </span>
          )}
        </span>
        {image && name && symbol && (
          <div
            className={`flex items-center mt-3 ${tagColor} inline-flex pr-3`}
          >
            <img src={image} width={22} className="self-center" />
            <span className="ml-2 text-md">
              {name} ({symbol})
            </span>
          </div>
        )}
      </div>
    );
  }, [currentLiquidityRate]);
};

AaveTokenAPY.defaultProps = {
  classNameAPY: "text-2xl font-bold",
  apy: "0.00",
  // name: "US Dollar",
  // symbol: "USD",
  // image: "/tokens/usdc.svg",
};

export default AaveTokenAPY;
//
