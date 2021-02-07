import { useMemo } from "react";

/**
 * @name TransactionMethod
 * @param {Object} props
 */
export const TransactionMethod = ({ input, ...props }) => {
  const methodName = useMemo(() => {
    if (input.length > 2) {
      const method = input.substring(0, 10);
      return matchMethodHashToMethodName(method);
    } else {
      return "Send ETH";
    }
  }, [input]);

  return <div {...props}>{methodName}</div>;
};
export default TransactionMethod;

const matchMethodHashToMethodName = (method) => {
  switch (method) {
    case "0xa9059cbb":
      return "ERC20: Transfer";
    case "transferFrom":
      return "ERC20: TransferFrom";
    case "0x095ea7b3":
      return "ERC20: Approve";
    case "0x38ed1739":
      return "Uniswap: Token Swap";
    case "0x1cff79cd":
      return "MakerDAO: Execute";
    default:
      return method;
      break;
  }
};
