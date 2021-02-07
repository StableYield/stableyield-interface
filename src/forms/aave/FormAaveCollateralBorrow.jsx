import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractAaveLendingPool } from "../../hooks/useContractAaveLendingPool";
import { ERC20UnlockTransferFrom } from "../../components";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormAaveCollateralBorrow
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormAaveCollateralBorrow = ({
  address,
  defaultCollateral,
  cdpID,
  setSearchFilter,
  ...props
}) => {
  const { account } = useWeb3React();
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { deposit, borrow } = useContractAaveLendingPool(
    contractAddresses.aaveLendingPool
  );

  useEffect(() => {}, [formValues]);

  const [options, optionDefault] = useMemo(() => {
    let options = stableCoins.map((coin) => {
      return {
        value: coin.address,
        decimals: coin.decimals,
        label: `${coin.name} (${coin.symbol})`,
      };
    });

    let optionDefault = "";
    if (defaultCollateral) {
      optionDefault = options
        .filter((op) => op.value == defaultCollateral)
        .reduce((a, {}) => ({ ...a }));
    }

    return [options, optionDefault];
  }, []);

  // Form
  const onSubmit = async (values) => {
    // const decimals = await contractToken.decimals();
    console.log(values.collateral, "values.collateral");
    if (values) {
      borrow.execute({
        inputs: [
          // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // collateral
          // transformDecimalsToWad(values.amount, 18), // amount
          values.collateral.value,
          transformDecimalsToWad(values.amount, values.collateral.decimals), // amount
          values.interestRateMode.value, // Interest Rate Mode
          "0x0", // Referral Code
          values.onBehalfOf.value,
        ],
      });
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex-2 order-2 card">
          <h3 className="text-xl font-bold border-bottom pb-2 mb-5">Details</h3>
          <div className="border-bottom pb-5 mb-5">
            <span className="block flex justify-between">
              <span>{formValues.amount || "0.00"}</span>
              <strong>Amount</strong>
            </span>
            <span className="block flex justify-between">
              <span>
                {idx(formValues, (_) => _.collateral.label) || "Select Token"}
              </span>
              <strong>Token</strong>{" "}
            </span>
            <span className="block flex justify-between">
              <span>
                {idx(formValues, (_) => _.interestRateMode.label) ||
                  "Select Interest Rate"}
              </span>
              <strong>Rate Mode</strong>{" "}
            </span>
            <span className="block flex justify-between">
              <span>
                {idx(formValues, (_) => _.onBehalfOf.label) ||
                  "Select Credit Line"}
              </span>
              <strong>Borrowing From</strong>{" "}
            </span>
          </div>
        </div>
        <form
          className={"form-default flex-4 pr-6"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input-default"
            name="amount"
            placeholder="Amount"
            ref={register({ required: true })}
          />
          <Controller
            className={"w-full mt-3"}
            name="collateral"
            control={control}
            defaultValue={optionDefault}
            placeholder="Select Collateral"
            options={options}
            as={Select}
            ref={register({ required: true })}
          />
          <Controller
            as={Select}
            className={"w-full mt-3"}
            name="interestRateMode"
            control={control}
            defaultValue={optionDefault}
            placeholder="Interest Rate Mode"
            options={[
              {
                value: 1,
                label: "Stable Rate",
              },
              {
                value: 2,
                label: "Variable Rate",
              },
            ]}
            ref={register({ required: true })}
          />
          <Controller
            as={Select}
            className={"w-full mt-3"}
            name="onBehalfOf"
            control={control}
            defaultValue={optionDefault}
            placeholder="Borrow From"
            options={[
              {
                value: account,
                label: "Personal Credit Line",
              },
              {
                value: "0x47C898d711ebd4dA72750041Dd480dFB70550832",
                label: "StableYield",
              },
            ]}
          />

          <div className="mt-3 block w-full">
            <button className="btn-indigo w-full">{props.label}</button>
          </div>
        </form>
      </div>
      {deposit && (
        <TransactionModal isConnected={deposit.method} transaction={deposit} />
      )}
    </>
  );
};

FormAaveCollateralBorrow.defaultProps = {
  label: "Borrow",
};

FormAaveCollateralBorrow.propTypes = {
  label: PropTypes.string,
};

export default FormAaveCollateralBorrow;
