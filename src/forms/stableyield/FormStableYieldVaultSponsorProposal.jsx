import idx from "idx";
import { useEffect, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { ERC20UnlockTransferFrom, TransactionModal } from "../../components";
import { useContractERC20 } from "../../hooks/useContractERC20";
import { useContractStableYieldVaultWithCreditDelegation } from "../../hooks";
import { transformDecimalsToWad } from "../../helpers/blockchain";
import contractAddresses from "../../constants/contracts";
/**
 * @name FormStableYieldVaultSponsorProposal
 * @description Create credit delegation proposal.
 * @version 0.0.1
 */

export const FormStableYieldVaultSponsorProposal = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch, setValue } = useForm();

  const { sponsorProposal } = useContractStableYieldVaultWithCreditDelegation(
    contractAddresses.stableYieldVault
  );

  // Form
  const onSubmit = async (values) => {
    if (values) {
      sponsorProposal.execute({
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
      {sponsorProposal && (
        <TransactionModal
          isConnected={sponsorProposal.method}
          transaction={sponsorProposal}
        />
      )}
    </>
  );
};

FormStableYieldVaultSponsorProposal.defaultProps = {
  label: "Sponsor Proposal",
};

FormStableYieldVaultSponsorProposal.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultSponsorProposal;
