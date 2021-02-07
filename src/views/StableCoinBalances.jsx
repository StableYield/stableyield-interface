import { ERC20Balance } from "../components";
import tokens from "../constants/tokens";

/**
 * @name StableCoinBalances
 * @param {Object} props
 */
export const StableCoinBalances = (props) => {
  return (
    <dl
      className="space-x-2 grid grid-cols-2 gap-y-5 
          md:grid md:grid-cols-3 md:gap-x-1 md:gap-y-10 md:space-y-0 
          lg:grid lg:grid-cols-7 lg:gap-x-1 lg:gap-y-10 lg:space-y-0 
          max-h-64 overflow-auto"
    >
      <TokenBalanceCard
        address={tokens.tokenDAI}
        apy="4.3"
        name="DAI Coin"
        symbol="DAI"
        image="/tokens/dai.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenUSDC}
        apy="4.3"
        name="USD Coin"
        symbol="USDC"
        image="/tokens/usdc.svg"
      />
      <TokenBalanceCard
        primary
        apy="18.3"
        address={tokens.tokenBUSD}
        name="Binance USD"
        symbol="BUSD"
        image="/tokens/busd.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenTUSD}
        apy="14.3"
        name="True USD"
        symbol="TUSD"
        image="/tokens/tusd.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenSUSD}
        apy="10.3"
        name="sUSD"
        symbol="sUSD"
        image="/tokens/susd.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenUSDT}
        apy="6.3"
        name="USDT Coin"
        symbol="USDT"
        image="/tokens/usdt.svg"
      />
      <TokenBalanceCard
        address={tokens.tokenGUSD}
        apy="4.3"
        name="Gemini Dollar"
        symbol="GUSD"
        image="/tokens/gusd.svg"
      />
    </dl>
  );
};

const TokenBalanceCard = ({ address, name, symbol, image, className }) => {
  return (
    <div className={`${className} text-left`}>
      <h5 className="text-2xl font-bold">
        <ERC20Balance address={address} />
      </h5>
      <div className={`flex items-center mt-3 inline-flex pr-3 tag-blue`}>
        <img src={image} width={22} className="self-center" />
        <span className="ml-2 text-md">({symbol})</span>
      </div>
    </div>
  );
};

export default StableCoinBalances;
