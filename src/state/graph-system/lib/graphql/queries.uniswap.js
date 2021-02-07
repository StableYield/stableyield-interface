import { gql } from "graphql-request";

/**
 * @name SWAPS_QUERY
 * @description Request a user
 */
export const SWAPS_QUERY = gql`
  query($where: Swap_filter, $first: Int, $orderBy: String) {
    swaps(first: $first, orderBy: $orderBy, where: $where) {
      id
      transaction {
        id
      }
      timestamp
      pair {
        token0 {
          id
          symbol
          name
          decimals
          totalSupply
          tradeVolume
          tradeVolumeUSD
          untrackedVolumeUSD
          txCount
          totalLiquidity
          derivedETH
        }
        token1 {
          id
          symbol
          name
          decimals
          totalSupply
          tradeVolume
          tradeVolumeUSD
          untrackedVolumeUSD
          txCount
          totalLiquidity
          derivedETH
        }
      }
      sender
      amount0In
      amount1In
      amount0Out
      amount1Out
      to
      logIndex
      amountUSD
    }
  }
`;
