import { useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select, { createFilter } from "react-select";
import { useContractTransactionLifecycle } from "../../state/web3-react-system";
import { useContractAaveLendingPool } from "../../hooks/useContractAaveLendingPool";

import { useContractERC20 } from "../../hooks/useContractERC20";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormAaveCollateralWithdraw
 * @description Withdraw Collateral from Aave LendingPool
 * @version 0.0.1
 */

export const FormAaveCollateralWithdraw = ({
  cdpID,
  setSearchFilter,
  ...props
}) => {
  // Component State
  const { account } = useWeb3React();
  const [tokenAddress, tokenAddressSet] = useState();
  const [transaction, transactionSet] = useState();
  const [vault, vaultSet] = useState();
  const { handleSubmit, register, control, watch } = useForm();

  const transactionLifecycle = useContractTransactionLifecycle();
  // console.log(transactionLifecycle, "transactionLifecycle");

  const { deposit, withdraw } = useContractAaveLendingPool(
    contractAddresses.aaveLendingPool
  );

  console.log(deposit, "lendingPool");

  const formValues = watch();

  const tokenContract = useContractERC20(tokenAddress);
  const allowance = tokenContract.allowance(
    contractAddresses.aaveLendingPool,
    account
  );

  console.log(allowance, "allowanceallowance");

  useEffect(() => {
    if (formValues && formValues.collateral) {
      tokenAddressSet(formValues.collateral.value);
    }
  }, [formValues]);

  useEffect(() => {
    if (account) {
      (async () => {
        // const allowance = await tokenContract.allowance(
        //   contractAddresses.aaveLendingPool,
        //   account
        // );
        console.log(allowance, "allowanceallowance");
      })();
    }
  }, [tokenContract]);

  const handleApproveToken = () => {
    tokenContract.approve.execute([
      contractAddresses.aaveLendingPool,
      transformDecimalsToWad(formValues.amount),
    ]);
  };
  const handleWithdrawCollateral = () => {
    withdraw.execute([
      formValues.collateral.value,
      transformDecimalsToWad(formValues.amount),
      account,
    ]);
  };

  const options = useMemo(() => {
    return stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });
  }, []);

  // Form
  const onSubmit = async (values) => {
    if (values) {
      deposit.execute([
        values.collateral.value,
        transformDecimalsToWad(values.amount),
        account,
        "0x0",
      ]);
    }
  };
  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={"w-full"}
          name="collateral"
          control={control}
          defaultValue={options[0]}
          placeholder="Select Collateral"
          options={options}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="amount"
          placeholder="Amount"
          ref={register({ required: true })}
        />

        <button className="btn-indigo w-full mt-5">{props.label}</button>
        <button
          type="button"
          onClick={handleWithdrawCollateral}
          className="btn-blue w-full mt-5"
        >
          Withdraw
        </button>
        <button
          type="button"
          onClick={handleApproveToken}
          className="btn-green w-full mt-5"
        >
          Approve Token
        </button>
      </form>
      {/* {transaction && (
        <TransactionModal isConnected={address} transaction={execute} />
      )} */}
    </>
  );
};

FormAaveCollateralWithdraw.defaultProps = {
  label: "Deposit",
  sx: {},
};

FormAaveCollateralWithdraw.propTypes = {
  sx: PropTypes.object,
};

export default FormAaveCollateralWithdraw;
