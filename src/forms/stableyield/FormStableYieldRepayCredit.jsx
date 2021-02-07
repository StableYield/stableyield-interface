import idx from "idx";
import { useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useWeb3React } from "@web3-react/core";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVaultWithCreditDelegation } from "../../hooks";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormStableYieldRepayCredit
 * @description Deposit Collateral into the Aave LendingPool
 * @version 0.0.1
 */

export const FormStableYieldRepayCredit = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { account } = useWeb3React();
  const { handleSubmit, register, control, watch } = useForm();
  const formValues = watch();

  const { repayCredit } = useContractStableYieldVaultWithCreditDelegation(
    contractAddresses.stableYieldVault
  );

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
      repayCredit.execute({
        inputs: [transformDecimalsToWad(values.amount, 18)],
      });
    }
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default"
          name="amount"
          placeholder="Share Amount"
          ref={register({ required: true })}
        />

        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
        </div>
      </form>
      {repayCredit && (
        <TransactionModal
          isConnected={repayCredit.method}
          transaction={repayCredit}
        />
      )}
    </>
  );
};

FormStableYieldRepayCredit.defaultProps = {
  label: "Withdraw",
};

FormStableYieldRepayCredit.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldRepayCredit;
