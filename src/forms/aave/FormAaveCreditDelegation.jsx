import idx from "idx";
import { useMemo, useState } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import {
  useContractAaveLendingPool,
  useContractAaveProtocolDataProvider,
  useContractAaveDebtToken,
} from "../../hooks";
import { ERC20UnlockTransferFrom } from "../../components";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";

/**
 * @name FormAaveCreditDelegation
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormAaveCreditDelegation = ({
  address,
  defaultCollateral,
  cdpID,
  setSearchFilter,
  ...props
}) => {
  const { account } = useWeb3React();
  const [delegateeAllowance, delegateeAllowanceSet] = useState();
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { deposit } = useContractAaveLendingPool(
    contractAddresses.aaveLendingPool
  );
  const {
    contract,
    getReserveTokensAddresses,
  } = useContractAaveProtocolDataProvider(
    contractAddresses.aaveProtocolDataProvider
  );

  const contractToken = useContractERC20(
    idx(formValues, (_) => _.collateral.value)
  );

  const reserveToken = getReserveTokensAddresses(
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" // collateral
    // idx(formValues, (_) => _.collateral.value)
  );
  const debtToken = useContractAaveDebtToken(
    idx(reserveToken, (_) => _.data.stableDebtTokenAddress)
  );

  const borrowAllowance = debtToken.borrowAllowance(
    account,
    formValues.delegatee
  );

  const [options, optionDefault] = useMemo(() => {
    let options = stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });

    let optionDefault = [];

    return [options, optionDefault];
  }, []);

  /* ------------------ */
  // onSubmit : Handler
  /* ------------------ */
  const onSubmit = async (values) => {
    const decimals = await contractToken.decimals();
    if (values) {
      debtToken.approveDelegation.execute({
        inputs: [
          values.delegatee,
          transformDecimalsToWad(values.amount, decimals),
        ],
      });
    }
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className={"w-full"}
          name="collateral"
          control={control}
          defaultValue={""}
          placeholder="Select Collateral"
          options={options}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="delegatee"
          placeholder="Delegatee"
          ref={register({ required: true })}
        />
        <input
          className="input-default mt-3"
          name="amount"
          placeholder="Amount"
          ref={register({ required: true })}
        />

        <span>
          Current Allowance:{" "}
          {idx(borrowAllowance, (_) => _.data) &&
            borrowAllowance.data.toString()}
        </span>

        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
          {/* <ERC20UnlockTransferFrom
            address={idx(formValues, (_) => _.collateral.value)}
            allowanceOf={contractAddresses.aaveLendingPool}
          >
          </ERC20UnlockTransferFrom> */}
        </div>
      </form>
      {deposit && (
        <TransactionModal isConnected={deposit.method} transaction={deposit} />
      )}
    </>
  );
};

FormAaveCreditDelegation.defaultProps = {
  label: "Deposit",
};

FormAaveCreditDelegation.propTypes = {
  label: PropTypes.string,
};

export default FormAaveCreditDelegation;
