import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVaultWithCreditDelegation } from "../../hooks";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
/**
 * @name FormStableYieldVaultProcessProposal
 * @description Create credit delegation proposal.
 * @version 0.0.1
 */

export const FormStableYieldVaultProcessProposal = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch, setValue } = useForm();
  const formValues = watch();

  const { processProposal } = useContractStableYieldVaultWithCreditDelegation(
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
      processProposal.execute({
        inputs: [values.proposalIndex],
      });
    }
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default mt-3"
          name="proposalIndex"
          placeholder="Proposal Index"
          ref={register({ required: true })}
        />
        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
        </div>
      </form>
      {processProposal && (
        <TransactionModal
          isConnected={processProposal.method}
          transaction={processProposal}
        />
      )}
    </>
  );
};

FormStableYieldVaultProcessProposal.defaultProps = {
  label: "Process Proposal",
};

FormStableYieldVaultProcessProposal.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultProcessProposal;
