import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVaultWithCreditDelegation } from "../../hooks";
import { ERC20UnlockTransferFrom } from "../../components";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormStableYieldVaultDeposit
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormStableYieldVaultDeposit = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { depositCollateral } = useContractStableYieldVaultWithCreditDelegation(
    contractAddresses.stableYieldVault
  );

  useEffect(() => {}, [formValues]);

  const contractToken = useContractERC20(
    idx(formValues, (_) => _.collateral.value)
  );

  const [options] = useMemo(() => {
    let options = stableCoins.map((coin) => {
      return {
        value: coin.address,
        label: `${coin.name} (${coin.symbol})`,
      };
    });

    return [options];
  }, []);

  // Form
  const decimals = contractToken.decimals();
  const onSubmit = async (values) => {
    if (values) {
      depositCollateral.execute({
        inputs: [
          values.collateral.value,
          transformDecimalsToWad(values.amount, decimals.data),
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
          placeholder="Select Stablecoin to Deposit"
          options={options}
          as={Select}
        />
        <input
          className="input-default mt-3"
          name="amount"
          placeholder="Stablecoin Amount"
          ref={register({ required: true })}
        />

        <div className="mt-3 block w-full">
          <ERC20UnlockTransferFrom
            address={idx(formValues, (_) => _.collateral.value)}
            allowanceOf={contractAddresses.stableYieldVault}
          >
            <button className="btn-indigo w-full">{props.label}</button>
          </ERC20UnlockTransferFrom>
        </div>
      </form>
      {depositCollateral && (
        <TransactionModal
          isConnected={depositCollateral.method}
          transaction={depositCollateral}
        />
      )}
    </>
  );
};

FormStableYieldVaultDeposit.defaultProps = {
  label: "Deposit",
};

FormStableYieldVaultDeposit.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultDeposit;
