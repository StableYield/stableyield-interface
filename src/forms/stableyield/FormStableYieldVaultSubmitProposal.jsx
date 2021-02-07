import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVaultWithCreditDelegation } from "../../hooks";
import { ERC20UnlockTransferFrom } from "../../components";
import {
  FieldSelectStablecoin,
  FieldSelectStablecoinSimple,
  FieldInterestRateMode,
} from "../../components";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
import stableCoins from "../../constants/stablecoins";
/**
 * @name FormStableYieldVaultSubmitProposal
 * @description Create credit delegation proposal.
 * @version 0.0.1
 */

export const FormStableYieldVaultSubmitProposal = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch, setValue } = useForm();
  const formValues = watch();

  const { submitProposal } = useContractStableYieldVaultWithCreditDelegation(
    contractAddresses.stableYieldVault
  );

  useEffect(() => {}, [formValues]);

  const contractToken = useContractERC20(
    idx(formValues, (_) => _.delegationAsset.value)
  );

  // Form
  const decimals = contractToken.decimals();
  const onSubmit = async (values) => {
    if (values) {
      submitProposal.execute({
        inputs: [
          values.borrower,
          transformDecimalsToWad(values.amount, decimals.data),
          values.delegationAsset.value,
          transformDecimalsToWad(values.interestAmount, decimals.data),
          values.interestRateMode.value,
          values.details,
        ],
      });
    }
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default mt-3"
          name="borrower"
          placeholder="Borrower Address (0x...)"
          ref={register({ required: true })}
        />
        <input
          className="input-default mt-3"
          name="amount"
          placeholder="Loan Amount"
          ref={register({ required: true })}
        />
        <FieldSelectStablecoinSimple
          name="delegationAsset"
          control={control}
          className="mt-3"
          placeholder="Select Asset to Lend"
        />

        <input
          className="input-default mt-3"
          name="interestAmount"
          placeholder="Interest Amount"
          ref={register({ required: true })}
        />
        <FieldInterestRateMode className="mt-3" control={control} />
        <input
          className="input-default mt-3"
          name="details"
          placeholder="Details (IPFS Hash)"
          ref={register({ required: true })}
        />

        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
        </div>
      </form>
      {submitProposal && (
        <TransactionModal
          isConnected={submitProposal.method}
          transaction={submitProposal}
        />
      )}
    </>
  );
};

FormStableYieldVaultSubmitProposal.defaultProps = {
  label: "Submit Proposal",
};

FormStableYieldVaultSubmitProposal.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultSubmitProposal;
