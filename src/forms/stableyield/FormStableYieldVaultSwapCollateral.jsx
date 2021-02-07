import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVault } from "../../hooks";
import { ERC20UnlockTransferFrom } from "../../components";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormStableYieldVaultSwapCollateral
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormStableYieldVaultSwapCollateral = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { swapCollateral } = useContractStableYieldVault(
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
      swapCollateral.execute({
        inputs: [values.collateral.value],
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
          placeholder="Select Collateral"
          options={options}
          as={Select}
        />

        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
        </div>
      </form>
      {swapCollateral && (
        <TransactionModal
          isConnected={swapCollateral.method}
          transaction={swapCollateral}
        />
      )}
    </>
  );
};

FormStableYieldVaultSwapCollateral.defaultProps = {
  label: "Swap Collateral Position",
};

FormStableYieldVaultSwapCollateral.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultSwapCollateral;
