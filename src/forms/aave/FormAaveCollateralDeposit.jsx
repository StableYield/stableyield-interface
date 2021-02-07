import idx from "idx";
import { useMemo } from "react";
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
 * @name FormAaveCollateralDeposit
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormAaveCollateralDeposit = ({
  address,
  defaultCollateral,
  cdpID,
  setSearchFilter,
  ...props
}) => {
  const { account } = useWeb3React();
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { deposit } = useContractAaveLendingPool(
    contractAddresses.aaveLendingPool
  );

  const contractToken = useContractERC20(
    idx(formValues, (_) => _.collateral.value)
  );

  const [options, optionDefault] = useMemo(() => {
    let options = stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });

    let optionDefault = options
      .filter((op) => op.value == defaultCollateral)
      .reduce((a, {}) => ({ ...a }));

    return [options, optionDefault];
  }, []);

  // Form
  const decimals = contractToken.decimals();
  const onSubmit = async (values) => {
    if (values) {
      deposit.execute({
        inputs: [
          values.collateral.value,
          transformDecimalsToWad(values.amount, decimals.data),
          account,
          "0x0",
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
          defaultValue={optionDefault}
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

        <div className="mt-3 block w-full">
          <ERC20UnlockTransferFrom
            address={idx(formValues, (_) => _.collateral.value)}
            allowanceOf={contractAddresses.aaveLendingPool}
          >
            <button className="btn-indigo w-full">{props.label}</button>
          </ERC20UnlockTransferFrom>
        </div>
      </form>
      {deposit && (
        <TransactionModal isConnected={deposit.method} transaction={deposit} />
      )}
    </>
  );
};

FormAaveCollateralDeposit.defaultProps = {
  label: "Deposit",
};

FormAaveCollateralDeposit.propTypes = {
  label: PropTypes.string,
};

export default FormAaveCollateralDeposit;
