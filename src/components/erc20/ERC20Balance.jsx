import idx from "idx";
import { useEffect, useState, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  transformTokenToHuman,
  numberTrimDecimals,
} from "../../state/web3-react-system/lib/helpers";
import { useContractBaseERC20 } from "../../hooks/useContractsBase";
import { useTransactionWatch } from "../../state/web3-react-system";
import { utils } from "ethers";

/**
 * @name ERC20Balance
 * @param {Object} props
 */
export const ERC20Balance = ({
  address,
  user,
  decimals,
  decimalsTrim,
  ...props
}) => {
  const [balance, setBalance] = useState();
  const erc20Contract = useContractBaseERC20(address);
  const { account, chainId } = useWeb3React();
  const transactionWatch = useTransactionWatch();
  useEffect(() => {
    if (account) {
      (async () => {
        if (idx(erc20Contract, (_) => _.address) && account) {
          try {
            const decimals = await erc20Contract.decimals();
            const balanceToken = await erc20Contract.balanceOf(
              user ? user : account
            );
            console.log(balanceToken, "balanceTokenbalanceToken");

            setBalance(
              numberTrimDecimals(
                transformTokenToHuman(balanceToken, decimals),
                decimalsTrim
              )
            );
          } catch (error) {
            setBalance("0.00");
          }
        }
      })();
    } else {
      setBalance("0.00");
    }
  }, [account, chainId]);

  useEffect(() => {
    if (
      idx(transactionWatch, (_) => _.transaction.name) &&
      transactionWatch.transaction.name.includes(utils.getAddress(address)) &&
      transactionWatch.transaction.status == "CONFIRMED"
    ) {
      (async () => {
        const decimals = await erc20Contract.decimals();
        const balanceToken = await erc20Contract.balanceOf(account);
        setBalance(
          numberTrimDecimals(
            transformTokenToHuman(balanceToken, decimals),
            decimalsTrim
          )
        );
      })();
    }
  }, [transactionWatch.transaction]);

  return useMemo(() => {
    return <span {...props}>{balance}</span>;
  }, [balance]);
};
export default ERC20Balance;

ERC20Balance.defaultProps = {
  balance: "0",
  decimals: 18,
  decimalsTrim: 4,
};
