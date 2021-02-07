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
 * @name FormStableYieldVaultVoteOnProposal
 * @description Create credit delegation proposal.
 * @version 0.0.1
 */

export const FormStableYieldVaultVoteOnProposal = ({
  address,
  defaultCollateral,
  ...props
}) => {
  const { handleSubmit, register, control, watch, setValue } = useForm();

  const { voteOnProposal } = useContractStableYieldVaultWithCreditDelegation(
    contractAddresses.stableYieldVault
  );

  // Form
  const onSubmit = async (values) => {
    if (values) {
      voteOnProposal.execute({
        inputs: [
          transformDecimalsToWad(values.sharesToStake, 18),
          values.proposalIndex,
          values.vote.value,
        ],
      });
    }
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default mt-3"
          name="sharesToStake"
          placeholder="Shares to Stake"
          ref={register({ required: true })}
        />
        <input
          className="input-default mt-3"
          name="proposalIndex"
          placeholder="Proposal Index"
          ref={register({ required: true })}
        />

        <Controller
          control={control}
          className={"mt-3"}
          name="vote"
          placeholder="Select Vote"
          options={[
            {
              value: 2,
              label: "No",
            },
            {
              value: 1,
              label: "Yes",
            },
          ]}
          as={Select}
        />
        <div className="mt-3 block w-full">
          <button className="btn-indigo w-full">{props.label}</button>
          <ERC20UnlockTransferFrom
            address={contractAddresses.stableYieldVault}
            allowanceOf={contractAddresses.stableYieldVault}
          ></ERC20UnlockTransferFrom>
        </div>
      </form>
      {voteOnProposal && (
        <TransactionModal
          isConnected={voteOnProposal.method}
          transaction={voteOnProposal}
        />
      )}
    </>
  );
};

FormStableYieldVaultVoteOnProposal.defaultProps = {
  label: "Vote On Proposal",
};

FormStableYieldVaultVoteOnProposal.propTypes = {
  label: PropTypes.string,
};

export default FormStableYieldVaultVoteOnProposal;
