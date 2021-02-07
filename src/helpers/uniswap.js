export const filterUniswapV2SwapData = (swap) => {
  if (Number(swap.amount0In) > 0) {
    swap.details = {
      in: swap.amount0In,
      out: swap.amount1Out,
      tokenIn: swap.pair.token0,
      tokenOut: swap.pair.token1,
    };
  } else if (Number(swap.amount1In) > 0) {
    swap.details = {
      in: swap.amount1In,
      out: swap.amount0Out,
      tokenIn: swap.pair.token1,
      tokenOut: swap.pair.token0,
    };
  }

  return swap;
};
