utils;
import { utils } from "ethers";
import stablecoins from "../constants/stablecoins";

export const getStablecoinDecimals = (address) => {
  const filter = stablecoins.filter(
    (coin) => utils.getAddress(coin.address) == utils.getAddress(address)
  );
  console.log(filter, "stablecoins");
  if (filter[0]) {
    return filter[0].decimals;
  } else {
    return null;
  }
};
