/* --- Global --- */
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { useContractWETH, useGetContractAddress } from "../../hooks";
import { transformDecimalsToWad } from "../../state/web3-react-system/lib/helpers";
import { TransactionModal, TransactionButton } from "../../components";

/**
 * @name FormWethMint
 * @description Mint WETH by depositing ETH
 * @version 0.0.1
 */

export const FormWethMint = ({ setSearchFilter, ...props }) => {
  const { handleSubmit, register } = useForm();
  const wethAddress = useGetContractAddress("weth");
  const { deposit, isDeployed, isSigner } = useContractWETH(wethAddress);
  const onSubmit = (values) => {
    deposit.execute([], {
      value: transformDecimalsToWad(values.amount, 18).toHexString(),
    });
  };

  return (
    <>
      <form className={"form-default"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-default"
          name="amount"
          placeholder="Amount"
          ref={register({ required: true })}
        />
        <TransactionButton
          isConnected={isDeployed}
          isSigner={isSigner}
          label={props.label}
          className="btn-indigo w-max mt-3"
          classNameDisabled="w-max mt-3"
          transaction={deposit}
        />
      </form>
      {deposit && <TransactionModal transaction={deposit} />}
    </>
  );
};

FormWethMint.defaultProps = {
  label: "Mint WETH",
  sx: {},
};

FormWethMint.propTypes = {
  sx: PropTypes.object,
};

export default FormWethMint;
