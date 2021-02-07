import tokens from "./tokens";

export default [
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ether",
    symbol: "WETH",
    image: "/tokens/weth.png",
    decimals: 18,
  },
  {
    address: tokens.tokenBUSD,
    name: "Binance USD",
    symbol: "BUSD",
    image: "/tokens/busd.svg",
    decimals: 18,
  },
  {
    address: tokens.tokenDAI,
    name: "DAI Stablcoin",
    symbol: "DAI",
    image: "/tokens/dai.svg",
    decimals: 18,
  },
  {
    address: tokens.tokenUSDC,
    name: "USD Coin",
    symbol: "USDC",
    image: "/tokens/usdc.svg",
    decimals: 6,
  },
  {
    address: tokens.tokenUSDT,
    name: "USDT Coin",
    symbol: "USDT",
    image: "/tokens/usdt.svg",
    decimals: 6,
  },
  {
    address: tokens.tokenSUSD,
    name: "Synthetix USD",
    symbol: "sUSD",
    image: "/tokens/susd.svg",
    decimals: 18,
  },
  {
    address: tokens.tokenTUSD,
    name: "Trust USD",
    symbol: "TUSD",
    image: "/tokens/tusd.svg",
    decimals: 18,
  },
  {
    address: tokens.tokenGUSD,
    name: "Gemini Dollar",
    symbol: "GUSD",
    image: "/tokens/gusd.svg",
    decimals: 2,
  },
];
