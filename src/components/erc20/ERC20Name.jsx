import { useMemo } from "react";
import { useContractERC20 } from "../../hooks/useContractERC20";

/**
 * @name ERC20Name
 * @param {Object} props
 */
export const ERC20Name = ({ address, className }) => {
  const erc20 = useContractERC20(address);
  const { data } = erc20.name();
  return useMemo(() => {
    if (data) {
      return <span className={className}>{data}</span>;
    } else {
      return null;
    }
  }, [data]);
};
export default ERC20Name;
