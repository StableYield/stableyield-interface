import { AaveTokenAPY } from "../components";

import tokens from "../constants/tokens";

/**
 * @name AaveStableCoinAPYRates
 * @param {Object} props
 */
export const AaveStableCoinAPYRates = (props) => {
  return (
    <dl className="space-x-2 grid grid-cols-2 gap-y-5 md:grid md:grid-cols-5 md:gap-x-1 md:gap-y-10 md:space-y-0 max-h-64 overflow-auto">
      <AaveTokenAPY
        primary
        apy="18.3"
        address={tokens.tokenBUSD}
        name="Binance USD"
        symbol="BUSD"
        image="/tokens/busd.svg"
      />
      <AaveTokenAPY
        address={tokens.tokenTUSD}
        apy="14.3"
        name="True USD"
        symbol="TUSD"
        image="/tokens/tusd.svg"
      />
      <AaveTokenAPY
        address={tokens.tokenSUSD}
        apy="10.3"
        name="sUSD"
        symbol="sUSD"
        image="/tokens/susd.svg"
      />
      <AaveTokenAPY
        address={tokens.tokenUSDT}
        apy="6.3"
        name="USDT Coin"
        symbol="USDT"
        image="/tokens/usdt.svg"
      />
      <AaveTokenAPY
        address={tokens.tokenDAI}
        apy="4.3"
        name="DAI Coin"
        symbol="DAI"
        image="/tokens/dai.svg"
      />
    </dl>
  );
};
export default AaveStableCoinAPYRates;
