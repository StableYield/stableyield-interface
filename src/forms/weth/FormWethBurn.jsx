/* --- Global --- */
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { useContractWETH } from "../../hooks";
import { transformDecimalsToWad } from "../../state/web3-react-system/lib/helpers";
import { TransactionModal } from "../../components";
import { useState } from "react";

/**
 * @name FormWethBurn
 * @description Burn WETH and withdraw ETH
 * @version 0.0.1
 */

export const FormWethBurn = ({ setSearchFilter, ...props }) => {
  const [transaction, transactionSet] = useState();
  const { handleSubmit, register } = useForm();
  const { withdraw, address } = useContractWETH(process.env.NEXT_PUBLIC_WETH);
  const onSubmit = async (values) => {
    const tx = await withdraw.execute([
      transformDecimalsToWad(values.amount, 18).toHexString(),
    ]);
    transactionSet(tx);
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
        <button className="btn-indigo w-36 mt-3">{props.label}</button>
      </form>
      {transaction && (
        <TransactionModal isConnected={address} transaction={transaction} />
      )}
    </>
  );
};

FormWethBurn.defaultProps = {
  label: "Burn WETH",
  sx: {},
};

FormWethBurn.propTypes = {
  sx: PropTypes.object,
};

export default FormWethBurn;
